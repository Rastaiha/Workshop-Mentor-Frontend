import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';

import {
  getOneRegistrationReceiptsAction,
} from '../redux/slices/events'

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
  getOneRegistrationReceipts,
  registrationReceipt,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const { registrationReceiptId } = useParams();

  useEffect(() => {
    getOneRegistrationReceipts({ registrationReceiptId })
  }, [getOneRegistrationReceipts])

  return (
    <>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item >
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  registrationReceipt: state.events.registrationReceipt,
});
export default connect(
  mapStateToProps,
  {
    getOneRegistrationReceipts: getOneRegistrationReceiptsAction,
  }
)(Index);
