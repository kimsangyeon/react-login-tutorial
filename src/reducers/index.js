import {combineReducers} from 'redux';
import {authentication, registration, users} from './userReducers';
import {alert} from './alertReducers';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert
});

export default rootReducer;