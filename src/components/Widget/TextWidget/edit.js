import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createTextWidgetAction } from '../../../redux/slices/mentor';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

function TextEditWidget({
  open,
  handleClose,
  initText,
  stateId,
  id,
  createTextWidget,
}) {
  const t = useTranslate();
  const [text, setText] = useState(initText);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createTextWidget({ state: stateId, text });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('text')}</DialogTitle>
      <DialogContent>
        <DialogContentText>متن مورد نظر خود را وارد کنید.</DialogContentText>

        <TinyEditorComponent
          id={`edit-question-${Math.floor(Math.random() * 1000)}`}
          content={text}
          onChange={(val) => setText(val)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createTextWidget: createTextWidgetAction })(
  TextEditWidget
);
