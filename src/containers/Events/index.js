import { Grid, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import EventCard from '../../components/Cards/Event';
import { getAllEventsInfoAction } from '../../redux/slices/events';
import Layout from '../Layout';

const useStyles = makeStyles((theme) => ({
}));

const Events = ({ getAllEventsInfo, events, eventsCount }) => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getAllEventsInfo({ pageNumber });
  }, []);

  return (
    <Layout>
      <Grid container spacing={4} justify='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center' component="h2">
            {'رویدادها'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {events?.map((event, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Pagination
            variant="outlined"
            color="primary"
            shape='rounded'
            count={Math.ceil(eventsCount / 12)}
            page={pageNumber}
            onChange={(e, value) => setPageNumber(value)}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events,
  eventsCount: state.events.eventsCount,
});

export default connect(mapStateToProps, {
  getAllEventsInfo: getAllEventsInfoAction,
})(Events);
