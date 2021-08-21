import { Button, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { baseURL } from '../../../axios';
// import { uploadFileAction } from '../../../redux/slices/events';
import { addNotificationAction } from '../../../redux/slices/notifications';
import UploadFileQuestionEditWidget from './edit';
export { UploadFileQuestionEditWidget };
import { MODES } from '..';

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
  small: {
    fontSize: 10,
  },
  lastUploadButton: {
    color: '#334499',
    '& .MuiButton-endIcon': {
      marginLeft: 2,
    },
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const UploadFileQuestionWidget = ({
  pushAnswer,
  addNotification,

  id,
  text = 'محل آپلود فایل:',
  answer_file,
  uploadFile,
  isFetching,
  mode,
  ...props
}) => {
  const t = useTranslate();
  const classes = useStyles({ haveFile: answer_file });
  const [file, setFile] = useState({
    link: answer_file,
    name: 'پاسخ'
  });

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        uploadFile({
          id,
          answerFile: e.target.files[0],
        }).then((response) => {
          if (response.type?.endsWith('fulfilled')) {
            setFile({
              link: response.payload?.response?.answer_file,
              name: e.target.files[0].name,
            });
            pushAnswer('upload_file_answer', response.payload?.response?.id);
          }
        })
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  console.log(props)

  const clearFile = () => {
    setFile();
    if (pushAnswer) {
      pushAnswer('upload_file_answer', '');
    }
  }

  return (
    <Grid container>
      <Grid item container justify='center' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Typography>{text}</Typography>
        </Grid>
        <Grid item container xs={12} sm={6} direction='column' alignItems='center'>
          {mode === MODES.WRITE &&
            <Grid item>
              <Button
                component="label"
                htmlFor={'raised-button-file' + id}
                disabled={isFetching}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CloudUploadIcon />}
                className={classes.uploadButton}>
                {t('uploadFile')}
              </Button>
              <input
                accept="application/pdf,image/*"
                style={{ display: 'none' }}
                id={'raised-button-file' + id}
                type="file"
                onChange={handleFileChange}
              />
            </Grid>
          }
          {file &&
            <Grid container justify='center' alignItems='center'>
              <Grid item>
                <Typography variant='caption'>
                  {'آخرین ارسال:'}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  endIcon={<DescriptionOutlinedIcon />}
                  className={classes.lastUploadButton}
                  href={file?.link}
                  component="a"
                  target="_blank">
                  {file?.name}
                </Button>
              </Grid>
              {mode === MODES.WRITE &&
                <Grid item>
                  <IconButton size='small' onClick={clearFile}>
                    <ClearIcon />
                  </IconButton>
                </Grid>
              }
            </Grid>
          }
        </Grid>
      </Grid >
    </Grid >
  );
};

const mapStateToProps = (state, ownProps) => ({
  playerId: state.currentState.player?.id,
  pushAnswer: ownProps.pushAnswer, //todo: redundant?!
  isFetching: state.events.isFetching,
});

export default connect(mapStateToProps, {
  addNotification: addNotificationAction,
})(UploadFileQuestionWidget);
