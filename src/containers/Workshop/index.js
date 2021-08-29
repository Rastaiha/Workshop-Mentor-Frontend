import {
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
  getOneEventInfoAction,
} from '../../redux/slices/events';
import Design from './Design';
import Info from './Info';
import Layout from './Layout';
import Teams from './Teams';

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
  // {
  //   label: 'تیم‌ها',
  //   icon: GroupIcon,
  //   component: Teams,
  // },
  // {
  //   label: 'درخواست‌ها',
  //   component: Teams,
  //   props: {
  //     mode: 'notifications',
  //   },
  // },
];

const Event = () => {
  const t = useTranslate();
  const history = useHistory();
  const { tabNumber, fsmId } = useParams();

  if (!tabNumber) {
    history.push(`/workshop/${fsmId}/0/`)
  }

  const [tabIndex, setTabIndex] = useState(tabNumber || 0);
  const classes = useStyles();

  const TabComponent = tabs[tabIndex].component;

  const handleTabChange = (index) => {
    history.push(`/workshop/${fsmId}/${index}/`)
    setTabIndex(index);
  }

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid container item sm={3} xs={12} direction="column" justify="space-between">
          <Grid item>
            <ButtonGroup orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  variant={tabIndex == index && 'contained'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Hidden xsDown>
            <Grid item>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to="/"
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper elevation={3} className={classes.rightBox}>
            <TabComponent {...tabs[tabIndex].props} />
          </Paper>
        </Grid>
        <Hidden smUp>
          <Grid item>
            <Button fullWidth color="primary" startIcon={<ExitToAppIcon />}>
              {t('back')}
            </Button>
          </Grid>
        </Hidden>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
  getOneEventInfo: getOneEventInfoAction,
})(Event);
