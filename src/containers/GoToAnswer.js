import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router';

import { toEnglishNumber } from '../utils/translateNumber';


const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
}))

const Index = () => {
  const classes = useStyles();
  const history = useHistory();
  const [answerId, setAnswerId] = useState();

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  console.log(answerId)

  return (
    <>
      <Container className={classes.container}>
        <Grid
          container item
          justify='center'
          alignItems='center'
          xs={12} sm={8} md={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid item container>
                <Grid container item justify='center' spacing={2}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant='h2' align='center'>
                      {'شناسه پاسخ خود را وارد کنید'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label='شناسه' value={answerId} onChange={(e) => isJustDigits(e.target.value) ? setAnswerId(e.target.value) : ''} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth onClick={() => { history.push(`/correction/${answerId}/`) }}>
                      {'ثبت'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default (Index);