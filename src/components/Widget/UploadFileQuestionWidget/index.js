import { Button, Divider, makeStyles, Typography } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { baseURL } from '../../../axios';
import UploadFileQuestionEditWidget from './edit';

export { UploadFileQuestionEditWidget };

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  uploadButton: {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
  small: {
    fontSize: 10,
  },
  lastUploadButton: {
    fontSize: 10,
    color: '#334499',
    '& .MuiButton-endIcon': {
      marginLeft: 2,
      '& > *:first-child': {
        fontSize: 11,
      },
    },
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const UploadFileQuestionWidget = ({
  text = 'محل آپلود فایل',
  last_submit,
  disabled = true,
}) => {
  const t = useTranslate();
  const classes = useStyles({ haveFile: !!last_submit });

  return (
    <div>
      <div className={classes.flex}>
        <Typography>{text}</Typography>
        <input
          accept="application/pdf,image/*"
          style={{ display: 'none' }}
          type="file"
        />
        <Button
          component="label"
          disabled={disabled}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CloudUploadIcon />}
          className={classes.uploadButton}>
          {t('uploadFile')}
        </Button>
      </div>
      {last_submit && (
        <>
          <Divider className={classes.divider} />
          <div className={classes.flex}>
            <Typography
              component="small"
              variant="body2"
              className={classes.small}>
              آخرین ارسال:
            </Typography>
            <Button
              size="small"
              endIcon={<DescriptionOutlinedIcon />}
              className={classes.lastUploadButton}
              href={baseURL + last_submit.answer_file} // TODO: fix in back
              component="a"
              download
              target="_blank">
              {last_submit.file_name}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadFileQuestionWidget;
