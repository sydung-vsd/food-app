import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  promotionList: {
    data: [],
    load: false,
    error: null,
  },
};

const promotionReducer = createReducer(initialState, {});

export default promotionReducer;
