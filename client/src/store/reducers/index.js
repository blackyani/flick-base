import { combineReducers } from "redux";

import articles from './articles';
import notification from './notification';
import site from './site';
import users from './users';

const appReducers = combineReducers({
    articles,
    notification,
    site: site,
    users
});

export default appReducers;