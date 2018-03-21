import * as socket from 'socket.io-client';

export function initCommunication(sessionId: number) {
    console.log('initializing');
    const io = socket('http://localhost:3001/' + sessionId);
    io.on('updatestate', (state: any) => {
        console.log(state);
    });
    io.emit('vote', {
        participantId: 0,
        estimate: 1
    })
    return io;
}

export default initCommunication(16626);

