import { Button, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { StatePageContext } from '../../../../containers/Workshop';
import { requestMentorAction } from '../../../../redux/slices/currentState';

const useStyles = makeStyles(() => ({
  mentorButton: {
    marginLeft: 5,
  },
}));

function MentorButton({ callMentor, isMentor, disabled = false }) {
  const classes = useStyles();

  const t = useTranslate();

  const { fsmId, player } = useContext(StatePageContext);

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.mentorButton}
      disabled={isMentor || disabled}
      onClick={() => callMentor({ fsmId, playerId: player.id })}>
      {t('callMentor')}
    </Button>
  );
}

const mapStatesToProps = (state) => ({
  isMentor: state.account.user?.is_mentor,
});

export default connect(mapStatesToProps, { callMentor: requestMentorAction })(
  MentorButton
);
