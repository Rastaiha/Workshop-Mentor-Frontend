import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  loginUrl,
  profileCRUDUrl,
  discountCRUDUrl,
} from '../constants/urls';

const initialState = { token: null, user: {} };

export const loginAction = createAsyncThunkApi(
  'account/loginAction',
  Apis.POST,
  loginUrl,
  {
    defaultNotification: {
      success: 'دوباره سلام!',
      error: 'نام کاربری یا رمز عبور اشتباه است!',
    },
  }
);

export const getUserProfileAction = createAsyncThunkApi(
  'account/getUserProfileAction',
  Apis.GET,
  profileCRUDUrl,
);


export const createDiscountCodeAction = createAsyncThunkApi(
  'account/createDiscountCodeAction',
  Apis.POST,
  discountCRUDUrl,
  {
    defaultNotification: {
      success: 'کد تخفیف با موفقیت ایجاد شد.',
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
      state.userAccount = response.account;
      state.token = response.access;
      state.isFetching = false;
    },
    [loginAction.rejected.toString()]: isNotFetching,


    [getUserProfileAction.pending.toString()]: isFetching,
    [getUserProfileAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.userProfile = response;
      state.isFetching = false;
    },
    [getUserProfileAction.rejected.toString()]: isNotFetching,


    [createDiscountCodeAction.pending.toString()]: isFetching,
    [createDiscountCodeAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.newDiscountCode = response;
      state.isFetching = false;
    },
    [createDiscountCodeAction.rejected.toString()]: isNotFetching,
  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
