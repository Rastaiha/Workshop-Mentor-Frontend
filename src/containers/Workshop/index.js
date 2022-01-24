import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Paper,
} from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import {
  getEventTeamsAction,
  getOneEventInfoAction,
} from '../../redux/slices/events';
import {
  getOneWorkshopsInfoAction,
} from '../../redux/slices/workshop';
import Layout from '../Layout';
import Design from './Design';
import Edges from './Edges';
import Info from './Info';
import Requests from './Requests';

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
  {
    label: 'طراحی',
    icon: '',
    component: Design,
  },
  {
    label: 'یال‌ها',
    icon: '',
    component: Edges,
  },
  {
    label: 'درخواست‌ها',
    icon: '',
    component: Requests,
  },
];

const Event = ({
  getEventTeams,
  getOneEventInfo,
  getOneWorkshopsInfo,

  event,
}) => {
  const classes = useStyles();
  const t = useTranslate();
  const { fsmId, eventId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const TabComponent = tabs[tabIndex].component;

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, []);

  useEffect(() => {
    getOneWorkshopsInfo({ fsmId });
  }, [])


  useEffect(() => {
    if (event?.registration_form) {
      getEventTeams({ registrationFormId: event?.registration_form });
    }
  }, [event]);

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid container item sm={3} xs={12} direction="column" justify="flex-start">
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
                to={`/event/${eventId}/`}
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper elevation={3} className={classes.rightBox}>
            <TabComponent {...tabs[tabIndex].props} />
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
    getEventTeams: getEventTeamsAction,
    getOneEventInfo: getOneEventInfoAction,
    getOneWorkshopsInfo: getOneWorkshopsInfoAction,
  }
)(Event);
