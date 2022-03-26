import { createReducer } from '@reduxjs/toolkit';
import { SUCCESS, TAG_ACTION } from '../constants';

const initialState = {
  tagList: {
    data: [],
    load: false,
    error: null,
  },
};

const tagReducer = createReducer(initialState, {
  [SUCCESS(TAG_ACTION.GET_TAG_LIST)]: (state, { payload: { data } }) => {
    return {
      ...state,
      tagList: {
        ...state.tagList,
        data,
        load: false,
        error: null,
      },
    };
  },
});

export default tagReducer;
