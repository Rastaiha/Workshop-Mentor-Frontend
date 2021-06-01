import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import { MODES } from '..';
import MultiChoiceQuestionEditWidget from './edit';

export { MultiChoiceQuestionEditWidget };

const useStyles = makeStyles((theme) => ({
  choice: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  selected: {
    color: 'black',
    border: '2px dashed #EB1748',
    margin: theme.spacing(1, 1, 0, 0),
  },
  answer: {
    color: '#fff',
    borderColor: '#337766',
    margin: theme.spacing(1, 1, 0, 0),
    backgroundColor: '#337766',
    '&:hover': {
      color: 'black',
    },
  },
}));

const MultiChoiceQuestionWidget = ({
  text,
  choices,
  answer,
  last_submit,
  mode,
}) => {
  const classes = useStyles();
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
      {choices &&
        choices.map((choice, index) => (
          <Button
            key={index}
            fullWidth
            variant="contained"
            disabled={mode !== MODES.VIEW}
            className={clsx(
              classes.choice,
              +index === +last_submit?.text && classes.selected,
              +index === +answer?.text && classes.answer
            )}>
            {choice.text}
          </Button>
        ))}
    </>
  );
};

export default MultiChoiceQuestionWidget;
