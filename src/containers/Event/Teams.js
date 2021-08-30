import { Grid, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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
  allWorkshops,
  allEventTeams,
  getRequestMentor,
  createRequestMentor,
  removeRequestMentor,
}) {
  const [workshopNumber, setWorkshopNumber] = useState(0);

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
    (team) => requestTeams[team.id + '.' + allWorkshops[workshopNumber].id]
  );
  const nonReqTeams = allEventTeams.filter(
    (team) => !requestTeams[team.id + '.' + allWorkshops[workshopNumber].id]
  );

  return (
    <>
      <Tabs
        value={workshopNumber}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(e, value) => setWorkshopNumber(value)}
        variant="scrollable"
        scrollButtons="auto">
        {allWorkshops.map((workshop) => (
          <Tab key={workshop.id} label={workshop.name} />
        ))}
      </Tabs>
      <Grid container spacing={2} alignItems="center" justify="center">
        {reqTeams?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamInfoCard
              {...team}
              teamId={team.id}
              fsmId={allWorkshops[workshopNumber].id}
              playerId={
                requestTeams[team.id + '.' + allWorkshops[workshopNumber].id]
              }
            />
          </Grid>
        ))}
        {nonReqTeams?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamInfoCard
              {...team}
              teamId={team.id}
              fsmId={allWorkshops[workshopNumber].id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  allWorkshops: state.events.allWorkshops || [],
  allEventTeams: state.events.allEventTeams || [],
  requestTeams: state.events.requestTeams || {},
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
})(Teams);
