import { applyMiddleware, createStore } from 'redux';
import AppStore from './AppStore';
import appReducer from './appReducer';
import asyncThunk from 'redux-async-thunk';

export default createStore(appReducer, applyMiddleware(asyncThunk));