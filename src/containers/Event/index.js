import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useParams } from 'react-router-dom';

import {
  getEventTeamsAction,
  getOneEventInfoAction,
} from '../../redux/slices/events';
import Layout from '../Layout';
import DiscountCode from './DiscountCode';
import Info from './Info';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import Workshops from './Workshops';

const useStyles = makeStyles((theme) => ({
  rightBox: {
    padding: theme.spacing(2),
  },
}));

const tabs = [
  {
    label: 'اطلاعات کلی',
    icon: '',
    component: Info,
  },
  // {
  //   label: 'ایجاد فرم ثبت‌نام',
  //   icon: '',
  //   component: CreateRegistrationForm,
  // },
  {
    label: 'رسیدهای ثبت‌نام',
    icon: '',
    component: RegistrationReceipts,
  },
  {
    label: 'کد تخفیف',
    icon: '',
    component: DiscountCode,
  },
  {
    label: 'تیم‌ها',
    icon: GroupIcon,
    component: Teams,
  },
  {
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: Workshops,
  },
];

const Event = ({
  getOneEventInfo,
  getEventTeams,

  event,
}) => {
  const t = useTranslate();
  const { eventId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, []);

  useEffect(() => {
    if (event?.registration_form) {
      getEventTeams({ registrationFormId: event?.registration_form });
    }
  }, [event]);

  const TabComponent = tabs[tabIndex].component;

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          justify="flex-start">
          <Grid item>
            <ButtonGroup orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => setTabIndex(index)}
                  variant={tabIndex == index && 'contained'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Box mt={1}>
            <Grid item>
              <Button
                fullWidth
                variant='outlined'
                color="primary"
                component={Link}
                to="/events/"
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper elevation={3} className={classes.rightBox}>
            <TabComponent />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(
  mapStateToProps,
  {
    getOneEventInfo: getOneEventInfoAction,
    getEventTeams: getEventTeamsAction,
  }
)(Event);
