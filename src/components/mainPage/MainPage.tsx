import * as RX from 'reactxp';
import StoryPoints from './StoryPoints';
import LeftPanel from '../LeftPanel/LeftPanel';
import { EStoryState, IPerson } from '../../interfaces/commonInterfaces';
import { MainPageState, MainPageProps } from '../../interfaces/MainPage';

export default class MainPage extends RX.Component<MainPageProps, MainPageState> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    private handleStoryPointClick = (selectedPoints: string) => {
        this.setState(
            {selectedPoints}
        )
    }

    private handleFinalPointsChange = (finalPoints: string) => {
        this.setState({finalPoints})
    }

    private handleStoryTextChange = (storyTitle: string) => {
        this.setState({storyTitle})
    }

    private handleFinalize = () => {
        this.props.onClickFinalize(this.state.finalPoints);
    }
    render() {
        const {
            sessionId,
            currentUser,
            onClickResetVotes,
            onClickFinalize,
            participants,
            storyStatus
        } = this.props;
        const {selectedPoints, finalPoints, storyTitle} = this.state;
        
        const props = {
            kickOut: (personId: number) => {
                console.log("kicking person with id: " + personId);
            },
            toggleAdmin: (personId: number) => {
                console.log("toggling the admin status of person with personId: " + personId);
            },
            persons: participants,
            currentPerson: participants[0],
            storyStatus
        }
        return (
            <RX.ScrollView>
                <RX.View>
                    <RX.Text>ID:</RX.Text>
                    <RX.Text>{sessionId}</RX.Text>
                </RX.View>
                <RX.View>
                    <RX.Text>Story:</RX.Text>
                    <RX.TextInput placeholder="Please enter the story title here" onChangeText={this.handleStoryTextChange} value={storyTitle}/>
                </RX.View>
                <LeftPanel {...props}/>
                <StoryPoints onClickItem={this.handleStoryPointClick} chosenValue={selectedPoints}/>
                {currentUser.isAdmin && <RX.View>
                    <RX.Button onPress={onClickResetVotes}>Reset Votes</RX.Button>
                    <RX.TextInput placeholder="Final Value" onChangeText={this.handleFinalPointsChange} value={finalPoints}/>
                    <RX.Button onPress={this.handleFinalize}>Finalize</RX.Button>
                    </RX.View>
                }
            </RX.ScrollView>
        );
    }
} 