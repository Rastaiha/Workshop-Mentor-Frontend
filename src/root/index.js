import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Articles from '../containers/Articles';
import Correction from '../containers/Correction';
import EditArticle from '../containers/EditArticle';
import Event from '../containers/Event';
import Events from '../containers/Events';
import Login from '../containers/Login';
import RegistrationReceipt from '../containers/RegistrationReceipt';
import Workshop from '../containers/Workshop';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Switch>
      <PrivateRoute path="/correction/:answerId/" component={Correction} />

      <PrivateRoute path="/articles/" component={Articles} />
      <PrivateRoute path="/edit-article/:articleId/" component={EditArticle} />

      <PrivateRoute
        path="/registration_receipt/:registrationReceiptId/"
        component={RegistrationReceipt}
      />

      <PrivateRoute path="/events/" component={Events} />
      <PrivateRoute path="/event/:eventId/workshop/:fsmId/:tabNumber?/" component={Workshop} />
      <PrivateRoute path="/event/:eventId/" component={Event} />
      <Route path="/" component={Login}></Route>
    </Switch>
  );
};
export default Root;
