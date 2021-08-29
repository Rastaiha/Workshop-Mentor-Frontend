import {
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import ArticleCard from '../../components/Cards/ArticleCard';
import CreateArticleDialog from '../../components/Dialog/CreateArticleDialog/CreateArticleDialog';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
}));

function Index({
  workshop,
}) {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{workshop?.name}</Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{workshop?.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  workshop: state.workshop.workshop,
});

export default connect(
  mapStateToProps,
  {
  }
)(Index);
