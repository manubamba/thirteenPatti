import { NavigatorImpl } from "reactxp-navigation";

export interface CreateSessionContainer {
    createSession: (name: string, sessionName: string, onCreateSession: () => void) => Promise<any>
}

export interface CreateSessionProps extends CreateSessionContainer {
    navigator: NavigatorImpl,
    onCreateSession: () => void
}

export interface CreateSessionState {
    name?: string;
    sessionName?: string;
    hasError: boolean
}