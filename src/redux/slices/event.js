import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  applyDiscountUrl,
  getEventInfoUrl,
  getEventRegistrationInfoUrl,
  getWorkshopsDescriptionUrl,
  paymentRequestUrl,
} from '../constants/urls';

export const getAllEventsInfoAction = createAsyncThunkApi(
  'events/getAllEventsInfoAction',
  Apis.GET,
  getEventInfoUrl,
);

export const getEventInfoAction = createAsyncThunkApi(
  'events/getEventInfoAction',
  Apis.GET,
  getEventInfoUrl,
);

export const getEventRegistrationInfoAction = createAsyncThunkApi(
  'events/getEventRegistrationInfo',
  Apis.POST,
  getEventRegistrationInfoUrl,
  {
    bodyCreator: ({ eventId, memberUuid }) => ({
      event_id: eventId,
      member_uuid: memberUuid,
    }),
  }
);

export const paymentRequestAction = createAsyncThunkApi(
  'events/paymentRequest',
  Apis.POST,
  paymentRequestUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
    defaultNotification: {
      success: 'در حال انتقال به صفحه‌ی پرداخت...',
    },
  }
);

export const applyDiscountAction = createAsyncThunkApi(
  'events/applyDiscount',
  Apis.POST,
  applyDiscountUrl,
  {
    bodyCreator: ({ discountCode, participantId }) => ({
      code: discountCode,
      participant_id: participantId,
    }),
  }
);

export const getWorkshopsDescriptionAction = createAsyncThunkApi(
  'events/getWorkshops',
  Apis.GET,
  getWorkshopsDescriptionUrl
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
    [getAllEventsInfoAction.pending.toString()]: isFetching,
    [getAllEventsInfoAction.rejected.toString()]: isNotFetching,
    [getAllEventsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = response;
    },
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