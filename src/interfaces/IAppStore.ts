import { IPerson } from "../interfaces/commonInterfaces";

export default interface IAppStore {
    sessionId: any;
    sessionTitle: string;
    participants: IPerson[];
    currentUser: IPerson;
    votes: { ParticipantId: any, vote: 'string'}[];
}