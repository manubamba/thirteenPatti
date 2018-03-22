import * as RX from 'reactxp';
import getStore from '../store/getStore';
import { connect } from 'react-redux';
import { IReduxState } from '../interfaces/commonInterfaces';
import { createSession } from '../actions/appActions';
import CreateSession from '../components/createSession/CreateSession';

const mapStateToProps = (state: any, ownProps: any) => ({
    navigator: ownProps.navigator,
})

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        createSession: (name: string, sessionName: string, onCreateSession: () => void) =>
            dispatch(createSession(name, sessionName, onCreateSession)),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateSession);