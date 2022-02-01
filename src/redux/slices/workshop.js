import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addMentorToWorkshopUrl,
  edgeUrl,
  getAllWorkshopEdges,
  getAllWorkshopStatesInfoUrl,
  stateCRUDUrl,
  teamCRUDUrl,
  workshopCRUDUrl,
} from '../constants/urls';
import {
  createWidgetAction,
  deleteWidgetAction,
  updateWidgetAction,
} from './widget';


export const getOneTeamInfoAction = createAsyncThunkApi(
  'workshop/getOneTeamInfoAction',
  Apis.GET,
  teamCRUDUrl,
)

export const getOneWorkshopsInfoAction = createAsyncThunkApi(
  'workshop/getOneWorkshopsInfoAction',
  Apis.GET,
  workshopCRUDUrl
);

export const getAllWorkshopsInfoAction = createAsyncThunkApi(
  'workshop/getAllWorkshopsInfoAction',
  Apis.GET,
  workshopCRUDUrl
);

export const addMentorToWorkshopAction = createAsyncThunkApi(
  'workshop/addMentorToWorkshopAction',
  Apis.POST,
  addMentorToWorkshopUrl,
  {
    defaultNotification: {
      success: 'همیار با موفقیت اضافه شد.',
    },
  }
);

export const getOneStateAction = createAsyncThunkApi(
  'workshop/getOneStateAction',
  Apis.GET,
  stateCRUDUrl
);

export const getAllWorkshopStatesInfoAction = createAsyncThunkApi(
  'workshop/getAllWorkshopStatesInfoAction',
  Apis.GET,
  getAllWorkshopStatesInfoUrl
);

export const addStateAction = createAsyncThunkApi(
  'workshop/addStateAction',
  Apis.POST,
  stateCRUDUrl,
  {
    defaultNotification: {
      success: 'گام با موفقیت اضافه شد.',
    },
  }
);

export const removeStateAction = createAsyncThunkApi(
  'workshop/removeStateAction',
  Apis.DELETE,
  stateCRUDUrl,
  {
    defaultNotification: {
      success: 'گام با موفقیت حذف شد.',
    },
  }
);

export const updateStateAction = createAsyncThunkApi(
  'workshop/updateStateAction',
  Apis.PATCH,
  stateCRUDUrl,
  {
    defaultNotification: {
      success: 'گام با موفقیت به‌روز شد.',
    },
  }
);

export const getAllWorkshopEdgesAction = createAsyncThunkApi(
  'workshop/getAllWorkshopEdgesAction',
  Apis.GET,
  getAllWorkshopEdges,
);


export const addEdgeAction = createAsyncThunkApi(
  'workshop/addEdgeAction',
  Apis.POST,
  edgeUrl,
  {
    defaultNotification: {
      success: 'یال با موفقیت اضافه شد.',
    },
  }
);


export const updateEdgeAction = createAsyncThunkApi(
  'workshop/updateEdgeAction',
  Apis.PATCH,
  edgeUrl,
  {
    defaultNotification: {
      success: 'یال با موفقیت به‌روز شد.',
    },
  }
);

export const removeEdgeAction = createAsyncThunkApi(
  'workshop/removeEdgeAction',
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
  allStates: [],
  allWorkshopEdges: [],
  fetchedTeamsObjects: [],
  requestedTeams: [],
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const eventSlice = createSlice({
  name: 'workshop',
  initialState,
  extraReducers: {
    [getAllWorkshopsInfoAction.pending.toString()]: isFetching,
    [getAllWorkshopsInfoAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.allWorkshops = response;
      state.isFetching = false;
    },
    [getAllWorkshopsInfoAction.rejected.toString()]: isNotFetching,

    [getOneWorkshopsInfoAction.pending.toString()]: isFetching,
    [getOneWorkshopsInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      console.log(response)
      state.workshop = response;
      state.isFetching = false;
    },
    [getOneWorkshopsInfoAction.rejected.toString()]: isNotFetching,

    [getOneStateAction.pending.toString()]: isFetching,
    [getOneStateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.currentState = response;
      state.isFetching = false;
    },
    [getOneStateAction.rejected.toString()]: isNotFetching,

    [getAllWorkshopStatesInfoAction.pending.toString()]: isFetching,
    [getAllWorkshopStatesInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allStates = response;
      state.isFetching = false;
    },
    [getAllWorkshopStatesInfoAction.rejected.toString()]: isNotFetching,


    [addStateAction.pending.toString()]: isFetching,
    [addStateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allStates = [...state.allStates, response];
      state.isFetching = false;
    },
    [addStateAction.rejected.toString()]: isNotFetching,


    [updateStateAction.pending.toString()]: isFetching,
    [updateStateAction.fulfilled.toString()]: (state, action) => {
      const newAllStates = [...state.allStates];
      for (let i = 0; i < newAllStates.length; i++) {
        if (newAllStates[i].id == action.meta.arg.stateId) {
          newAllStates[i] = action.payload.response;
        }
      }
      state.allStates = newAllStates;
      state.currentState = action.payload.response;
      state.isFetching = false;
    },
    [updateStateAction.rejected.toString()]: isNotFetching,


    [removeStateAction.pending.toString()]: isFetching,
    [removeStateAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    },
    [removeStateAction.rejected.toString()]: isNotFetching,


    [createWidgetAction.pending.toString()]: isFetching,
    [createWidgetAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.currentState.widgets = [...state.currentState.widgets, response];
      state.isFetching = false;
    },
    [createWidgetAction.rejected.toString()]: isNotFetching,


    [deleteWidgetAction.pending.toString()]: isFetching,
    [deleteWidgetAction.fulfilled.toString()]: (state, action) => {
      const newCurrentState = [...state.currentState.widgets];
      for (let i = 0; i < newCurrentState.length; i++) {
        if (newCurrentState[i].id === action.meta.arg.widgetId) {
          newCurrentState.splice(i, 1);
        }
      }
      state.currentState.widgets = newCurrentState;
      state.isFetching = false;
    },
    [deleteWidgetAction.rejected.toString()]: isNotFetching,


    [updateWidgetAction.pending.toString()]: isFetching,
    [updateWidgetAction.fulfilled.toString()]: (state, action) => {
      const newCurrentState = [...state.currentState.widgets];
      for (let i = 0; i < newCurrentState.length; i++) {
        if (newCurrentState[i].id === action.meta.arg.widgetId) {
          newCurrentState[i] = action.payload.response;
        }
      }
      state.currentState.widgets = newCurrentState;
      state.isFetching = false;
    },
    [updateWidgetAction.rejected.toString()]: isNotFetching,


    [getAllWorkshopEdgesAction.pending.toString()]: isFetching,
    [getAllWorkshopEdgesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allWorkshopEdges = response;
      state.isFetching = false;
    },
    [getAllWorkshopEdgesAction.rejected.toString()]: isNotFetching,


    [updateEdgeAction.pending.toString()]: isFetching,
    [updateEdgeAction.fulfilled.toString()]: (state, action) => {
      const newAllWorkshopEdges = [...state.allWorkshopEdges];
      for (let i = 0; i < newAllWorkshopEdges.length; i++) {
        if (newAllWorkshopEdges[i].id === action.meta.arg.edgeId) {
          newAllWorkshopEdges[i] = action.payload.response;
        }
      }
      state.allWorkshopEdges = newAllWorkshopEdges;
      state.isFetching = false;
    },
    [updateEdgeAction.rejected.toString()]: isNotFetching,


    [addEdgeAction.pending.toString()]: isFetching,
    [addEdgeAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allWorkshopEdges = [response, ...state.allWorkshopEdges];
      state.isFetching = false;
    },
    [addEdgeAction.rejected.toString()]: isNotFetching,


    [removeEdgeAction.pending.toString()]: isFetching,
    [removeEdgeAction.fulfilled.toString()]: (state, action) => {
      const newAllWorkshopEdges = [...state.allWorkshopEdges];
      for (let i = 0; i < newAllWorkshopEdges.length; i++) {
        if (newAllWorkshopEdges[i].id === action.meta.arg.edgeId) {
          newAllWorkshopEdges.splice(i, 1);
        }
      }
      state.allWorkshopEdges = newAllWorkshopEdges;
      state.isFetching = false;
    },
    [removeEdgeAction.rejected.toString()]: isNotFetching,


    [getOneTeamInfoAction.pending.toString()]: isFetching,
    [getOneTeamInfoAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      console.log(response)
      state.fetchedTeamsObjects = [response, ...state.fetchedTeamsObjects];
      state.isFetching = false;
    },
    [getOneTeamInfoAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: workshopReducer } = eventSlice;
