import * as RX from 'reactxp';
import MainPage from '../components/mainPage/MainPage';
import getStore from '../store/getStore';
import { connect } from 'react-redux';
import { IReduxState } from '../interfaces/commonInterfaces';

const mapStateToProps = ({app, story}: IReduxState) => ({
    sessionId: app.sessionId,
    sessionTitle: app.sessionTitle,
    participants: app.participants,
    currentUser: app.currentUser,
    votes: app.votes,
    storyId: story.storyId,
    storyTitle: story.storyTitle,
    storyDescription: story.storyDescription,
    finalVote: story.finalVote,
    storyStatus: story.storyStatus
});

export default connect(mapStateToProps, null)(MainPage);