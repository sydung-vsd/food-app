import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, ADMIN_ACTION } from '../constants';

const initialState = {
  userAdminList: [],
  adminInfo: {
    data: {},
    load: true,
    error: null,
  },
  responseAction: {
    login: {
      load: false,
      error: null,
    },
    register: {
      load: false,
      error: null,
      email: {
        success: false,
        load: false,
        error: null,
      },
    },
  },
};
const adminReducer = createReducer(initialState, {
  [REQUEST(ADMIN_ACTION.ADMIN_LOGIN)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          load: true,
          error: null,
        },
      },
    };
  },
  [SUCCESS(ADMIN_ACTION.ADMIN_LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          load: false,
          error: null,
        },
      },
      adminInfo: {
        ...state.adminInfo,
        data: {
          ...state.adminInfo.data,
          data,
        },
      },
    };
  },

  [FAILURE(ADMIN_ACTION.ADMIN_LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          load: false,
          error,
        },
      },
    };
  },

  [REQUEST(ADMIN_ACTION.CHECK_ADMIN_EMAIL_EXISTS)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          email: {
            load: true,
            success: false,
            error: null,
          },
        },
      },
    };
  },
  [SUCCESS(ADMIN_ACTION.CHECK_ADMIN_EMAIL_EXISTS)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          email: {
            load: false,
            error: null,
            success: true,
          },
        },
      },
    };
  },
  [FAILURE(ADMIN_ACTION.CHECK_ADMIN_EMAIL_EXISTS)]: (state, action) => {
    const { error, status } = action.payload;
    if (status === 403) {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          register: {
            ...state.responseAction.register,
            email: {
              load: false,
              success: false,
              error,
            },
          },
        },
      };
    }
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          email: {
            load: false,
            success: false,
            error: null,
          },
        },
      },
    };
  },

  [REQUEST(ADMIN_ACTION.GET_ADMIN_INFO)]: (state) => {
    return {
      ...state,
      adminInfo: {
        ...state.adminInfo,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(ADMIN_ACTION.GET_ADMIN_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      adminInfo: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(ADMIN_ACTION.GET_ADMIN_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      adminInfo: {
        data: {},
        load: false,
        error,
      },
    };
  },
  [REQUEST(ADMIN_ACTION.REFRESH_ADMIN_TOKEN)]: (state) => {
    return {
      ...state,
      adminInfo: {
        ...state.adminInfo,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(ADMIN_ACTION.REFRESH_ADMIN_TOKEN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      adminInfo: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(ADMIN_ACTION.REFRESH_ADMIN_TOKEN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      adminInfo: {
        data: {},
        load: false,
        error,
      },
    };
  },
});

export default adminReducer;
