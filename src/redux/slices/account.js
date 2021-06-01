import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import { loginUrl } from '../constants/urls';

const initialState = { token: null, user: {} };

export const loginAction = createAsyncThunkApi(
  'users/login',
  Apis.POST,
  loginUrl,
  {
    defaultNotification: {
      success: 'دوباره سلام!',
      error: 'نام کاربری یا رمز عبورت اشتباهه!',
    },
  }
);

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: {
    [loginAction.pending.toString()]: isFetching,

    [loginAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.user = response.user_info;
      state.token = response.access;
      state.isFetching = false;
    },
    [loginAction.rejected.toString()]: isNotFetching,
  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
