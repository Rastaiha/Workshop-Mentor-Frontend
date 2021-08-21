import {
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
  Button,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import CreateArticleDialog from '../../components/Dialog/CreateArticleDialog/CreateArticleDialog';
import {
  createDiscountCodeAction
} from '../../redux/slices/account';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
}));

function Index({
  createDiscountCode,

  event,
  userAccount,
  newDiscountCode,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const [value, setValue] = useState();

  console.log(event)
  console.log(userAccount)

  const handleButtonClick = () => {
    createDiscountCode({ value, merchandise: event?.merchandise?.id, user: userAccount.id });
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm={6} >
          <TextField
            size='small' fullWidth
            variant='outlined'
            label='درصد تخفیف'
            inputProps={{ className: 'ltr-input' }}
            value={value} onChange={(e) => setValue(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6} >
          <Button
            fullWidth variant='contained'
            color='primary'
            onClick={handleButtonClick}>{'ایجاد'}</Button>
        </Grid>
        {newDiscountCode &&
          <Grid item xs={12} sm={6}>
            <Typography fullWidth variant='h2' align='center'>
              {newDiscountCode?.code}
            </Typography>
          </Grid>
        }
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  userAccount: state.account.userAccount,
  newDiscountCode: state.account.newDiscountCode,
});

export default connect(
  mapStateToProps,
  {
    createDiscountCode: createDiscountCodeAction,
  }
)(Index);
