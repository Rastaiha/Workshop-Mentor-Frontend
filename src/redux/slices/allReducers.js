import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { eventsReducer } from './events'
import { mentorReducer } from './mentor';
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { workshopReducer } from './workshop'

const allReducers = combineReducers({
  account: accountReducer,
  currentState: currentStateReducer,
  events: eventsReducer,
  workshop: workshopReducer,
  notifications: notificationReducer,
  mentor: mentorReducer,
  redirect: redirectReducer,
  Intl: translatorReducer,
});

export default allReducers;
