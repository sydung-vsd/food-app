import { createReducer } from '@reduxjs/toolkit';
import { FAILURE, RATE_ACTION, REQUEST, SUCCESS } from '../constants';


const initialState = {
  rateList: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
  },
};

const rateReducer = createReducer(initialState, {
  [REQUEST(RATE_ACTION.GET_RATE_LIST)]: (state) => {
    return {
      ...state,
      rateList: {
        ...state.rateList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(RATE_ACTION.GET_RATE_LIST)]: (state, action) => {
    const { data, currentPage, lastPage, total } = action.payload.data;
    let newRates = [...data];
    if (currentPage > state.rateList.currentPage) {
      newRates = [...state.rateList.data, ...newRates];
    }
    return {
      ...state,
      rateList: {
        data: newRates,
        currentPage,
        lastPage,
        total,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(RATE_ACTION.GET_RATE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      rateList: {
        ...state.rateList,
        load: false,
        error,
      },
    };
  },
});

export default rateReducer;
