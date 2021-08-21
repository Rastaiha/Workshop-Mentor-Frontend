import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';

import ArticleCard from '../components/Cards/ArticleCard';
import CreateArticleDialog from '../components/Dialog/CreateArticleDialog/CreateArticleDialog';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  cardHolder: {
  },
}));

function Index() {
  const classes = useStyles();
  const t = useTranslate();
  const { eventId, registrationReceiptId } = useParams();



  return (
    <>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item >
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  articles: state.mentor.articles,
});
export default connect(mapStateToProps)(Index);
