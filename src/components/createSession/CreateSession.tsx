import * as RX from 'reactxp';
import { CreateSessionProps, CreateSessionState } from '../../interfaces/CreateSession';
import Navigator, { Types, NavigatorDelegateSelector as DelegateSelector } from 'reactxp-navigation';
import { NavigationRouteId } from '../../App';

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
                <RX.TextInput placeholder="Enter your Name" value={name} onChangeText={this.handleNameChange} />
                <RX.TextInput placeholder="Enter a name for the session" value={sessionName} onChangeText={this.handleSessionNameChange} />
                <RX.Button title="Create" onPress={this.handleCreate}>Create</RX.Button>
                {hasError && <RX.Text>Please enter the name</RX.Text>}
            </RX.View>
        );
    }
}