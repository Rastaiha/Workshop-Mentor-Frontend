import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  allRegistrationReceiptsUrl,
  applyDiscountUrl,
  eventInfoUrl,
  getAllEventsInfo,
  getEventRegistrationInfoUrl,
  getWorkshopsDescriptionUrl,
  oneRegistrationReceiptUrl,
  paymentRequestUrl,
} from '../constants/urls';

export const getOneEventInfoAction = createAsyncThunkApi(
  'events/getEventInfoAction',
  Apis.GET,
  eventInfoUrl,
);

export const editOneEventInfoAction = createAsyncThunkApi(
  'events/editOneEventInfoAction',
  Apis.PATCH,
  eventInfoUrl,
  {
    bodyCreator: ({ workshopPlayerId }) => ({
      player_workshop: workshopPlayerId,
    }),
  }
);

export const getAllRegistrationReceiptsAction = createAsyncThunkApi(
  'events/getAllRegistrationReceiptsAction',
  Apis.GET,
  allRegistrationReceiptsUrl,
);

export const getOneRegistrationReceiptsAction = createAsyncThunkApi(
  'events/getOneRegistrationReceiptsAction',
  Apis.GET,
  oneRegistrationReceiptUrl,
);

const initialState = {
  isFetching: false,
  allRegistrationReceipts: [],
  allEvents: [],
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
    [getOneEventInfoAction.pending.toString()]: isFetching,
    [getOneEventInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
    },
    [getOneEventInfoAction.rejected.toString()]: isNotFetching,


    [getAllRegistrationReceiptsAction.pending.toString()]: isFetching,
    [getAllRegistrationReceiptsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allRegistrationReceipts = response;
    },
    [getAllRegistrationReceiptsAction.rejected.toString()]: isNotFetching,


    [getOneRegistrationReceiptsAction.pending.toString()]: isFetching,
    [getOneRegistrationReceiptsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.registrationReceipt = response;
    },
    [getOneRegistrationReceiptsAction.rejected.toString()]: isNotFetching,


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

export const { reducer: eventsReducer } = eventSlice;