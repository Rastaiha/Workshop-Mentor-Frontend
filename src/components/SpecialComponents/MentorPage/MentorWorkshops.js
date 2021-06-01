import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WorkshopCard from '../../Cards/WorkshopCard';
import CreateWorkshopDialog from '../../Dialog/CreateWorkshopDialog/CreateWorkshopDialog';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  cardHolder: {
    padding: theme.spacing(2),
  },
}));

function MentorWorkshops({ workshops }) {
  const classes = useStyles();
  const t = useTranslate();

  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(
    false
  );

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Tooltip
            arrow
            title={t('createWorkshop')}
            className={classes.absolute}>
            <IconButton onClick={() => setOpenCreateWorkshopDialog(true)}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          container
          item
          spacing={2}
          alignItems="center"
          justify="center"
          direction="row"
          className={classes.cardHolder}>
          {workshops.map((workshop) => (
            <Grid item xs={12} sm={6} md={4} key={workshop.id}>
              <WorkshopCard {...workshop} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <CreateWorkshopDialog
        open={openCreateWorkshopDialog}
        handleClose={() => setOpenCreateWorkshopDialog(false)}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
});
export default connect(mapStateToProps)(MentorWorkshops);
