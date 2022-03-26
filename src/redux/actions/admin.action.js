import { createAction } from '@reduxjs/toolkit';
import { REQUEST, ADMIN_ACTION, FAILURE } from '../constants';

export const adminLoginAction = createAction(REQUEST(ADMIN_ACTION.ADMIN_LOGIN));
export const adminLogoutAction = createAction(REQUEST(ADMIN_ACTION.ADMIN_LOGOUT));
export const adminRegisterAction = createAction(REQUEST(ADMIN_ACTION.ADMIN_REGISTER));
export const getAdminInfoAction = createAction(REQUEST(ADMIN_ACTION.GET_ADMIN_INFO));
export const redirectAdminPage = createAction(FAILURE(ADMIN_ACTION.GET_ADMIN_INFO));
export const checkAdminEmailExistsAction = createAction(
  REQUEST(ADMIN_ACTION.CHECK_ADMIN_EMAIL_EXISTS)
);
export const refreshAdminTokenUserAction = createAction(
  REQUEST(ADMIN_ACTION.REFRESH_ADMIN_TOKEN)
);
