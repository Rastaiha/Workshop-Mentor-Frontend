import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import TeamInfoCard from '../../components/Cards/TeamInfo';
import { getEventTeamsAction } from '../../redux/slices/events';
import { toPersianNumber } from '../../utils/translateNumber';

function Teams({
  getTeams,
  allEventTeams,
}) {
  const { eventId } = useParams();

  useEffect(() => {
    getTeams({ eventId });
  }, []);

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      {allEventTeams?.map((team) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamInfoCard {...team} />
          </Grid>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  allEventTeams: state.events.allEventTeams || [],
});

export default connect(mapStateToProps, {
  getTeams: getEventTeamsAction,
})(Teams);
