import * as RX from 'reactxp';
import StoryPoints from './StoryPoints';
import LeftPanel from '../LeftPanel/LeftPanel';
import { EStoryState, IPerson } from '../../interfaces/commonInterfaces';
import { MainPageState, MainPageProps } from '../../interfaces/MainPage';
import Header from '../Header/Header';
import UiButton from '../../uiElemComponents/UiButton';
import UiInput from '../../uiElemComponents/UiInput';

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
            <RX.View>
                <Header title="Story" navigator={this.props.navigator} enableBackNav={true} />
                <RX.ScrollView>
                    <RX.View>
                        <RX.Text>ID:</RX.Text>
                        <RX.Text>{sessionId}</RX.Text>
                    </RX.View>
                    <RX.View>
                        <RX.Text>Story:</RX.Text>
                        <UiInput placeholder="Please enter the story title here" onChangeText={this.handleStoryTextChange} value={storyTitle}/>
                    </RX.View>
                    <LeftPanel {...props}/>
                    <StoryPoints onClickItem={this.handleStoryPointClick} chosenValue={selectedPoints}/>
                    {!!currentUser.isAdmin && <RX.View>
                        <UiButton onPress={onClickResetVotes} title='Reset Votes'></UiButton>
                        <UiInput placeholder="Final Value" onChangeText={this.handleFinalPointsChange} value={finalPoints}/>
                        <UiButton onPress={this.handleFinalize} title='Finalize'></UiButton>
                        </RX.View>
                    }
                </RX.ScrollView>
            </RX.View>
        );
    }
} 