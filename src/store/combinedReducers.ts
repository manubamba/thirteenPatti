import { combineReducers } from 'redux';
import appReducer from './appReducer';
import storyReducer from './storyReducer';

export default combineReducers({
    app: appReducer,
    story: storyReducer
})