import * as RX from 'reactxp';

export interface ICommonJoinProps {
    joinSession: (name: string, sessionId: string) => void
}

export interface ICommonJoinState {
    name: string;
    sessionId: string;
    hasError: boolean;
    errorMsg: string;
}

export default class CommonJoin extends RX.Component<ICommonJoinProps, ICommonJoinState> {
    constructor(props: ICommonJoinProps) {
        super(props);
        this.state = {
            name: "",
            hasError: false,
            sessionId: "",
            errorMsg: ""
        };
    }

    private handleJoin = () => {
        const {name, sessionId} = this.state;
        if (name && sessionId) {
            this.props.joinSession(name, sessionId);
        } else {
            this.setState({
                hasError: true,
                errorMsg: `Please enter ${name ? (sessionId ? 'missing field' : 'session id') : 'your name'}`
            });
        }
    }

    private handleChange = (field: any) => (value: string) => {
        const newLocal = {
            [field]: value,
        };
        this.setState(newLocal);
    }

    render() {
        const {joinSession} = this.props;
        const {name, sessionId, hasError, errorMsg} = this.state;
        return (
            <RX.View>
                <RX.TextInput placeholder="Enter your Name" value={name} onChangeText={this.handleChange('name')} />
                <RX.TextInput placeholder="Enter a session Id" value={sessionId} onChangeText={this.handleChange('sessionId')} />
                <RX.Button title="Join" onPress={this.handleJoin}>Join</RX.Button>
                {hasError && <RX.Text>{errorMsg}</RX.Text>}
            </RX.View>
        );
    }
}