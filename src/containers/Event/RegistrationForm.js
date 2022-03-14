import { makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import EditWidgets from '../../components/SpecialComponents/EditArticlePage/EditWidgets';
import { getRegistrationFormAction } from '../../redux/slices/events';

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
}));

const EditArticle = ({
  article = {},
  registrationFormId,
  getRegistrationForm,
  widgets = [],
  initialWidgets = [],
}) => {
  const history = useHistory();

  useEffect(() => {
    if (registrationFormId) {
      getRegistrationForm({ registrationFormId });
    }
  }, [registrationFormId]);

  const classes = useStyles();

  const mainWidgets = widgets.length == 0 ? initialWidgets : widgets;

  return (
    <>
      {article && (
        <EditWidgets
          widgets={mainWidgets}
          stateId={registrationFormId}
          stateName={article.name}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  initialWidgets: state.events.widgets,
  widgets: state.widget.widgets,
  registrationFormId: ownProps.registrationFormId,
});

export default connect(
  mapStateToProps,
  {
    getRegistrationForm: getRegistrationFormAction,
  }
)(EditArticle);
