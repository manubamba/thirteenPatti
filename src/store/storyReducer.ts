import { IStoryStore } from "../interfaces/IStoryStore";
import { EStoryState } from "../interfaces/commonInterfaces";

const initialState: IStoryStore = {
    storyId: 0,
    storyTitle: "",
    storyDescription: "",
    finalVote: 0,
    storyStatus: EStoryState.INACTIVE
}

export default (state = initialState, action: any) => {
    switch(action.type) {
        default:
        return initialState;
    }
}