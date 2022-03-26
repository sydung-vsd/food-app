import { createAction } from '@reduxjs/toolkit';
import { REQUEST, ORDER_ACTION } from '../constants';

export const getordersAction = createAction(REQUEST(ORDER_ACTION.GET_ORDER_LIST));
export const createOrderAction = createAction(REQUEST(ORDER_ACTION.CREATE_ORDER));
export const destroyOrderAction = createAction(REQUEST(ORDER_ACTION.DESTROY_ORDER));
