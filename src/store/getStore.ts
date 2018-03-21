import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import combinedReducers from './combinedReducers';

export default createStore(combinedReducers, applyMiddleware(ReduxThunk));