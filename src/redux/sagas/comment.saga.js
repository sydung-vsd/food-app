import { fork, put, take, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, COMMENT_ACTION, FAILURE, SUCCESS } from '../constants';
import { PATH, ROOT_PATH, SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';
import history from '../../utils/history';
import { END, eventChannel } from 'redux-saga';
import { message } from 'antd';

function* getCommentsSaga({ payload }) {
  try {
    const storeId = payload?.storeId,
      userId = payload?.userId,
      page = payload?.page,
      params = {
        ...storeId && { store: storeId },
        ...userId && { userId },
        ...page && { page },
      },
      { data } = yield axios({
        method: 'GET',
        url: `${SERVER_CLIENT_API_URL}/comment`,
        params: toSnakeCase(params),
      });
    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: { error: e.message },
    });
  }
}

function* createCommentSaga({
  payload: {
    accessToken,
    description,
    paths,
    slug,
    from,
  },
}) {
  try {
    const storeId = slug.slice(slug.lastIndexOf('.') + 1),
      data = { storeId, paths, content: description },
      { data: dataResponse } = yield axios({
        method: 'POST',
        url: `${SERVER_CLIENT_API_URL}/comment`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: toSnakeCase(data),
      });
    console.log(dataResponse);
    yield put({
      type: SUCCESS(COMMENT_ACTION.CREATE_COMMENT),
      payload: {
        data: {
          ...camelCaseKeys(dataResponse, { deep: true }),
          pictures: [...paths],
        },
      },
    });
    if (from !== PATH.STORE_MENU_COMMENT) {
      history.push(PATH.STORE_DETAIL(slug, PATH.STORE_MENU_COMMENT));
    }
  } catch (e) {
    yield put({
      type: FAILURE(COMMENT_ACTION.CREATE_COMMENT),
      payload: { error: e.message },
    });
  }
}

function createUploader({ token, data }) {

  const upload = (accessToken, data, onUploadProgress) => {
    const formData = new FormData();
    formData.append('image', data.file);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    };
    return axios.post(
      `${SERVER_CLIENT_API_URL}/comment-upload-picture-single`,
      formData,
      config,
    );
  };

  let emit;
  const chan = eventChannel((emitter) => {
    emit = emitter;
    return () => {
    };
  });
  const uploadProgressCb = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) {
      emit(END);
    }
  };
  const uploadPromise = upload(token, data, uploadProgressCb);
  return [uploadPromise, chan];
}

function* uploadProgressWatcher({ chan, uid }) {
  while (true) {
    const progress = yield take(chan);
    yield put({
      type: COMMENT_ACTION.UPDATE_PROGRESS_PICTURE,
      payload: {
        uid,
        percent: progress,
      },
    });
  }
}

function* uploadPictureSaga({ payload: { accessToken, data } }) {
  try {
    const [uploadPromise, chan] = yield call(createUploader, { token: accessToken, data });
    yield fork(uploadProgressWatcher, { chan, uid: data.uid });
    const { data: dataResponse } = yield call(() => uploadPromise);
    yield put({
      type: SUCCESS(COMMENT_ACTION.UPLOAD_PICTURE),
      payload: {
        uid: data.uid,
        data: camelCaseKeys(dataResponse, { deep: true }),
      },
    });
  } catch (e) {
    message.error('Đã xảy ra lỗi!');
    yield put({
      type: FAILURE(COMMENT_ACTION.UPLOAD_PICTURE),
      payload: {
        error: e.message,
        uid: data.uid,
      },
    });
  }
}

function* removePictureSaga({ payload: { accessToken, data: { path, uid } } }) {
  try {
    const data = {
      path: path.replace(ROOT_PATH, ''),
    };
    console.log(data);
    yield axios.post(
      `${SERVER_CLIENT_API_URL}/comment-picture-d`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    yield put({
      type: SUCCESS(COMMENT_ACTION.REMOVE_PICTURE),
      payload: {
        uid,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
}

function* removeAllPicturesSaga({ payload: { accessToken, data } }) {
  try {
    yield axios.post(
      `${SERVER_CLIENT_API_URL}/comment-pictures-d`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    yield put({
      type: SUCCESS(COMMENT_ACTION.REMOVE_ALL_PICTURE),
    });
  } catch (e) {
    console.log(e.response);
    yield put({
      type: FAILURE(COMMENT_ACTION.REMOVE_ALL_PICTURE),
      payload: {
        error: e.message,
      },
    });
  }
}


export default function* commentSaga() {
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), getCommentsSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.CREATE_COMMENT), createCommentSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.UPLOAD_PICTURE), uploadPictureSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.REMOVE_PICTURE), removePictureSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.REMOVE_ALL_PICTURE), removeAllPicturesSaga);
}
