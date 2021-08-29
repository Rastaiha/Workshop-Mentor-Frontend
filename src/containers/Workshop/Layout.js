import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import AppBar from '../../components/Appbar/ResponsiveAppBar';
import {
  getOneWorkshopsInfoAction,
} from '../../redux/slices/workshop';

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

const Layout = ({
  getOneWorkshopsInfo,
  ...props
}) => {
  const classes = useStyles();
  const { fsmId } = useParams()

  useEffect(() => {
    getOneWorkshopsInfo({ fsmId });
  }, [])

  return (
    <>
      <AppBar mode='MENTOR_DASHBOARD' position='relative' />
      <Container className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

export default connect(
  null,
  {
    getOneWorkshopsInfo: getOneWorkshopsInfoAction,
  }
)(Layout);