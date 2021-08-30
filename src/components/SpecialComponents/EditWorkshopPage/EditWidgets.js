import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  removeStateAction,
  updateStateAction,
} from '../../../redux/slices/workshop';
import AreYouSure from '../../Dialog/AreYouSure';
import Widget, { MODES } from '../../Widget';
import CreateWidgetDialog from './components/CreateWidgetDialog';

const useStyles = makeStyles((theme) => ({
  workshopContent: {
    paddingTop: 20,
  },
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
}));

function EditWidgets({
  removeState,
  updateState,

  widgets = [],
  id: stateId,
  name
}) {
  const classes = useStyles();
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [isEditingStateName, setIsEditingStateName] = useState(false);
  const [newName, setNewName] = useState(name);

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
          <>
            <Grid item sm={3} />
            <Grid item xs={12} sm={6}>
              {isEditingStateName &&
                <TextField
                  onChange={(e) => setNewName(e.target.value)}
                  fullWidth variant='outlined'
                  defaultValue={name} />
              }
              {!isEditingStateName &&
                <Typography align="center" component="h2" variant="h3" gutterBottom>
                  {name}
                </Typography>
              }
            </Grid>
            <Grid item container justify='flex-end' alignItems='flex-start' xs={12} sm={3}>
              <Grid item>
                {isEditingStateName &&
                  <Tooltip title='ذخیره' arrow>
                    <IconButton size='small' onClick={() => updateState({ stateId, name: newName })}>
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                }
                {!isEditingStateName &&
                  <Tooltip title='ویرایش نام' arrow>
                    <IconButton size='small' onClick={() => setIsEditingStateName(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                }
              </Grid>
              <Grid item>
                <Tooltip title='حذف گام' arrow>
                  <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
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
      <AreYouSure
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        callBackFunction={() => removeState({ stateId })}
      />
    </>
  );
}

export default connect(
  null,
  {
    removeState: removeStateAction,
    updateState: updateStateAction,
  }
)(EditWidgets);
