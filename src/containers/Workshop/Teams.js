import { Grid, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TeamCard from '../../components/Cards/TeamCard';
import { getWorkshopTeamsAction } from '../../redux/slices/widget';

function Teams({
  workshops = [],
  teams,
  mode = 'normal',
  notifications,
}) {

  const viewTeams =
    mode === 'notifications'
      ? teams.filter((team) => notifications.includes(+team.id))
      : teams;

  return (
    <Grid container direction="column">
      {viewTeams.map((team) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamCard
              team={team}
              fsmId={workshops[teams].id}
              fsmFirstState={workshops[teams].first_state}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  teams: state.widget.teams || [],
  notifications: state.widget.notifications || [],
});
export default connect(mapStateToProps, {
  getWorkshopTeams: getWorkshopTeamsAction,
})(Teams);
