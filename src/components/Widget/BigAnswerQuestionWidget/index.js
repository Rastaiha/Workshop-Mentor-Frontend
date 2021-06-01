import { Button, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';
import { MODES } from '..';
import BigAnswerQuestionEditWidget from './edit';

export { BigAnswerQuestionEditWidget };

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
  showAnswer: {
    background: '#eee',
  },
}));

const BigAnswerQuestionWidget = ({ text = '', answer, last_submit, mode }) => {
  const t = useTranslate();
  const classes = useStyles();
  const [value, setValue] = useState(last_submit?.text);

  return (
    <>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={text}
      />
      <label>{t('answer')}</label>
      {mode === MODES.VIEW ? (
        <TinyEditorComponent
          id={`edit-big-answer-${Math.floor(Math.random() * 1000)}`}
          content={value}
          onChange={setValue}
        />
      ) : (
        <Paper className={classes.showAnswer}>
          <TinyPreview
            frameProps={{
              frameBorder: '0',
              width: '100%',
            }}
            content={mode === MODES.EDIT ? answer.text : value}
          />
        </Paper>
      )}

      {mode !== MODES.CORRECTION && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          className={classes.submit}
          disabled={mode === MODES.EDIT}>
          {t('submitAnswer')}
        </Button>
      )}
    </>
  );
};

export default BigAnswerQuestionWidget;
