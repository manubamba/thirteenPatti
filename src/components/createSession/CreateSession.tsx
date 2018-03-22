import * as RX from 'reactxp';
import { CreateSessionProps, CreateSessionState } from '../../interfaces/CreateSession';
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector } from 'reactxp-navigation';
import { NavigationRouteId } from '../../App';
import Header from '../Header/Header';
import UiButton from '../../uiElemComponents/UiButton';
import UiInput from '../../uiElemComponents/UiInput';

export default class CreateSession extends RX.Component<CreateSessionProps, CreateSessionState> {
    constructor(props: CreateSessionProps) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    private handleCreate = () => {
        const {name, sessionName} = this.state;
        if (name) {
            this.props.createSession(name, sessionName)
            // @TODO - change this logic to navigate to any route- change it to MainStory, right now its JoinSesion
            .then(() => {
                this.props.navigator.push({
                    routeId: NavigationRouteId.JoinSession,
                    sceneConfigType: Types.NavigatorSceneConfigType.FloatFromRight
                })
            })
        } else {
            this.setState({hasError: true});
        }
    }

    private handleNameChange = (name: string) => {
        this.setState({
            name,
            hasError: !name.length
        })
    }

    private handleSessionNameChange = (sessionName: string) => {
        this.setState({
            sessionName,
        })
    }

    render() {
        const {name, sessionName, hasError} = this.state;
        return (
            <RX.View>
                <Header title="Create Session" navigator={this.props.navigator} enableBackNav={true} />
                <RX.View>
                    <UiInput placeholder="Enter your Name" value={name} onChangeText={this.handleNameChange} />
                    <UiInput placeholder="Enter a name for the session" value={sessionName} onChangeText={this.handleSessionNameChange} />
                    <UiButton title="Create" onPress={this.handleCreate}></UiButton>
                    {!!hasError && <RX.View><RX.Text>Please enter the name</RX.Text></RX.View>}
                </RX.View>
            </RX.View>
        );
    }
}