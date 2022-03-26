import { createReducer } from '@reduxjs/toolkit';
import { COMMENT_ACTION, FAILURE, REQUEST, SUCCESS } from '../constants';
import { ROOT_PATH } from '../../contants';

const initialState = {
  commentList: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
  },
  pictures: [],
};

const commentReducer = createReducer(initialState, {
  [REQUEST(COMMENT_ACTION.CREATE_COMMENT)]: (state) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.CREATE_COMMENT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        data: [
          {
            ...data,
          },
          ...state.commentList.data,
        ],
        load: false,
        error: null,
      },
      pictures: [],
    };
  },
  [FAILURE(COMMENT_ACTION.CREATE_COMMENT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error,
      },
    };
  },
  [REQUEST(COMMENT_ACTION.GET_COMMENT_LIST)]: (state) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { data, currentPage, total, lastPage } = action.payload.data;
    let newComments = [...data];
    if (currentPage > state.commentList.currentPage) {
      newComments = [...state.commentList.data, ...newComments];
    }
    return {
      ...state,
      commentList: {
        data: newComments,
        currentPage,
        total,
        lastPage,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error,
      },
    };
  },

  [REQUEST(COMMENT_ACTION.UPLOAD_PICTURE)]: (state, { payload: { data: { uid } } }) => {
    const newPicture = {
      uid,
      percent: 0,
      status: 'uploading',
      name: '',
      url: '',
    };
    return {
      ...state,
      pictures: [...state.pictures, newPicture],
    };
  },
  [COMMENT_ACTION.UPDATE_PROGRESS_PICTURE]: (state, { payload: { uid, percent } }) => {
    const pictures = [...state.pictures];
    const pictureIndex = pictures.findIndex((picture) => picture.uid === uid);
    const pictureProgress = {
      ...state.pictures[pictureIndex],
      percent,
    };
    if (pictureIndex !== -1) {
      pictures.splice(pictureIndex, 1, pictureProgress);
    }
    return {
      ...state,
      pictures,
    };
  },
  [SUCCESS(COMMENT_ACTION.UPLOAD_PICTURE)]: (state, { payload: { uid, data } }) => {
    const pictures = [...state.pictures];
    const pictureIndex = pictures.findIndex((picture) => picture.uid === uid);
    const pictureSuccess = {
      uid,
      status: 'done',
      name: data.fileName,
      url: `${ROOT_PATH}${data.path}`,
    };
    if (pictureIndex !== -1) {
      pictures.splice(pictureIndex, 1, pictureSuccess);
    }
    return {
      ...state,
      pictures,
    };
  },
  [FAILURE(COMMENT_ACTION.UPLOAD_PICTURE)]: (state, { payload: { uid } }) => {
    const pictures = [...state.pictures];
    const pictureIndex = pictures.findIndex((picture) => picture.uid === uid);
    if (pictureIndex !== -1) {
      pictures.splice(pictureIndex, 1);
    }
    return {
      ...state,
      pictures,
    };
  },
  [SUCCESS(COMMENT_ACTION.REMOVE_PICTURE)]: (state, { payload: { uid } }) => {
    const pictures = [...state.pictures];
    const pictureIndex = pictures.findIndex((picture) => picture.uid === uid);
    if (pictureIndex !== -1) {
      pictures.splice(pictureIndex, 1);
    }
    return {
      ...state,
      pictures,
    };
  },
  [SUCCESS(COMMENT_ACTION.REMOVE_ALL_PICTURE)]: (state) => {
    return {
      ...state,
      pictures: [],
    };
  },
  [FAILURE(COMMENT_ACTION.REMOVE_ALL_PICTURE)]: (state) => {
    return {
      ...state,
      pictures: [],
    };
  },
});

export default commentReducer;
