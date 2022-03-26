import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, STORE_ACTION, RATE_ACTION, COMMENT_ACTION } from '../constants';

const initialState = {
  storeList: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
  },
  storeDetail: {
    data: {},
    load: false,
    error: null,
  },
  pictures: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
  },
};

const storeReducer = createReducer(initialState, {
  [REQUEST(STORE_ACTION.GET_STORE_LIST)]: (state) => {
    return {
      ...state,
      storeList: {
        ...state.storeList,
        load: true,
      },
    };
  },
  [SUCCESS(STORE_ACTION.GET_STORE_LIST)]: (state, action) => {
    const { currentPage, lastPage, total, data } = action.payload.data;
    let newStores = [...data];
    if (currentPage > state.storeList.currentPage) {
      newStores = [...state.storeList.data, ...newStores];
    }
    return {
      ...state,
      storeList: {
        ...state.storeList,
        data: newStores,
        currentPage,
        lastPage,
        total,
        load: false,
        error: null,
      },
    };
  },
  [REQUEST(STORE_ACTION.GET_STORE_DETAIL)]: (state) => {
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        load: true,
      },
    };
  },
  [SUCCESS(STORE_ACTION.GET_STORE_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(STORE_ACTION.GET_STORE_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        load: false,
        error,
      },
    };
  },
  [SUCCESS(RATE_ACTION.CREATE_RATE)]: (state, action) => {
    const { avgRate, rate } = action.payload.data;
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        data: {
          ...state.storeDetail.data,
          userRate: rate,
          avgRate,
          totalRating: state.storeDetail.data.totalRating + 1,
        },
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.CREATE_COMMENT)]: (state) => {
    return {
      ...state,
      storeDetail: {
        ...state.storeDetail,
        data: {
          ...state.storeDetail.data,
          totalComment: state.storeDetail.data.totalComment + 1,
        },
      },
    };
  },
  [REQUEST(STORE_ACTION.GET_STORE_PICTURES)]: (state) => {
    return {
      ...state,
      pictures: {
        ...state.pictures,
        load: true,
      },
    };
  },
  [SUCCESS(STORE_ACTION.GET_STORE_PICTURES)]: (state, action) => {
    const { data, currentPage, lastPage, total } = action.payload.data;
    let newPictures = [...data];
    if (currentPage > state.pictures.currentPage) {
      newPictures = [...state.pictures.data, ...newPictures];
    }
    return {
      ...state,
      pictures: {
        ...state.pictures,
        data: newPictures,
        currentPage,
        lastPage,
        total,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(STORE_ACTION.GET_STORE_PICTURES)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      pictures: {
        ...state.pictures,
        load: false,
        error,
      },
    };
  },

});

export default storeReducer;
