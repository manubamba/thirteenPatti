export interface IPerson {
    name: string;
    id: number;
    estimate?: number,
    isAdmin: boolean
}

export interface IStory {
    index: number;
    title: string;
    state: EStoryState.INACTIVE
}

export enum EStoryState {
    INACTIVE,
    ACTIVE,
    DISCUSSION,
    FINALISED
}