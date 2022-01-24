import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  accountCRUDUrl,
  changePasswordUrl,
  discountCRUDUrl,
  institutesUrl,
  loginUrl,
  merchandiseDiscountCodeUrl,
  profileCRUDUrl,
  refreshTokenUrl,
  studentshipCRUDUrl,
  verificationCodeUrl,
} from '../constants/urls';

const initialState = {
  token: null,
  user: {},
  discountCodes: [],
};


export const createAccountAction = createAsyncThunkApi(
  'account/createAccountAction',
  Apis.POST_FORM_DATA,
  accountCRUDUrl,
  {
    bodyCreator: ({ phoneNumber, password, code }) => ({
      phone_number: phoneNumber,
      password,
      code,
    }),
    defaultNotification: {
      success: 'حساب شما با موفقیت ایجاد شد.',
      error: 'ایجاد حساب با مشکل روبه‌رو شد.',
    },
  }
);

export const getVerificationCodeAction = createAsyncThunkApi(
  'account/getVerificationCode',
  Apis.POST,
  verificationCodeUrl,
  {
    bodyCreator: ({ phoneNumber, codeType }) => ({
      phone_number: phoneNumber,
      code_type: codeType,
    }),
    defaultNotification: {
      success: 'کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی می‌شود.',
      error: 'مشکلی وجود دارد. چند لحظه دیگر دوباره تلاش کن!',
    },
  }
);

export const loginAction = createAsyncThunkApi(
  'account/loginAction',
  Apis.POST,
  loginUrl,
  {
    defaultNotification: {
      success: 'سلام!',
      error: 'نام کاربری یا رمز عبور اشتباه است.',
    },
  }
);

export const refreshTokenAction = createAsyncThunkApi(
  'account/refreshTokenAction',
  Apis.POST,
  refreshTokenUrl,
  {
    defaultNotification: {
      error: 'ایرادی در تازه‌سازی توکن وجود داشت.',
    },
  }
);

export const changePasswordAction = createAsyncThunkApi(
  'account/changePasswordAction',
  Apis.POST,
  changePasswordUrl,
  {
    bodyCreator: ({ phoneNumber, password, code }) => ({
      phone_number: phoneNumber,
      password,
      code,
    }),
    defaultNotification: {
      success: 'گذرواژه با موفقیت تغییر یافت!',
      error: 'مشکلی وجود دارد، رمز تغییر نکرد.',
    },
  }
);



/////


export const getUserAccountAction = createAsyncThunkApi(
  'account/getUserAccountAction',
  Apis.GET,
  accountCRUDUrl,
);

export const getUserProfileAction = createAsyncThunkApi(
  'account/getUserProfileAction',
  Apis.GET,
  profileCRUDUrl,
);

export const getUserStudentshipAction = createAsyncThunkApi(
  'account/getUserStudentshipAction',
  Apis.GET,
  studentshipCRUDUrl,
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

export const deleteDiscountCodeAction = createAsyncThunkApi(
  'account/deleteDiscountCodeAction',
  Apis.DELETE,
  discountCRUDUrl,
  {
    defaultNotification: {
      success: 'کد تخفیف با موفقیت حذف شد.',
    },
  }
);

export const getAllMerchandiseDiscountCodesAction = createAsyncThunkApi(
  'account/getAllMerchandiseDiscountCodesAction',
  Apis.GET,
  merchandiseDiscountCodeUrl,
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
      history.pushState({}, '', '/events/');
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
      state.discountCodes = [...state.discountCodes, response]
      state.isFetching = false;
    },
    [createDiscountCodeAction.rejected.toString()]: isNotFetching,


    [deleteDiscountCodeAction.pending.toString()]: isFetching,
    [deleteDiscountCodeAction.fulfilled.toString()]: (state, action) => {
      const discountCodeId = action?.meta?.arg?.discountCodeId;
      const newDiscountCodes = [...state.discountCodes]
      for (let i = 0; i < newDiscountCodes.length; i++) {
        if (newDiscountCodes[i].id == discountCodeId) {
          newDiscountCodes.splice(i, 1);
          break;
        }
      }
      state.discountCodes = newDiscountCodes;
      state.isFetching = false;
    },
    [deleteDiscountCodeAction.rejected.toString()]: isNotFetching,


    [getAllMerchandiseDiscountCodesAction.pending.toString()]: isFetching,
    [getAllMerchandiseDiscountCodesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.discountCodes = response;
      state.isFetching = false;
    },
    [getAllMerchandiseDiscountCodesAction.rejected.toString()]: isNotFetching,

  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
