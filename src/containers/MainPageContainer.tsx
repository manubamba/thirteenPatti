import * as RX from 'reactxp';
import MainPage from '../components/mainPage/MainPage';
import getStore from '../store/getStore';
import { connect } from 'react-redux';
import AppStore from '../store/AppStore';

const mapStateToProps = ({isAdmin, participants, sessionId, sessionTitle, storyTitle, votes}: any) => ({
    isAdmin,
    participants,
    sessionId,
    sessionTitle,
    storyTitle,
    votes
});

export class MainPageContainer extends RX.Component<any, any> {
    render() {
        const {isAdmin, participants, sessionId, sessionTitle, storyTitle, votes} = this.props;
        return (<MainPage isAdmin={isAdmin} storyTitle={storyTitle} sessionId={sessionId}/>)
    }
}

export default connect(mapStateToProps)(MainPageContainer);