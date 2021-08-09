
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import EventCard from '../components/Cards/Event';
import { getAllEventsInfoAction } from '../redux/slices/event'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logo: {
    maxHeight: '80vh',
    maxWidth: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 400,
    textShadow: '1px 1px #dbd9d9',
  },
  listItem: {
    fontSize: 20,
    fontWeight: 300,
    textShadow: '1px 1px #dbd9d9',
  },
}));

const Events = ({ getAllEventsInfo, events }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("WWWWWWWWWWWWW  ")
    getAllEventsInfo();
  }, [getAllEventsInfo])

  return (
    <>
      <ResponsiveAppBar mode="MENTOR_DASHBOARD" />
      <Container className={classes.container}>
        <Grid
          container
          justify="space-evenly"
          alignItems="flex-start"
          spacing={2}>
          <Grid
            item
            container
            sm={6}
            direction="column"
            justify="space-evenly"
            alignItems="center"
            style={{ minHeight: '100%' }}
            spacing={2}>
            <Grid item>
              <Typography className={classes.title}>{'رویدادها'}</Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}>
              {events.map((event, index) => (
                <Grid key={index} item>
                  <EventCard
                    {...event}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events || [],
});

export default connect(
  mapStateToProps,
  {
    getAllEventsInfo: getAllEventsInfoAction,
  }
)(Events);