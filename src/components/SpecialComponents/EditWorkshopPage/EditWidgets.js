import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import Widget, { MODES } from '../../Widget';
import CreateWidgetDialog from './components/CreateWidgetDialog';

const useStyles = makeStyles((theme) => ({
  workshopContent: {
    paddingTop: 30,
  },
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
}));

function EditWidgets({ widgets = [], id: stateId, name }) {
  const classes = useStyles();
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);

  const questions = widgets?.filter((widget) =>
    widget.widget_type.includes('Problem')
  );
  const notQuestions = widgets?.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  return (
    <>
      <Grid container spacing={2} className={classes.workshopContent} justify="center">
        {stateId &&
          <Grid item xs={12}>
            <Typography align="center" component="h2" variant="h3" gutterBottom>
              {name}
            </Typography>
          </Grid>
        }
        {
          questions.map((widget) => (
            <Grid item xs={12} key={widget.index}>
              <Paper className={classes.paper}>
                <Widget
                  stateId={stateId}
                  widget={widget}
                  mode={MODES.EDIT}
                />
              </Paper>
            </Grid>
          ))
        }
        {
          notQuestions.map((widget) => (
            <Grid key={widget.id} item xs={12}>
              <Paper className={classes.paper}>
                <Widget
                  stateId={stateId}
                  widget={widget}
                  mode={MODES.EDIT}
                />
              </Paper>
            </Grid>
          ))
        }
        {widgets?.length === 0 &&
          <Grid item xs={12}>
            <Typography align="center">{t('thereIsNoItem')}</Typography>
          </Grid>
        }
        {stateId &&
          <Grid item xs={12} md={6} container justify="center">
            <Button
              color="primary" variant="contained"
              fullWidth startIcon={<Add />}
              onClick={() => setOpenCreateWidgetDialog(true)}>
              {t('createWidget')}
            </Button>
          </Grid>
        }
      </Grid>
      <CreateWidgetDialog
        stateId={stateId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
    </>
  );
}

export default EditWidgets;
