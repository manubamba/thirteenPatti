import AppStore from './AppStore';

const initialState: AppStore = {
    sessionId: null,
    storyTitle: null,
    isAdmin: false,
    participants: [],
    sessionTitle: null,
    votes: []
}

export default (state = initialState, action: any) => {
    switch(action.type) {
        default:
        return initialState;
    }
}