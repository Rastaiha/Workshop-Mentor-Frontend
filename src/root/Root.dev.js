import React from 'react';
import { Route, Switch } from 'react-router-dom';

import EditArticle from '../containers/EditArticle';
import EditEvent from '../containers/EditEvent';
import EditWorkshop from '../containers/EditWorkshop';
import Login from '../containers/Login';
import MentorPage from '../containers/MentorPage';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <PrivateRoute path="/edit_workshop/:fsmId/" component={EditWorkshop} />
      <PrivateRoute path="/edit_article/:articleId/" component={EditArticle} />
      <PrivateRoute path="/event/:eventId/" component={EditEvent} />
      <PrivateRoute path="/mentor/" component={MentorPage} />
      <Route path="/" component={Login}></Route>
    </Switch>
  );
};
export default Root;
