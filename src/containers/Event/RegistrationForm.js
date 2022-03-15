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
}) => {
  const history = useHistory();

  useEffect(() => {
    if (registrationFormId) {
      getRegistrationForm({ registrationFormId });
    }
  }, [registrationFormId]);

  const classes = useStyles();

  return (
    <>
      {article && (
        <EditWidgets
          widgets={widgets}
          stateId={registrationFormId}
          stateName={article.name}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  widgets: state.events.widgets,
  registrationFormId: ownProps.registrationFormId,
});

export default connect(
  mapStateToProps,
  {
    getRegistrationForm: getRegistrationFormAction,
  }
)(EditArticle);
