import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  Tooltip,
  Avatar,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import { visitWorkshopPlayerAction } from '../../redux/slices/mentor';
import { stringToColor } from '../../utils/stringToColor';

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
}) => {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardContent>
          <Typography gutterBottom variant="h3" align='center'>
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
        <ButtonGroup disabled variant="outlined" color="primary" fullWidth>
          <Button>
            {'ویرایش'}
          </Button>
          <Button>
            {'حذف'}
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default connect(null, {
  visitPlayerWorkshop: visitWorkshopPlayerAction,
})(TeamInfo);
