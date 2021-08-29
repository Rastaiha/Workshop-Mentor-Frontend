import { Avatar, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { stringToColor } from '../../../../utils/stringToColor';

const useStyles = makeStyles(() => ({
  avatar: {},
}));

function AvatarComponent({ name = 'همیار' }) {
  const classes = useStyles();
  return (
    <Tooltip title={name} arrow>
      <Avatar
        style={{ backgroundColor: stringToColor(name) }}
        className={classes.avatar}>
        {name[0]}
      </Avatar>
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({
  name: state.account.userAccount?.first_name && state.account.userAccount?.last_name
    ? `${state.account.userAccount?.first_name} ${state.account.userAccount?.last_name}`
    : '',
});

export default connect(mapStateToProps)(AvatarComponent);
