import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import AppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '900px !important',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <>
      <AppBar mode='MENTOR_DASHBOARD' position='relative' />
      <Container className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  userProfile: state.account.userProfile,
  userAccount: state.account.userAccount,
});


export default connect(
  mapStateToProps,
  {}
)(Layout);