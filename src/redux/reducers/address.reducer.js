import { createReducer } from '@reduxjs/toolkit';
import { ADDRESS_ACTION, FAILURE, REQUEST, SUCCESS } from '../constants';

const initialState = {
  provinces: {
    data: [],
    load: false,
    error: null,
  },
  districts: {
    data: [],
    load: false,
    error: null,
  },
  wards: {
    data: [],
    load: false,
    error: null,
  },
  addressDetail: {},
};

const addressReducer = createReducer(initialState, {
  [REQUEST(ADDRESS_ACTION.GET_ADDRESS)]: (state) => {
    return {
      ...state,
      provinces: {
        ...state.provinces,
        load: true,
        error: null,
      },
      districts: {
        ...state.districts,
        load: true,
        error: null,
      },
      wards: {
        ...state.wards,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(ADDRESS_ACTION.GET_ADDRESS)]: (state, action) => {
    const { provinces, districts, wards } = action.payload.data;
    return {
      ...state,
      provinces: {
        data: provinces,
        load: false,
        error: null,
      },
      districts: {
        data: districts,
        load: false,
        error: null,
      },
      wards: {
        data: wards,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(ADDRESS_ACTION.GET_ADDRESS)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      provinces: {
        ...state.provinces,
        load: false,
        error,
      },
      districts: {
        ...state.districts,
        load: false,
        error,
      },
      wards: {
        ...state.wards,
        load: false,
        error,
      },
    };
  },

  [REQUEST(ADDRESS_ACTION.GET_DISTRICTS)]: (state) => {
    return {
      ...state,
      districts: {
        ...state.districts,
        load: true,
        error: null,
      },
      wards: {
        ...state.wards,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(ADDRESS_ACTION.GET_DISTRICTS)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      districts: {
        data,
        load: false,
        error: null,
      },
      wards: {
        data: [],
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(ADDRESS_ACTION.GET_DISTRICTS)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      districts: {
        ...state.districts,
        load: false,
        error,
      },
      wards: {
        ...state.wards,
        load: false,
        error,
      },
    };
  },

  [REQUEST(ADDRESS_ACTION.GET_WARDS)]: (state) => {
    return {
      ...state,
      wards: {
        ...state.wards,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(ADDRESS_ACTION.GET_WARDS)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      wards: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(ADDRESS_ACTION.GET_WARDS)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      wards: {
        ...state.wards,
        load: false,
        error,
      },
    };
  },

});

export default addressReducer;
