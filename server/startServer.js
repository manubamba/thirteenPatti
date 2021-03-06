/**
 How to use sockets in client:
 export function initCommunication() {
    console.log('initializing');
    io = socket('http://localhost:3001/<sessionid>');
    io.on('updatestate', state => {
        stateMutator(state);
    });
}

To send message:
io.emit('vote', {sessionId: 12345, participantId: 5, estimate: 10});
*/

var disableLogging = false;

function startServer() {
    let app = require('express')();
    let http = require('http').Server(app);
    let io = require('socket.io')(http);

    // Initialize body parser
    let bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    // Get all sessionStates
    app.get('/', (req, res) => res.send(sessionStates));

    // CreateSession - (SessionTitle, UserName) => (ParticipantId, state)
    app.post('/createsession', (req, res) => {
        Log('Creating new session');
        var response = CreateSession(req.body.sessionTitle, req.body.userName);

        InitializeSessionNamespace(response.state.sessionId, io);
        res.send(response);
    });

    // JoinSession - (SessionId, UserName) => (ParticipantId, state)
    app.post('/joinsession', (req, res) => {
        Log("User joining session");
        res.send(JoinSession(req.body.sessionId, req.body.userName));
    });

    http.listen(3001, () => Log('listening on port 3001'));
}

startServer();

var sessionStates = {};
var nextParticipantId = 0;

/**
 * Initializes the session namespace
 * @param {id of the session} sessionId 
 * @param {io object} io 
 */
function InitializeSessionNamespace(sessionId, io) {
    var namespaceName = '/' + sessionId;
    var nsp = io.of(namespaceName);

    nsp.on('connection', (socket) => { 
        Log('User connected');

        // Clean up
        socket.on('disconnect', reason => Log('Disconnected: ' + reason));

        // Vote - (participantId, estimate) => ()
        socket.on('vote', state => {
            Log('Before voting: ' + JSON.stringify(sessionStates[sessionId]));
            Vote(sessionId, state.participantId, state.estimate);
            Log('After voting: ' + JSON.stringify(sessionStates[sessionId]));

            nsp.emit('updatestate', sessionStates[sessionId]);
        });

        // finalize - (participantId, estimate) => ()
        socket.on('finalize', state => {
            Log('Before Finalizing: ' + JSON.stringify(sessionStates[sessionId]));
            Finalize(sessionId, state.participantId, state.estimate);
            Log('After Finalizing: ' + JSON.stringify(sessionStates[sessionId]));

            nsp.emit('updatestate', sessionStates[sessionId]);
        });

        // resetvotes - (participantId) => ()
        socket.on('resetvotes', state => {
            Log('Before Resetting votes: ' + JSON.stringify(sessionStates[sessionId]));
            ResetVotes(sessionId, state.participantId);
            Log('After Resetting votes: ' + JSON.stringify(sessionStates[sessionId]));

            nsp.emit('updatestate', sessionStates[sessionId]);
        });

        // kickuser - (participantId, badParticipantId) => ()
        socket.on('kickuser', state => {
            Log('Before kicking: ' + JSON.stringify(sessionStates[sessionId]));
            KickUser(sessionId, state.participantId, state.badParticipantId);
            Log('After kicking: ' + JSON.stringify(sessionStates[sessionId]));

            nsp.emit('updatestate', sessionStates[sessionId]);
        });

        // nextstory - () => ()
        socket.on('nextstory', () => {
            Log('Before nextstory: ' + JSON.stringify(sessionStates[sessionId]));
            NextStory(sessionId);
            Log('After nextstory: ' + JSON.stringify(sessionStates[sessionId]));

            nsp.emit('updatestate', sessionStates[sessionId]);
        });

        // previousstory - () => ()
        socket.on('previousstory', () => {
            Log('Before previousstory: ' + JSON.stringify(sessionStates[sessionId]));
            PreviousStory(sessionId);
            Log('After previousstory: ' + JSON.stringify(sessionStates[sessionId]));

            nsp.emit('updatestate', sessionStates[sessionId]);
        });
    });
}

/**
 * Creates the session
 * @param {title of the session} sessionTitle 
 * @param {name of the user} userName 
 */
function CreateSession(sessionTitle, userName) {
    let sessionId;
    do {
        sessionId = Math.round(Math.random() * (99999 - 10000) + 10000);
    }
    while(sessionStates.hasOwnProperty(sessionId));
    
    let initState = {
        sessionId: sessionId,
        sessionTitle: sessionTitle,
        stories:  [
            {id: 12345, title: 'Some title', description: 'Some description', state: undefined, finalVote: -1},
            {id: 54321, title: 'Some other title', description: 'Some other description', state: undefined, finalVote: -1}
        ],
        currentStoryIndex: 0,
        votes: [
            {name: userName, participantId: nextParticipantId++, estimate: undefined, isAdmin: true}
        ]
    };

    sessionStates[sessionId] = initState;

    return {state: initState, participantId: initState.votes[0].participantId};
}

/**
 * Joins the user to the session and assigns him a participant id
 * @param {id of the session} sessionId 
 * @param {user name} userName 
 */
function JoinSession(sessionId, userName) {
    let participantId = nextParticipantId++;
    sessionStates[sessionId].votes.push({
        name: userName,
        participantId: participantId,
        estimate: undefined,
        isAdmin: false,
    });
    return {state: sessionStates[sessionId], participantId: participantId};
}

/**
 * Registers the vote of the participant
 * @param {id of the session} sessionId 
 * @param {id of the participant} participantId 
 * @param {estimate} estimate 
 */
function Vote(sessionId, participantId, estimate) {
    let votes = sessionStates[sessionId].votes;
    for(var vote of votes) {
        if (vote.participantId == participantId) {
            vote.estimate = estimate;
            return;
        }
    }
}

/**
 * Finalizes the vote of the story
 * @param {id of the session} sessionId 
 * @param {id of the participant} participantId 
 * @param {estimate} estimate 
 */
function Finalize(sessionId, participantId, estimate) {
    let sessionState = sessionStates[sessionId];

    // Ensure the admin is asking to finalize
    if (!isAdmin(sessionId, participantId)) {
        // If the participant is not admin, do nothing
        return;
    }

    let story = sessionState.stories[sessionState.currentStoryIndex];
    story.finalVote = estimate;
    story.state = 'finalized';
}

/**
 * Resets the votes of the current story
 * @param {id of the session} sessionId 
 * @param {id of the participant} participantId 
 */
function ResetVotes(sessionId, participantId) {
    if (!isAdmin(sessionId, participantId)) {
        // if participant is not admin, do nothing
        return;
    }

    let sessionState = sessionStates[sessionId];
    for (var vote of sessionState.votes) {
        vote.estimate = undefined;
    }
}

/**
 * Removes the bad participant from the session
 * @param {id of the session} sessionId 
 * @param {id of the participant} participantId 
 * @param {id of the participant who needs to be kicked out} badParticipantId 
 */
function KickUser(sessionId, participantId, badParticipantId) {
    if (!isAdmin(sessionId, participantId)) {
        // if participant is not admin, do nothing
        return;
    }

    let votes = sessionStates[sessionId].votes;
    var i = 0;
    for(var vote of votes) {
        if (vote.participantId == participantId) {
            votes.splice(i, 1);
        }
        i++;
    }
}

/**
 * Navigate to the next story
 */
function NextStory(sessionId) {
    var sessionState = sessionStates[sessionId];
    sessionState.currentStoryIndex = (sessionState.currentStoryIndex + 1) % sessionState.stories.length;
}

/**
 * Navigate to the previous story
 */
function PreviousStory(sessionId) {
    var sessionState = sessionStates[sessionId];
    sessionState.currentStoryIndex--;
    if (sessionState.currentStoryIndex == -1) {
        sessionState.currentStoryIndex = sessionState.stories.length - 1;
    }
}

// Utils
function Log(line) {
    if (!disableLogging) {
        console.log(line);
    }
}

function isAdmin(sessionId, participantId) {
    let sessionState = sessionStates[sessionId];
    for(var vote of sessionState.votes) {
        if (vote.participantId == participantId) {
            return vote.isAdmin;
        }
    }

    return false;
}