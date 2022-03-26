import { createReducer } from '@reduxjs/toolkit';
import { SUCCESS, ORDER_ACTION, REQUEST, FAILURE } from '../constants';

const initialState = {
  orderList: {
    data: [],
    currentPage: 1,
    lastPage: 1,
    total: 0,
    load: false,
    error: null,
  },
};

const orderReducer = createReducer(initialState, {
  [REQUEST(ORDER_ACTION.GET_ORDER_LIST)]: (state) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { currentPage, data, lastPage, total } = action.payload.data;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data,
        currentPage,
        lastPage,
        total,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        load: false,
        error,
      },
    };
  },
});

export default orderReducer;
