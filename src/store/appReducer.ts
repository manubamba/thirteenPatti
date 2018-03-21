import IAppStore from "../interfaces/IAppStore";

const initialState: IAppStore = {
    sessionId: null,
    participants: [],
    sessionTitle: null,
    currentUser: {
        name: "",
        id: 0,
        isAdmin: false
    },
    votes: []
}

export default (state = initialState, action: any) => {
    switch(action.type) {
        default:
        return initialState;
    }
}