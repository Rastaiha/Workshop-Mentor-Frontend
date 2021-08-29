import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import WorkshopCard from '../../components/Cards/WorkshopCard';
import CreateWorkshopDialog from '../../components/Dialog/CreateWorkshopDialog';
import {
  addMentorToWorkshopAction,
  getAllWorkshopsInfoAction,
} from '../../redux/slices/events';
import { toEnglishNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({

}));


function Index({
  getWorkshopsInfo,
  addMentorToWorkshop,

  allWorkshops,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(false);
  const [properties, setProperties] = useState({
    username: '',
    fsmId: '',
  });

  React.useEffect(() => {
    getWorkshopsInfo({});
  }, [])

  const putData = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: toEnglishNumber(e.target.value),
    })
  }

  const addMentor = () => {
    addMentorToWorkshop(properties);
  }

  console.log(allWorkshops)

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
              {allWorkshops?.map((workshop) => (
                <MenuItem key={workshop.id} value={workshop.id}>{workshop.name}</MenuItem>
              ))}
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
        <Grid item container xs={12} justify='flex-start'>
          {allWorkshops?.map((workshop) => (
            <Grid item xs={12} sm={6} md={4} key={workshop.id} >
              <WorkshopCard {...workshop} />
            </Grid>
          ))}
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
  allWorkshops: state.events.allWorkshops || [],
});

export default connect(
  mapStateToProps,
  {
    getWorkshopsInfo: getAllWorkshopsInfoAction,
    addMentorToWorkshop: addMentorToWorkshopAction,
  }
)(Index);
