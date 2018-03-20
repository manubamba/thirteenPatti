import * as RX from 'reactxp';

export interface ICommonJoinProps {
    joinSession: (name: string) => void
}

export interface ICommonJoinState {
    name: string;
    hasError: boolean;
    errorMsg: string;
}

export default class CommonJoin extends RX.Component<ICommonJoinProps, ICommonJoinState> {
    constructor(props: ICommonJoinProps) {
        super(props);
        this.state = {
            name: "",
            hasError: false,
            errorMsg: ""
        };
    }

    private handleJoin = () => {
        const {name} = this.state;
        if (name) {
            this.props.joinSession(name);
        } else {
            this.setState({
                hasError: true,
                errorMsg: `Please enter your name`
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
        const {name, hasError, errorMsg} = this.state;
        return (
            <RX.View>
                <RX.TextInput placeholder="Enter your Name" value={name} onChangeText={this.handleChange('name')} />
                <RX.Button title="Join" onPress={this.handleJoin}>Join</RX.Button>
                {hasError && <RX.Text>{errorMsg}</RX.Text>}
            </RX.View>
        );
    }
}