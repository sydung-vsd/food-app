import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, USER_ACTION, RESET } from '../constants';

const initialState = {
  userList: [],
  userInfo: {
    data: {},
    load: false,
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
    },
    update: {
      load: false,
      error: null,
      email: {
        success: false,
        load: false,
        error: null,
      },
      phone: {
        success: false,
        load: false,
      },
      fullName: {
        load: false,
        error: null,
      },
      password: {
        load: false,
        error: null,
      },
    },
    checkEmail: {
      success: false,
      load: false,
      error: null,
    },
  },
};
const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.LOGIN)]: (state) => {
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
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
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
      userInfo: {
        ...state.userInfo,
        data,
      },
    };
  },
  [FAILURE(USER_ACTION.LOGIN)]: (state, action) => {
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
  [REQUEST(USER_ACTION.CHECK_EMAIL_EXISTS)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        checkEmail: {
          load: true,
          success: false,
          error: null,
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.CHECK_EMAIL_EXISTS)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        checkEmail: {
          load: false,
          success: true,
          error: null,
        },
      },
    };
  },
  [FAILURE(USER_ACTION.CHECK_EMAIL_EXISTS)]: (state, action) => {
    const { error, status } = action.payload;
    if (status === 403) {
      return {
        ...state,
        responseAction: {
          ...state.responseAction,
          checkEmail: {
            load: false,
            success: false,
            error,
          },
        },
      };
    }
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        checkEmail: {
          load: false,
          success: false,
          error: null,
        },
      },
    };
  },

  [REQUEST(USER_ACTION.LOGOUT)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: {},
      },
    };
  },

  [REQUEST(USER_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          load: true,
          error: null,
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          load: false,
        },
      },
    };
  },

  [FAILURE(USER_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          load: false,
        },
      },
    };
  },

  [REQUEST(USER_ACTION.GET_USER_INFO)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: false,
        error,
      },
    };
  },
  [REQUEST(USER_ACTION.REFRESH_TOKEN)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(USER_ACTION.REFRESH_TOKEN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(USER_ACTION.REFRESH_TOKEN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: false,
        error,
      },
    };
  },
  [REQUEST(USER_ACTION.CHANGE_AVATAR)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loadChangeAvatar: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.CHANGE_AVATAR)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data: {
          ...state.userInfo.data,
          avatar: data,
          loadChangeAvatar: false,
        },
      },
    };
  },
  [FAILURE(USER_ACTION.CHANGE_AVATAR)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loadChangeAvatar: false,
      },
    };
  },
  [REQUEST(USER_ACTION.CHANGE_FULL_NAME)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          fullName: {
            load: true,
            success: false,
          },
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.CHANGE_FULL_NAME)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          fullName: {
            load: false,
            success: true,
          },
        },
      },
    };
  },
  [FAILURE(USER_ACTION.CHANGE_FULL_NAME)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          fullName: {
            load: false,
            success: false,
          },
        },
      },
    };
  },

  [REQUEST(USER_ACTION.CHANGE_EMAIL)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          email: {
            load: true,
            success: false,
            error: null,
          },
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.CHANGE_EMAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          email: {
            load: false,
            success: true,
            error: null,
          },
        },
      },
    };
  },
  [FAILURE(USER_ACTION.CHANGE_EMAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          email: {
            load: false,
            success: false,
            error,
          },
        },
      },
    };
  },

  [REQUEST(USER_ACTION.CHANGE_NUMBER_PHONE)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          phone: {
            load: true,
            success: false,
          },
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.CHANGE_NUMBER_PHONE)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          phone: {
            load: false,
            success: true,
          },
        },
      },
    };
  },
  [FAILURE(USER_ACTION.CHANGE_NUMBER_PHONE)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          phone: {
            load: false,
            success: false,
          },
        },
      },
    };
  },

  [REQUEST(USER_ACTION.CHANGE_PASSWORD)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          password: {
            load: true,
            error: null,
          },
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          password: {
            load: false,
            error: null,
          },
        },
      },
    };
  },
  [FAILURE(USER_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          password: {
            load: false,
            error,
          },
        },
      },
    };
  },

  [REQUEST(USER_ACTION.UPDATE_USER)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          load: true,
          error: null,
        },
      },
    };
  },
  [SUCCESS(USER_ACTION.UPDATE_USER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          load: false,
          error: null,
        },
      },
    };
  },
  [FAILURE(USER_ACTION.UPDATE_USER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          load: false,
          error,
        },
      },
    };
  },
  [RESET(USER_ACTION.ERROR_PASSWORD)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        update: {
          ...state.responseAction.update,
          password: {
            load: false,
            error: null,
          },
        },
      },
    };
  },
  [RESET(USER_ACTION.CHECK_EMAIL_EXISTS)]: (state) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        checkEmail: {
          success: false,
          load: false,
          error: null,
        },
      },
    };
  },
});

export default userReducer;
