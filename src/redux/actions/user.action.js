import { createAction } from '@reduxjs/toolkit';
import { REQUEST, RESET, USER_ACTION } from '../constants';

export const loginAction = createAction(REQUEST(USER_ACTION.LOGIN));
export const logoutAction = createAction(REQUEST(USER_ACTION.LOGOUT));
export const registerAction = createAction(REQUEST(USER_ACTION.REGISTER));
export const getUserInfoAction = createAction(REQUEST(USER_ACTION.GET_USER_INFO));
export const checkEmailExistsAction = createAction(REQUEST(USER_ACTION.CHECK_EMAIL_EXISTS));
export const refreshTokenUserAction = createAction(REQUEST(USER_ACTION.REFRESH_TOKEN));
export const changeAvatarAction = createAction(REQUEST(USER_ACTION.CHANGE_AVATAR));
export const changePasswordAction = createAction(REQUEST(USER_ACTION.CHANGE_PASSWORD));
export const changeEmailAction = createAction(REQUEST(USER_ACTION.CHANGE_EMAIL));
export const changeNumberPhoneAction = createAction(REQUEST(USER_ACTION.CHANGE_NUMBER_PHONE));
export const changeFullNameAction = createAction(REQUEST(USER_ACTION.CHANGE_FULL_NAME));
export const updateUserAction = createAction(REQUEST(USER_ACTION.UPDATE_USER));
export const resetErrorPasswordAction = createAction(RESET(USER_ACTION.ERROR_PASSWORD));
export const resetCheckEmailAction = createAction(RESET(USER_ACTION.CHECK_EMAIL_EXISTS));
