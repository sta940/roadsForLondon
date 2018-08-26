import { combineReducers } from 'redux';
import { roads, roadData , activeRoad } from './reducer';

export default combineReducers({
    roadData,
    roads,
    activeRoad
});
