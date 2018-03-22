import { NavigatorImpl } from "reactxp-navigation";

export interface CreateSessionContainer {
    // createSession: (name: string, sessionName: string, onCreateSession: () => void) => Promise<any>, //@TODO - no need for this
    createSession: (name: string, sessionName: string) => Promise<any>,
}

export interface CreateSessionProps extends CreateSessionContainer {
    navigator: NavigatorImpl,
    // @TODO - no need for this
    // onCreateSession: () => void
}

export interface CreateSessionState {
    name?: string;
    sessionName?: string;
    hasError: boolean
}