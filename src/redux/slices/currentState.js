import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import { getScoresUrl, mentorGetCurrentStateUrl } from '../constants/urls';
import {
  getAllArticlesAction,
  getArticleAction,
} from './article';
import {
  createHelpAction,
  createWidgetAction,
  deleteWidgetAction,
  getStateAction,
} from './widget';


const stateNeedUpdate = (state) => {
  state.needUpdateState = true;
};

const stateDontNeedUpdate = (state) => {
  state.needUpdateState = false;
};

const getNewState = (state, { payload: { response } }) => {
  state.needUpdateState = false;
  state.state = response;
};

const sentAnswer = (state, { payload: { response } }) => {
  state.state.widgets = state.state.widgets.map((widget) =>
    +widget.id === +response.problem
      ? {
        ...widget,
        last_submit: response.xanswer,
        answer: response.answer,
      }
      : widget
  );
};

const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: {
    state: {
      widgets: [],
      help_states: [],
    },
    scores: [],
    totalScore: 0,
  },
  extraReducers: {
    [createHelpAction.fulfilled.toString()]: stateNeedUpdate,
    [createWidgetAction.fulfilled.toString()]: stateNeedUpdate,
    [deleteWidgetAction.fulfilled.toString()]: stateNeedUpdate,

    [getArticleAction.fulfilled.toString()]: stateDontNeedUpdate,
    [getAllArticlesAction.fulfilled.toString()]: stateDontNeedUpdate,
  },
});

export const { initCurrentState: initCurrentStateAction } = currentStateSlice.actions;
export const { reducer: currentStateReducer } = currentStateSlice;
