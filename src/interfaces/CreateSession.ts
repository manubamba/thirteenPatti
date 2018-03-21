import { NavigatorImpl } from "reactxp-navigation";

export interface CreateSessionContainer {
    createSession: (name: string, sessionName: string) => Promise<any>
}

export interface CreateSessionProps extends CreateSessionContainer {
    navigator: NavigatorImpl
}

export interface CreateSessionState {
    name?: string;
    sessionName?: string;
    hasError: boolean
}