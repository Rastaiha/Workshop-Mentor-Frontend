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
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  icon: {
    textAlign: 'center',
  },
});

const TeamInfo = ({ name, members, playerId }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardContent>
          <Typography gutterBottom variant="h3" align="center">
            {name} {playerId}
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
        <ButtonGroup disabled variant="outlined" color="primary" fullWidth>
          <Button>{'ویرایش'}</Button>
          <Button>{'حذف'}</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default TeamInfo;
