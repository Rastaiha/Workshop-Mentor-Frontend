import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addMentorToWorkshopUrl,
  stateCRUDUrl,
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

export const getOneStateAction = createAsyncThunkApi(
  'events/getOneStateAction',
  Apis.GET,
  stateCRUDUrl,
);








const initialState = {
  isFetching: false,

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
      state.currentState = response.first_state;
      state.isFetching = false;
    },
    [getOneWorkshopsInfoAction.rejected.toString()]: isNotFetching,


    [getOneStateAction.pending.toString()]: isFetching,
    [getOneStateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.currentState = response;
      state.isFetching = false;
    },
    [getOneStateAction.rejected.toString()]: isNotFetching,


  },
});

export const { reducer: workshopReducer } = eventSlice;