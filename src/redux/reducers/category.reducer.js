import { createReducer } from '@reduxjs/toolkit';
import { SUCCESS, CATEGORY_ACTION } from '../constants';

const initialState = {
  categories: {
    data: [],
    load: false,
    error: null,
  },
};

const categoryReducer = createReducer(initialState, {
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, { payload: { data } }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        data,
        load: false,
        error: null,
      },
    };
  },
});

export default categoryReducer;
