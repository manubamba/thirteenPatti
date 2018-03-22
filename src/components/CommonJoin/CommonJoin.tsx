import * as RX from 'reactxp';
import { ICommonJoinProps, ICommonJoinState } from '../../interfaces/CommonJoin';
import Header from '../Header/Header';
import UiButton from '../../uiElemComponents/UiButton';
import UiInput from '../../uiElemComponents/UiInput';

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
                <Header title="Join Session" navigator={this.props.navigator} enableBackNav={true} />
                <RX.View>
                    <UiInput placeholder="Enter your Name" value={name} onChangeText={this.handleChange('name')} />
                    <UiInput placeholder="Enter a session Id" value={sessionId} onChangeText={this.handleChange('sessionId')} />
                    <UiButton title="Join" onPress={this.handleJoin}></UiButton>
                    {!!hasError && <RX.Text>{errorMsg}</RX.Text>}
                </RX.View>
            </RX.View>
        );
    }
}