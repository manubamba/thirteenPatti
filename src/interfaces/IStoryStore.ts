import { IPerson, EStoryState } from "./commonInterfaces";

export interface IStoryStore {
    storyId: number;
    storyTitle: string;
    storyDescription: string;
    finalVote: number;
    storyStatus: EStoryState;
}