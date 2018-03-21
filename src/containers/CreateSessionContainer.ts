import * as RX from 'reactxp';;
import getStore from '../store/getStore';
import { connect } from 'react-redux';
import { IReduxState } from '../interfaces/commonInterfaces';
import { createSession } from '../actions/appActions';
import CreateSession from '../components/createSession/CreateSession';

const mapDispatchToProps = (dispatch: any) => {
    return {
        createSession: (name: string, sessionName: string) => dispatch(createSession(name, sessionName))
    };
}

export default connect(null, mapDispatchToProps)(CreateSession);