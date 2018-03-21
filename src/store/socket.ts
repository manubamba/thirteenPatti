import * as socket from 'socket.io-client';

export function initCommunication(sessionId: number) {
    console.log('initializing');
    const io = socket('http://localhost:3001/' + sessionId);
    io.on('updatestate', (state: any) => {
        console.log(state);
    });

    // Tests below

    // io.emit('vote', {
    //     participantId: 0,
    //     estimate: 1
    // });

    // io.emit('finalize', {
    //     participantId: 0,
    //     estimate: 10,
    // });

    // io.emit('resetvotes', {
    //     participantId: 0,
    // });

    // io.emit('kickuser', {
    //     participantId: 0,
    //     badParticipantId: 1,
    // });

    // io.emit('nextstory');
    // io.emit('previousstory');

    return io;
}

export default initCommunication(12345);

