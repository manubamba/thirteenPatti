import { BASE_URL, CREATE_SESSION_URL, JOIN_SESSION_URL, DIRECT_JOIN_SESSION_URL, SELECT_STORY_VOTE_URL, FINAL_STORY_VOTE_URL, FINALIZE_STORY_URL, RESET_STORY_VOTES_URL, TOGGLE_ADMIN_URL, KICK_PARTICIPANT_URL } from "./constants";
import initCommunication from '../store/socket';

export function createSession(name: string, sessionName: string, onCreateSession: () => void) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + CREATE_SESSION_URL, {
            method: 'POST',
            body: JSON.stringify({
                userName: name,
                sessionTitle:  sessionName
            })
        });
        const data = await result.json();
        initSocket(data.state.sessionId);
        onCreateSession();
    }
}

export function joinSession(sessionId: string, name: string) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + JOIN_SESSION_URL);
    }
}

export function directJoinSession(sessionId: number, name: string) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + DIRECT_JOIN_SESSION_URL);
    }
}

export function initSocket(sessionId: number) {
    initCommunication(sessionId);
}

export function selectStoryVote(selectedPoints: string) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + SELECT_STORY_VOTE_URL);
    }
}

export function finalStoryVote(sessionId: number) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + FINAL_STORY_VOTE_URL);
    }
}

export function finaliseStory() {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + FINALIZE_STORY_URL);
    }
}

export function resetStoryVotes(storyId: number) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + RESET_STORY_VOTES_URL);
    }
}

export function toggleAdmin(participantId: number) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + TOGGLE_ADMIN_URL);
    }
}

export function kickParticipant(participantId: number) {
    return async (dispatch: any) => {
        let result = await fetch(BASE_URL + KICK_PARTICIPANT_URL);
    }
}