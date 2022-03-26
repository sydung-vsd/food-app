import { createAction } from '@reduxjs/toolkit';
import { REQUEST, STORE_ACTION } from '../constants';

export const getStoresAction = createAction(REQUEST(STORE_ACTION.GET_STORE_LIST));
export const getStoreDetailAction = createAction(REQUEST(STORE_ACTION.GET_STORE_DETAIL));
export const getStorePicturesAction = createAction(REQUEST(STORE_ACTION.GET_STORE_PICTURES));
