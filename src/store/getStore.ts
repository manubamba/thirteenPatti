import { applyMiddleware, createStore } from 'redux';
import AppStore from './AppStore';
import appReducer from './appReducer';
import ReduxThunk from 'redux-thunk';

export default createStore(appReducer, applyMiddleware(ReduxThunk));