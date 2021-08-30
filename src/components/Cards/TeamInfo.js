import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { NotificationsActive } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';

import { deleteRequestMentorAction } from '../../redux/slices/events';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  icon: {
    textAlign: 'center',
  },
});

const TeamInfo = ({
  name,
  members,
  teamId,
  fsmId,
  playerId,
  deleteRequestMentor,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardContent>
          {playerId && <NotificationsActive color="primary" />}
          <Typography gutterBottom variant="h3" align="center">
            {name}
          </Typography>
          <Grid container direction="row" justify="center">
            <ol>
              {members.map((member) => (
                <li key={member.id}>
                  <Typography>
                    {`${member?.first_name} ${member?.last_name}`}
                  </Typography>
                </li>
                // <Avatar key={member.id} style={{ backgroundColor: stringToColor(member?.first_name) }}>
                //   {member?.first_name[0] + '‌' + member?.last_name[0]}
                // </Avatar>
              ))}
            </ol>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <ButtonGroup disabled variant="outlined" color="primary" fullWidth>
              <Button>{'ویرایش'}</Button>
              <Button>{'حذف'}</Button>
            </ButtonGroup>
          </Grid>

          <Grid item>
            {playerId ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => deleteRequestMentor({ teamId, fsmId })}>
                پاسخ به درخواست
              </Button>
            ) : (
              <Button variant="outlined" color="primary" fullWidth>
                مشاهده
              </Button>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default connect(null, {
  deleteRequestMentor: deleteRequestMentorAction,
})(TeamInfo);
