import { Grid, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TeamCard from '../../components/Cards/TeamCard';
import { getWorkshopTeamsAction } from '../../redux/slices/mentor';

function Teams({
  workshops = [],
  teams,
  getWorkshopTeams,
  mode = 'normal',
  notifications,
}) {
  const [workshopNumber, setWorkshopNumber] = useState(0);

  useEffect(() => {
    if (workshops[workshopNumber] && !teams[workshops[workshopNumber].id]) {
      getWorkshopTeams({ fsmId: workshops[workshopNumber].id });
    }
  }, [getWorkshopTeams, workshops, teams, workshopNumber]);

  const currentTeams = teams[workshops[workshopNumber]?.id]?.teams || [];

  const viewTeams =
    mode === 'notifications'
      ? currentTeams.filter((team) => notifications.includes(+team.id))
      : currentTeams;

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Tabs
          value={workshopNumber}
          onChange={(e, val) => setWorkshopNumber(val)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto">
          {workshops.map((workshop) => (
            <Tab label={workshop.name} key={workshop.name} />
          ))}
        </Tabs>
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={2}
        alignItems="center"
        justify="center">
        {viewTeams.map((team) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <TeamCard
                team={team}
                fsmId={workshops[workshopNumber].id}
                fsmFirstState={workshops[workshopNumber].first_state}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
  teams: state.mentor.teams,
  notifications: state.mentor.notifications,
});
export default connect(mapStateToProps, {
  getWorkshopTeams: getWorkshopTeamsAction,
})(Teams);
