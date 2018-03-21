interface Participant {
    id: any;
    name: string;
}

export default interface AppStore {
    sessionId: any;
    isAdmin: boolean;
    sessionTitle: string;
    storyTitle: string;
    participants: Participant[];
    votes: { ParticipantId: any, vote: 'string'}[];
}