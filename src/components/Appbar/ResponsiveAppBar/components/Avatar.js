import { Avatar, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { stringToColor } from '../../../../utils/stringToColor';

const useStyles = makeStyles(() => ({
  avatar: {},
}));

function AvatarComponent({ userAccount }) {
  const classes = useStyles();
  return (
    <Tooltip title={(userAccount.first_name && userAccount.last_name) ? `${userAccount.first_name} ${userAccount.last_name}` : 'Rasta'} arrow>
      <Avatar
        // src={process.env.PUBLIC_URL + '/logo.png'}
        style={{ backgroundColor: stringToColor(userAccount.first_name || 'Rasta') }}
        alt="logo"
        className={classes.avatar}>
        {(userAccount.first_name || 'Rasta')[0]}
      </Avatar>
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({
  userAccount: state.account.userAccount,
});

export default connect(mapStateToProps)(AvatarComponent);
