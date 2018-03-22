import * as RX from 'reactxp';
import { ISharedJoinProps, ISharedJoinState } from '../../interfaces/SharedJoin';
import Header from '../Header/Header';
import UiButton from '../../uiElemComponents/UiButton';
import UiInput from '../../uiElemComponents/UiInput';

export default class CommonJoin extends RX.Component<ISharedJoinProps, ISharedJoinState> {
    constructor(props: ISharedJoinProps) {
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
            this.props.joinSession(name, '1');
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
                <Header title="Join Shared Session" navigator={this.props.navigator} enableBackNav={true} />
                <RX.View>
                    <UiInput placeholder="Enter your Name" value={name} onChangeText={this.handleChange('name')} />
                    <UiButton title="Join" onPress={this.handleJoin}></UiButton>
                    {!!hasError && <RX.Text>{errorMsg}</RX.Text>}
                </RX.View>
            </RX.View>
        );
    }
}