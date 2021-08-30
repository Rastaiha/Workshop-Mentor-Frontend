import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteRequest, getRequests } from '../../parse/mentor';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addMentorToWorkshopUrl,
  allRegistrationReceiptsUrl,
  edgeUrl,
  eventInfoUrl,
  getTeamsUrl,
  oneRegistrationReceiptUrl,
  validateRegistrationReceiptUrl,
  workshopCRUDUrl,
} from '../constants/urls';

export const getOneEventInfoAction = createAsyncThunkApi(
  'events/getEventInfoAction',
  Apis.GET,
  eventInfoUrl
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
  allRegistrationReceiptsUrl
);

export const getOneRegistrationReceiptAction = createAsyncThunkApi(
  'events/getOneRegistrationReceiptAction',
  Apis.GET,
  oneRegistrationReceiptUrl
);

export const validateRegistrationReceiptAction = createAsyncThunkApi(
  'events/validateRegistrationReceiptAction',
  Apis.POST,
  validateRegistrationReceiptUrl,
  {
    defaultNotification: {
      success: 'وضعیت رسید ثبت‌نام با موفقیت ثبت شد.',
    },
  }
);

//todo: this method currently gets all teams of all events!
export const getEventTeamsAction = createAsyncThunkApi(
  'events/getEventTeamsAction',
  Apis.GET,
  getTeamsUrl
);

export const createWorkshopAction = createAsyncThunkApi(
  'events/createWorkshopAction',
  Apis.POST,
  workshopCRUDUrl
);

export const getAllWorkshopsInfoAction = createAsyncThunkApi(
  'events/getAllWorkshopsInfoAction',
  Apis.GET,
  workshopCRUDUrl
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

export const addEdgeAction = createAsyncThunkApi(
  'events/addEdgeAction',
  Apis.POST,
  edgeUrl,
  {
    defaultNotification: {
      success: 'یال با موفقیت اضافه شد.',
    },
  }
);

export const removeEdgeAction = createAsyncThunkApi(
  'events/removeEdgeAction',
  Apis.DELETE,
  edgeUrl,
  {
    defaultNotification: {
      success: 'یال با موفقیت حذف شد.',
    },
  }
);

const initialState = {
  isFetching: false,
  allRegistrationReceipts: [],
  allEvents: [],
  allEventTeams: [],
  requestTeams: {},
  allWorkshops: [],
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

export const getRequestMentorAction = createAsyncThunk(
  'requestMentor/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const requests = await getRequests();
      const requestTeams = {};
      requests.forEach((request) => {
        const teamId = request.get('teamId');
        const playerId = request.get('playerId');
        const fsmId = request.get('fsmId');
        requestTeams[teamId + '.' + fsmId] = playerId;
      });
      return { requestTeams };
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
  }
);

export const deleteRequestMentorAction = createAsyncThunk(
  'requestMentor/delete',
  async ({ teamId, fsmId }, { rejectWithValue }) => {
    try {
      await deleteRequest({ teamId, fsmId });
    } catch (err) {
      return rejectWithValue({
        message: 'یه مشکلی وجود داره. یه چند لحظه دیگه دوباره تلاش کن!',
      });
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    createRequestMentor: (state, { payload: { playerId, teamId, fsmId } }) => {
      state.requestTeams[teamId + '.' + fsmId] = playerId;
    },
    removeRequestMentor: (state, { payload: { teamId, fsmId } }) => {
      delete state.requestTeams[teamId + '.' + fsmId];
    },
  },
  extraReducers: {
    [getRequestMentorAction.fulfilled.toString()]: (
      state,
      { payload: { requestTeams } }
    ) => {
      state.requestTeams = requestTeams;
    },
    [deleteRequestMentorAction.fulfilled.toString()]: (
      state,
      { meta: { arg } }
    ) => {
      delete state.requestTeams[arg.teamId + '.' + arg.fsmId];
    },

    [getOneEventInfoAction.pending.toString()]: isFetching,
    [getOneEventInfoAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.event = response;
      state.isFetching = false;
    },
    [getOneEventInfoAction.rejected.toString()]: isNotFetching,

    [getAllRegistrationReceiptsAction.pending.toString()]: isFetching,
    [getAllRegistrationReceiptsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.allRegistrationReceipts = response;
      state.isFetching = false;
    },
    [getAllRegistrationReceiptsAction.rejected.toString()]: isNotFetching,

    [getOneRegistrationReceiptAction.pending.toString()]: isFetching,
    [getOneRegistrationReceiptAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.registrationReceipt = response;
      state.isFetching = false;
    },
    [getOneRegistrationReceiptAction.rejected.toString()]: isNotFetching,

    [getEventTeamsAction.pending.toString()]: isFetching,
    [getEventTeamsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.allEventTeams = response;
      state.isFetching = false;
    },
    [getEventTeamsAction.rejected.toString()]: isNotFetching,

    [getAllWorkshopsInfoAction.pending.toString()]: isFetching,
    [getAllWorkshopsInfoAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.allWorkshops = response;
      state.isFetching = false;
    },
    [getAllWorkshopsInfoAction.rejected.toString()]: isNotFetching,

    [createWorkshopAction.pending.toString()]: isFetching,
    [createWorkshopAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.allWorkshops = [response, ...state.allWorkshops];
      state.isFetching = false;
    },
    [createWorkshopAction.rejected.toString()]: isNotFetching,
  },
});

export const {
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
} = eventSlice.actions;

export const { reducer: eventsReducer } = eventSlice;
