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
        console.log('Creating new session');
        res.send(CreateSession(req.body.sessionTitle, req.body.userName));
    });

    // JoinSession - (SessionId, UserName) => (ParticipantId, state)
    app.post('/joinsession', (req, res) => {
        console.log("User joining session");
        res.send(JoinSession(req.body.sessionId, req.body.userName));
    });

    // resetVotes - (ParticipantId) => ()
    // finalize - (ParticipantId, estimate) => ()
    // kick - (ParticipantId, BadParticipantId) => ()

    // Initializing web sockets
    io.on('connection', (socket) => { 
        console.log('User connected');

        // Vote - (sessionId, participantId, estimate) => ()
        socket.on('vote', state => {
            console.log('Vote received');
            let sessionId = state.sessionId;
            let updatedState = state;
            updatedState.sessionId++;
            io.emit('updatestate', updatedState);
        });

        // Clean up log
        socket.on('disconnect', reason => console.log('Disconnected: ' + reason));
    });
    http.listen(3001, () => console.log('listening on port 3001'));
}

startServer();

var sessionStates = {};
var nextParticipantId = 0;

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
            {name: userName, participantId: nextParticipantId++, vote: undefined, isAdmin: true}
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
        vote: undefined,
        isAdmin: false,
    });
    return {state: sessionStates[sessionId], participantId: participantId};
}