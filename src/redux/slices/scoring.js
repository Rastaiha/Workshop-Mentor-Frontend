import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  answerCRUDUrl,
} from '../constants/urls';


export const getAnswerAction = createAsyncThunkApi(
  'scoring/getAnswerAction',
  Apis.GET,
  answerCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت پاسخ وجود داشت.',
    },
  }
);


const initialState = {
  token: null,
  refresh: null,
  user: {},
  discountCodes: [],
};


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const scoringSlice = createSlice({
  name: 'scoring',
  initialState,
  reducers: {},
  extraReducers: {

    [getAnswerAction.pending.toString()]: isFetching,
    [getAnswerAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.answer = response;
      state.isFetching = false;
    },
    [getAnswerAction.rejected.toString()]: isNotFetching,





  },
});


export const { reducer: scoringReducer } = scoringSlice;
