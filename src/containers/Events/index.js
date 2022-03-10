import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../../components/Cards/Event';
import { getAllEventsInfoAction } from '../../redux/slices/events';
import Layout from '../Layout';

const useStyles = makeStyles((theme) => ({
}));

const Events = ({ getAllEventsInfo, allEvents }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllEventsInfo();
  }, []);

  return (
    <Layout>
      <Grid container spacing={4} justify='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center' component="h2">
            {'رویدادها'}
          </Typography>
        </Grid>
        <Grid item container justify="center" spacing={2} xs={12}>
          {allEvents?.map((event, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  allEvents: state.events.allEvents,
});

export default connect(mapStateToProps, {
  getAllEventsInfo: getAllEventsInfoAction,
})(Events);
