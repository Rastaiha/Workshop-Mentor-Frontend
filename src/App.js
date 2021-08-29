import './Theme/Styles/App.css';

import { CssBaseline, LinearProgress } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { useHistory } from 'react-router';

import Notifier from './components/Notifications/Notifications';
import { initRedirectAction } from './redux/slices/redirect';
import Root from './root';
import MuiTheme from './Theme/MuiThemes/MuiTheme';
import RTLMuiTheme from './Theme/MuiThemes/RTLMuiTheme';
import translations from './translations';
import jss from './utils/jssRTL';

const Mentor = () => (
  <SnackbarProvider>
    <Notifier />
    <CssBaseline />
    <Root />
  </SnackbarProvider>
);

const App = ({ dir, redirectTo, forceRedirect, initRedirect, isFetching }) => {
  const history = useHistory();
  useEffect(() => {
    if (redirectTo !== null) {
      history.push(redirectTo);
      if (forceRedirect) {
        history.push(redirectTo);
        history.push('/loading/');
        history.goBack();
      } else {
        history.push(redirectTo);
      }
      initRedirect();
    }
  }, [redirectTo, forceRedirect, initRedirect, history]);

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);



  const Loading = () => {
    if (isFetching) {
      return (
        <div style={{ width: '100%', position: 'fixed', top: '0px', zIndex: '1000' }}>
          <LinearProgress />
        </div>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }


  return (
    <IntlProvider translations={translations}>
      <Loading />
      {dir === 'rtl' ? (
        <>
          <ThemeProvider theme={RTLMuiTheme}>
            <StylesProvider jss={jss}>
              <Mentor />
            </StylesProvider>
          </ThemeProvider>
        </>
      ) : (
          <>
            <ThemeProvider theme={MuiTheme}>
              <Mentor />
            </ThemeProvider>
          </>
        )}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
  redirectTo: state.redirect.redirectTo,
  forceRedirect: state.redirect.force,
  isFetching: state.account.isFetching || state.events.isFetching,
});

export default connect(mapStateToProps, { initRedirect: initRedirectAction })(
  App
);
