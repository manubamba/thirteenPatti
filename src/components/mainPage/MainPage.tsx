import * as RX from 'reactxp';
import StoryPoints from './StoryPoints';
import LeftPanel from '../LeftPanel/LeftPanel';
import { EStoryState, IPerson } from '../../interfaces/commonInterfaces';


export interface MainPageProps {
    sessionId: any;
    storyTitle?: string;
    isAdmin?: boolean;
    onClickResetVotes: () => void;
    onClickFinalize: () => void;
}

export interface MainPageState {
    finalPoints?: string;
    selectedPoints?: string;
    storyTitle?: string;
}

export default class MainPage extends RX.Component<any, MainPageState> {
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
        const {sessionId, isAdmin, onClickResetVotes, onClickFinalize} = this.props;
        const {selectedPoints, finalPoints, storyTitle} = this.state;
        const allPersons: IPerson[] = [
            {
                name: "Vineet",
                id: 1,
                estimate: 5,
                isAdmin: false
            },
            {
                name: "Manik",
                id: 2,
                estimate: 6,
                isAdmin: true
            },
            {
                name: "Manu",
                id: 3,
                estimate: 4,
                isAdmin: false
            },
            {
                name: "Rakesh",
                id: 4,
                estimate: 5,
                isAdmin: true
            }
        ];
        
        const props = {
            kickOut: (personId: number) => {
                console.log("kicking person with id: " + personId);
            },
            toggleAdmin: (personId: number) => {
                console.log("toggling the admin status of person with personId: " + personId);
            },
            persons: allPersons,
            currentPerson: allPersons[0],
            storyStatus: EStoryState.DISCUSSION
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
                {isAdmin && <RX.View>
                    <RX.Button onPress={onClickResetVotes}>Reset Votes</RX.Button>
                    <RX.TextInput placeholder="Final Value" onChangeText={this.handleFinalPointsChange} value={finalPoints}/>
                    <RX.Button onPress={this.handleFinalize}>Finalize</RX.Button>
                    </RX.View>
                }
            </RX.ScrollView>
        );
    }
} 