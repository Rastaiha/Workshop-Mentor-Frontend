import { Grid, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import TeamWorkshopInfoCard from '../../components/Cards/TeamWorkshopInfo';
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
  const { fsmId } = useParams();

  useEffect(async () => {
    getRequestMentor();
    const subscription = await getRequestSubscription();
    subscription.on('create', (requestMentor) => {
      const playerId = requestMentor.get('playerId');
      const teamId = requestMentor.get('teamId');
      const fsmId = requestMentor.get('fsmId');
      createRequestMentor({ playerId, teamId, fsmId });
    });
    subscription.on('delete', (requestMentor) => {
      const teamId = requestMentor.get('teamId');
      const fsmId = requestMentor.get('fsmId');
      removeRequestMentor({
        teamId,
        fsmId,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const reqTeams = allEventTeams.filter(
    (team) => requestTeams[team.id + '.' + fsmId]
  );
  const nonReqTeams = allEventTeams.filter(
    (team) => !requestTeams[team.id + '.' + fsmId]
  );

  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="center">
        {reqTeams?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamWorkshopInfoCard
              {...team}
              teamId={team.id}
              fsmId={fsmId}
              playerId={
                requestTeams[team.id + '.' + fsmId]
              }
            />
          </Grid>
        ))}
        {nonReqTeams?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamWorkshopInfoCard
              {...team}
              teamId={team.id}
              fsmId={fsmId}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  allEventTeams: state.events.allEventTeams,
  requestTeams: state.events.requestTeams || {},
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
})(Teams);
