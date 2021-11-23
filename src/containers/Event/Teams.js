import {
  Grid,
  Button,
  Tab,
  TextField,
  Tabs
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import TeamInfoCard from '../../components/Cards/TeamInfo';
import { getRequestSubscription } from '../../parse/mentor';
import {
  createRequestMentorAction,
  createTeamAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from '../../redux/slices/events';

function Teams({
  createTeam,
  event,

  allEventTeams,
}) {
  const { fsmId } = useParams();
  const [newTeamName, setNewTeamName] = useState('');

  const doCreateTeam = () => {
    createTeam({ name: newTeamName, registration_form: event?.registration_form })
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm={6}>
          <TextField
            value={newTeamName}
            size="small"
            fullWidth
            variant="outlined"
            label="نام تیم"
            onChange={(e) => { setNewTeamName(e.target.value) }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={!newTeamName}
            fullWidth
            variant="contained"
            color="primary"
            onClick={doCreateTeam}>
            {'ساختن تیم'}
          </Button>
        </Grid>

        {allEventTeams?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamInfoCard
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
  allWorkshops: state.events.myWorkshops || [],
  allEventTeams: state.events.allEventTeams || [],
  requestTeams: state.events.requestTeams || {},
  event: state.events.event,
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
  createTeam: createTeamAction,
})(Teams);
