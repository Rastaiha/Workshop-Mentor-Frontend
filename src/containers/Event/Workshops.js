import {
  Grid,
  IconButton,
  makeStyles,
  Button,
  MenuItem,
  FormControl,
  Select,
  Tooltip,
  TextField,
  InputLabel,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WorkshopCard from '../../components/Cards/WorkshopCard';
import CreateWorkshopDialog from '../../components/Dialog/CreateWorkshopDialog';
import {
  getWorkshopsInfoAction,
  addMentorToWorkshopAction,
} from '../../redux/slices/events';
import { toEnglishNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({

}));

function Index({
  getWorkshopsInfo,
  addMentorToWorkshop,

  workshops,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(false);
  const [properties, setProperties] = useState({
    username: '',
    fsmId: 3,
  });

  React.useEffect(() => {
    getWorkshopsInfo({});
  }, [])

  const putData = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: e.target.value,
    })
  }

  const addMentor = () => {
    addMentorToWorkshop(properties);
  }

  return (
    <>
      <Grid container item spacing={1} alignItems="center" justify="center" direction="row">
        <Grid item xs={12} sm={4} >
          <TextField
            value={properties.username}
            size='small' fullWidth
            variant='outlined'
            label='شماره تلفن' name='username'
            inputProps={{ className: 'ltr-input' }}
            onChange={putData}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl size='small' fullWidth variant="outlined">
            <InputLabel>کارگاه</InputLabel>
            <Select
              onChange={putData}
              name='fsmId'
              label='کارگاه'>
              {workshops?.map((workshop) => {
                return (
                  <MenuItem key={workshop.id} value={'Individual'}>{'فردی'}</MenuItem>
                )
              })}
            </Select>
          </FormControl >
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            disabled={!properties.username || !properties.fsmId}
            fullWidth variant='contained'
            color='primary'
            onClick={addMentor}>
            {'افزودن همیار'}
          </Button>
        </Grid>
        <Grid item container xs={12} justify='center'>
          {workshops?.maps((workshop) => {
            <WorkshopCard {...workshop} />
          })}
        </Grid>

        <Grid item container xs={12} justify='center'>
          <Tooltip arrow title={'افزودن کارگاه'}>
            <IconButton onClick={() => setOpenCreateWorkshopDialog(true)}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <CreateWorkshopDialog
        open={openCreateWorkshopDialog}
        handleClose={() => setOpenCreateWorkshopDialog(false)}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  workshops: state.events.workshops,
});

export default connect(
  mapStateToProps,
  {
    getWorkshopsInfo: getWorkshopsInfoAction,
    addMentorToWorkshop: addMentorToWorkshopAction,
  }
)(Index);
