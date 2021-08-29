import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addMentorToWorkshopUrl,
  allRegistrationReceiptsUrl,
  eventInfoUrl,
  getTeamsUrl,
  oneRegistrationReceiptUrl,
  validateRegistrationReceiptUrl,
  workshopCRUDUrl,
} from '../constants/urls';


export const getOneWorkshopsInfoAction = createAsyncThunkApi(
  'events/getOneWorkshopsInfoAction',
  Apis.GET,
  workshopCRUDUrl,
);

export const getAllWorkshopsInfoAction = createAsyncThunkApi(
  'events/getAllWorkshopsInfoAction',
  Apis.GET,
  workshopCRUDUrl,
);

export const addMentorToWorkshopAction = createAsyncThunkApi(
  'events/addMentorToWorkshopAction',
  Apis.POST,
  addMentorToWorkshopUrl,
  {
    defaultNotification: {
      success: 'همیار با موفقیت اضافه شد.',
    },
  }
);







const initialState = {
  isFetching: false,
  allRegistrationReceipts: [],
  allEvents: [],
  allEventTeams: [],
  allWorkshops: [],
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: {
    [getAllWorkshopsInfoAction.pending.toString()]: isFetching,
    [getAllWorkshopsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allWorkshops = response;
      state.isFetching = false;
    },
    [getAllWorkshopsInfoAction.rejected.toString()]: isNotFetching,

    [getOneWorkshopsInfoAction.pending.toString()]: isFetching,
    [getOneWorkshopsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.workshop = response;
      state.isFetching = false;
    },
    [getOneWorkshopsInfoAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: workshopReducer } = eventSlice;