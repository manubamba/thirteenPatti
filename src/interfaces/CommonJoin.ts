import { NavigatorImpl } from "reactxp-navigation";

export interface ICommonJoinContainer {
    joinSession: (name: string, sessionId: string) => void
}

export interface ICommonJoinState {
    name: string;
    sessionId: string;
    hasError: boolean;
    errorMsg: string;
}

export interface ICommonJoinProps extends ICommonJoinContainer {
    navigator: NavigatorImpl
}