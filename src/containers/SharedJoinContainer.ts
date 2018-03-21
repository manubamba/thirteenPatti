import * as RX from 'reactxp';;
import getStore from '../store/getStore';
import { connect } from 'react-redux';
import { IReduxState } from '../interfaces/commonInterfaces';
import { joinSession } from '../actions/appActions';
import SharedJoin from '../components/SharedJoin/SharedJoin';

const mapDispatchToProps = (dispatch: any) => {
    return {
        joinSession: (name: string, sessionId: string) => dispatch(joinSession(name, sessionId))
    };
}

export default connect(null, mapDispatchToProps)(SharedJoin);