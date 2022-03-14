import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { articleReducer } from './article';
import { currentStateReducer } from './currentState';
import { eventsReducer } from './events'
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { scoringReducer } from './scoring';
import { translatorReducer } from './translator';
import { widgetReducer } from './widget';
import { workshopReducer } from './workshop'

const allReducers = combineReducers({
  scoring: scoringReducer,
  article: articleReducer,
  account: accountReducer,
  currentState: currentStateReducer,
  events: eventsReducer,
  workshop: workshopReducer,
  notifications: notificationReducer,
  widget: widgetReducer,
  redirect: redirectReducer,
  Intl: translatorReducer,
});

export default allReducers;
