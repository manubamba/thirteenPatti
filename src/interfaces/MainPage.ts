import * as RX from "reactxp";
import { IPerson, EStoryState } from "./commonInterfaces";
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector, NavigatorImpl } from 'reactxp-navigation';
import IAppStore from "./IAppStore";
import { IStoryStore } from "./IStoryStore";

export interface MainPageContainer extends IAppStore, IStoryStore {
    onClickResetVotes: () => void;
    onClickFinalize: (finalVote: string) => void;
    kickOut: (personId: number) => void;
    toggleAdmin: (personId: number) => void;
}

export interface MainPageProps extends MainPageContainer {
    navigator: NavigatorImpl
}

export interface MainPageState {
    finalPoints?: string;
    selectedPoints?: string;
    storyTitle?: string;
}