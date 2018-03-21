import NavigatorImpl from "reactxp-navigation";

export interface ISharedJoinContainer {
    joinSession: (name: string, sessionId: string) => void
}

export interface ISharedJoinState {
    name: string;
    hasError: boolean;
    errorMsg: string;
}

export interface ISharedJoinProps extends ISharedJoinContainer {
    navigator: NavigatorImpl
}