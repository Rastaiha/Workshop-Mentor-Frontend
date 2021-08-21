import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';

import {
  getOneRegistrationReceiptAction,
  validateRegistrationReceiptAction,
} from '../redux/slices/events'
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  cardHolder: {
  },
}));

function Index({
  getOneRegistrationReceipt,
  validateRegistrationReceipt,
  registrationReceipt,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const { registrationReceiptId } = useParams();

  useEffect(() => {
    getOneRegistrationReceipt({ registrationReceiptId })
  }, [getOneRegistrationReceipt])


  const handleButtonClick = () => {
    validateRegistrationReceipt({ registrationReceiptId, });
  }

  return (
    <Layout>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item >
          salam
        </Grid>
      </Grid>
    </Layout>
  );
}
const mapStateToProps = (state) => ({
  registrationReceipt: state.events.registrationReceipt,
});
export default connect(
  mapStateToProps,
  {
    getOneRegistrationReceipt: getOneRegistrationReceiptAction,
    validateRegistrationReceipt: validateRegistrationReceiptAction
  }
)(Index);
