import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addMentorToWorkshopUrl,
  getAllWorkshopStatesInfoUrl,
  stateCRUDUrl,
  workshopCRUDUrl,
} from '../constants/urls';
import {
  createWidgetAction,
  deleteWidgetAction,
  updateWidgetAction,
} from './widget';


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

export const getAllWorkshopStatesInfoAction = createAsyncThunkApi(
  'events/getAllWorkshopStatesInfoAction',
  Apis.GET,
  getAllWorkshopStatesInfoUrl,
);


export const addStateAction = createAsyncThunkApi(
  'events/addStateAction',
  Apis.POST,
  stateCRUDUrl,
  {
    defaultNotification: {
      success: 'گام با موفقیت اضافه شد.',
    },
  }
);

export const removeStateAction = createAsyncThunkApi(
  'events/removeStateAction',
  Apis.DELETE,
  stateCRUDUrl,
);





const initialState = {
  isFetching: false,
  allStates: [],
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


    [createWidgetAction.pending.toString()]: isFetching,
    [createWidgetAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.currentState.widgets = [
        ...state.currentState.widgets,
        response
      ];
      state.isFetching = false;
    },
    [createWidgetAction.rejected.toString()]: isNotFetching,


    [deleteWidgetAction.pending.toString()]: isFetching,
    [deleteWidgetAction.fulfilled.toString()]: (state, action) => {
      const newCurrentState = [...state.currentState.widgets]
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
      const newCurrentState = [...state.currentState.widgets]
      for (let i = 0; i < newCurrentState.length; i++) {
        if (newCurrentState[i].id === action.meta.arg.widgetId) {
          newCurrentState[i] = action.payload.response;
        }
      }
      state.currentState.widgets = newCurrentState;
      state.isFetching = false;
    },
    [updateWidgetAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: workshopReducer } = eventSlice;