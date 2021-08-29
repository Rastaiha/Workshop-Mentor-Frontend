import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TeamInfoCard from '../../components/Cards/TeamInfo';
import { getRequestSubscription } from '../../parse/mentor';
import {
  createRequestMentorAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from '../../redux/slices/events';

function Teams({
  requestTeams,
  allEventTeams,
  getRequestMentor,
  createRequestMentor,
  removeRequestMentor,
}) {
  useEffect(async () => {
    getRequestMentor();
    const subscription = await getRequestSubscription();
    subscription.on('create', (requestMentor) =>
      createRequestMentor(requestMentor.get('playerId'))
    );
    subscription.on('delete', (requestMentor) =>
      removeRequestMentor(requestMentor.get('playerId'))
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const reqTeams = allEventTeams.filter((team) => requestTeams[team.id]);
  const nonReqTeams = allEventTeams.filter((team) => !requestTeams[team.id]);

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      {reqTeams?.map((team) => (
        <Grid item xs={12} sm={6} md={4} key={team.id}>
          <TeamInfoCard {...team} playerId={requestTeams[team.id]} />
        </Grid>
      ))}
      {nonReqTeams?.map((team) => (
        <Grid item xs={12} sm={6} md={4} key={team.id}>
          <TeamInfoCard {...team} />
        </Grid>
      ))}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  requestTeams: state.events.requestTeams || {},
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
})(Teams);
