import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';

import Widget, { MODES } from '../components/Widget';
import {
  getUserAccountAction,
  getUserProfileAction,
} from '../redux/slices/account'
import {
  getOneRegistrationReceiptAction,
  validateRegistrationReceiptAction,
} from '../redux/slices/events'
import {
  addNotificationAction,
} from '../redux/slices/notifications'
import { faSeri } from '../utils/translateNumber';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

function Index({
  getOneRegistrationReceipt,
  validateRegistrationReceipt,
  getUserStudentship,
  addNotification,
  getUserAccount,
  getUserProfile,

  registrationReceipt,
  userAccount,
  userProfile,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const { registrationReceiptId } = useParams();
  const [status, setStatus] = useState();

  useEffect(() => {
    getOneRegistrationReceipt({ registrationReceiptId })
  }, [getOneRegistrationReceipt])

  useEffect(() => {
    if (registrationReceipt?.user) {
      getUserProfile({ userId: registrationReceipt?.user })
    }
    if (registrationReceipt?.status) {
      setStatus(registrationReceipt?.status);
    }
  }, [registrationReceipt])

  const handleButtonClick = () => {
    if (!status) {
      addNotification({
        message: 'لطفاً وضعیت را تعیین کن!',
        type: 'error',
      });
      return;
    }
    validateRegistrationReceipt({ registrationReceiptId, status });
  }

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid xs={12} sm={8} container item spacing={2} direction='column'>
          {registrationReceipt?.answers.map((answer, index) => (
            <Grid item key={index}>
              <Paper component={Paper} className={classes.paper}>
                <Widget mode={MODES.VIEW} widget={answer} />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={2} direction='column' component={Paper}>
            <Grid item>
              <Typography align='center' variant='h2'>
                {(userProfile?.first_name && userProfile?.last_name) ? `${userProfile?.first_name} ${userProfile?.last_name}` : 'بی‌نام'}
              </Typography>
            </Grid>
            <Divider />
            <Grid item container spacing={1}>
              <Grid item xs={6}>
                <Typography >{`پایه‌ی ${userProfile?.school_studentship?.grade ? faSeri(userProfile?.school_studentship?.grade) : '؟'}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography >{`جنسیت: ${userProfile?.gender == 'Male' ? 'پسر' : (userProfile?.gender == 'Female' ? 'دختر' : '؟')}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography >{`استان: ${userProfile?.province ? userProfile?.province : '؟'}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography >{`شهر: ${userProfile?.city ? userProfile?.city : '؟'}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography >{`شماره تماس: ${userProfile?.phone_number}`}</Typography>
              </Grid>
            </Grid>

            {/* <Grid item container justify='center'>
              <Button
                fullWidth variant='outlined'
                className={classes.lastUploadButton}
                disabled={!userProfile?.school_studentship?.document}
                href={userProfile?.school_studentship?.document}
                component="a" target="_blank">
                {'مشاهده‌ی مدرک تحصیلی'}
              </Button>
            </Grid> */}
            {/* <Divider /> */}
            {status &&
              <Grid item>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>وضعیت ثبت‌نام</InputLabel>
                  <Select
                    value={status}
                    disabled={registrationReceipt?.is_participating}
                    onChange={(e) => setStatus(e.target.value)}
                    name='status'
                    label='وضعیت ثبت‌نام'
                  >
                    <MenuItem value={'Waiting'} >{'منتظر'}</MenuItem>
                    <MenuItem value={'Accepted'} >{'مجاز به پرداخت'}</MenuItem>
                    <MenuItem value={'Rejected'} >{'ردشده'}</MenuItem>
                  </Select>
                </FormControl >
                <Box mt={1}>
                  <Button
                    disabled={registrationReceipt?.is_participating}
                    fullWidth variant='contained'
                    onClick={handleButtonClick}
                    color='primary'>
                    {registrationReceipt?.is_participating ? 'ثبت‌نام قطعی است' : 'ثبت'}
                  </Button>
                </Box>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </Layout >
  );
}

const mapStateToProps = (state) => ({
  userAccount: state.account.userAccount,
  userProfile: state.account.userProfile,
  registrationReceipt: state.events.registrationReceipt,
});

export default connect(
  mapStateToProps,
  {
    getOneRegistrationReceipt: getOneRegistrationReceiptAction,
    validateRegistrationReceipt: validateRegistrationReceiptAction,
    getUserAccount: getUserAccountAction,
    getUserProfile: getUserProfileAction,
    addNotification: addNotificationAction,
  }
)(Index);
