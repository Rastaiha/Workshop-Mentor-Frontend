import React from 'react';
import { Route, Switch } from 'react-router-dom';

import EditArticle from '../containers/EditArticle';
import EditWorkshop from '../containers/EditWorkshop';
import Event from '../containers/Event';
import Login from '../containers/Login';
import RegistrationReceipt from '../containers/RegistrationReceipt';
import PrivateRoute from './PrivateRoute';


const Root = () => {
  return (
    <Switch>
      <PrivateRoute path="/edit_workshop/:fsmId/" component={EditWorkshop} />
      <PrivateRoute path="/edit_article/:articleId/" component={EditArticle} />
      <PrivateRoute path="/event/:eventId/registration_receipt/:registrationReceiptId/" component={RegistrationReceipt} />
      <PrivateRoute path="/event/:eventId/" component={Event} />
      <Route path="/" component={Login}></Route>
    </Switch>
  );
};
export default Root;
