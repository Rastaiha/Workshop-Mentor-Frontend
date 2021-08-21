import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyDiscountUrl,
  getAllEventsInfo,
  getEventInfoUrl,
  getEventRegistrationInfoUrl,
  getWorkshopsDescriptionUrl,
  paymentRequestUrl,
} from '../constants/urls';

export const getOneEventInfoAction = createAsyncThunkApi(
  'events/getEventInfoAction',
  Apis.GET,
  getEventInfoUrl,
);


const initialState = {
  isFetching: false,
  events: [],
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
    // [getAllEventsInfoAction.pending.toString()]: isFetching,
    // [getAllEventsInfoAction.rejected.toString()]: isNotFetching,
    // [getAllEventsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.events = response;
    // },


    // [getEventRegistrationInfoAction.fulfilled.toString()]: (
    //   state,
    //   { payload: { response }, meta: { arg } }
    // ) => {
    //   if (!state.registeredEvents) {
    //     state.registeredEvents = {};
    //   }
    //   state.registeredEvents[arg.eventId] = {
    //     ...state.registeredEvents[arg.eventId],
    //     participantId: response.me,
    //     event: response.event,
    //     team: response.team,
    //   };
    // },
    // [paymentRequestAction.pending.toString()]: isFetching,
    // [paymentRequestAction.fulfilled.toString()]: isNotFetching,
    // [paymentRequestAction.rejected.toString()]: isNotFetching,
    // [getWorkshopsDescriptionAction.pending.toString()]: (state) => {
    //   state.getWorkshopsLoading = true;
    // },
    // [getWorkshopsDescriptionAction.rejected.toString()]: (state) => {
    //   state.getWorkshopsLoading = false;
    // },
    // [getWorkshopsDescriptionAction.fulfilled.toString()]: (
    //   state,
    //   { payload: { response } }
    // ) => {
    //   state.workshops = response;
    //   state.getWorkshopsLoading = false;
    // },
  },
});

export const { reducer: eventReducer } = eventSlice;