import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getEventTeamsAction,
  getEventWorkshopsAction,
  getOneEventInfoAction,
} from '../../redux/slices/events';

import WorkshopCard from '../../components/Cards/WorkshopCard';
import CreateWorkshopDialog from '../../components/Dialog/CreateWorkshopDialog';
import { addMentorToWorkshopAction } from '../../redux/slices/events';
import { toEnglishNumber } from '../../utils/translateNumber';

function Index({
  addMentorToWorkshop,
  getEventWorkshops,

  workshopsCount,
  allEventWorkshops,
}) {
  const { eventId } = useParams();
  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [properties, setProperties] = useState({
    username: '',
    fsmId: '',
  });

  useEffect(() => {
    getEventWorkshops({ eventId, pageNumber });
  }, [pageNumber]);

  const putData = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: toEnglishNumber(e.target.value),
    });
  };

  const addMentor = () => {
    addMentorToWorkshop(properties);
  };

  return (
    <>
      <Grid
        container
        item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">

        <Grid item container xs={12} spacing={2}>
          <Grid item>
            <Typography variant='h2'>
              {'افزودن همیار به کارگاه'}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              value={properties.username}
              size="small"
              fullWidth
              variant="outlined"
              label="شماره تلفن"
              name="username"
              inputProps={{ className: 'ltr-input' }}
              onChange={putData}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel>کارگاه</InputLabel>
              <Select onChange={putData} name="fsmId" label="کارگاه">
                {allEventWorkshops?.map((workshop) => (
                  <MenuItem key={workshop.id} value={workshop.id}>
                    {workshop.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              disabled={!properties.username || !properties.fsmId}
              fullWidth
              variant="contained"
              color="primary"
              onClick={addMentor}>
              {'بیافزا'}
            </Button>
          </Grid>
        </Grid>


        <Grid item container justifyContent='space-between' xs={12} spacing={2} style={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant='h2'>
              {'کارگاه‌ها'}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant='outlined' onClick={() => setOpenCreateWorkshopDialog(true)}>
              {'افزودن کارگاه جدید'}
            </Button>
          </Grid>
        </Grid>

        <Grid item container xs={12} justify="flex-start" spacing={2}>
          {allEventWorkshops?.map((workshop) => (
            <Grid item xs={12} sm={6} md={4} key={workshop.id}>
              <WorkshopCard {...workshop} />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(workshopsCount / 12)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Grid>

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
  workshopsCount: state.events.workshopsCount,
  allEventWorkshops: state.events.allEventWorkshops,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
  getEventWorkshops: getEventWorkshopsAction,
})(Index);
