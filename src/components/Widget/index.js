import { IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import React, { useState } from 'react';

import DeleteWidgetDialog from './components/DeleteWidgetDialog';
import WIDGET_TYPES from './WidgetTypes';

export const MODES = {
  WRITE: 'WRITE',
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  CORRECTION: 'CORRECTION',
};

const ANSWER_TYPE_TO_WIDGET_TYPES = {
  SmallAnswer: 'SmallAnswerProblem',
  BigAnswer: 'BigAnswerProblem',
  UploadFileAnswer: 'UploadFileProblem',
  MultiChoiceAnswer: 'MultiChoiceProblem',
  Description: 'Description',
  Image: 'Image',
  Video: 'Video',
  Game: 'Game',
}


const Widget = ({ widget, mode = MODES.WRITE, stateId, ...props }) => {
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { WidgetComponent, WidgetEditDialog } = WIDGET_TYPES[
    widget.widget_type || ANSWER_TYPE_TO_WIDGET_TYPES[widget.answer_type]
  ];

  return (
    <div>
      {mode === MODES.EDIT && (
        <>
          <IconButton onClick={() => setOpenEditDialog(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setOpenDeleteWidgetDialog(true)}>
            <DeleteIcon />
          </IconButton>
          <WidgetEditDialog
            stateId={stateId}
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
          />
          <DeleteWidgetDialog
            id={widget.id}
            open={openDeleteWidgetDialog}
            handleClose={() => setOpenDeleteWidgetDialog(false)}
          />
        </>
      )}
      <WidgetComponent {...props} {...widget} mode={mode} />
    </div>
  );
};

export default Widget;
