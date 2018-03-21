import IAppStore from "./IAppStore";
import { IStoryStore } from "./IStoryStore";

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
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    DISCUSSION = 'discussion',
    FINALISED = 'finalised'
}

export interface IReduxState {
    app: IAppStore;
    story: IStoryStore;
}