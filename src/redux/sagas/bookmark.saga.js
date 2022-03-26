import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, BOOKMARK_ACTION, SUCCESS, FAILURE } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';
import { notification } from 'antd';

function* getBookmarkDetailSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responseData } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/bookmark/${data.storeId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL),
      payload: {
        data: camelCaseKeys(responseData),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL),
      payload: { error: e.message },
    });
  }
}

function* updateBookmarkSaga({ payload: { accessToken, data } }) {
  try {
    yield axios({
      method: 'PATCH',
      url: `${SERVER_CLIENT_API_URL}/bookmark`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(BOOKMARK_ACTION.UPDATE_BOOKMARK),
      payload: {
        data,
      },
    });
    yield notification.success({
      message: 'Sửa bộ sưu tập thành công',
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKMARK_ACTION.UPDATE_BOOKMARK),
      payload: { error: e.message },
    });
  }
}

function* createBookmarkSaga({ payload: { accessToken, data } }) {
  try {
    yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/bookmark`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(BOOKMARK_ACTION.CREATE_BOOKMARK),
    });
    yield notification.success({
      message: 'Thêm vào bộ sưu tập thành công',
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKMARK_ACTION.CREATE_BOOKMARK),
      payload: { error: e.message },
    });
  }
}

function* getBookmarksSaga({ payload: { accessToken, page } }) {
  try {
    const { data } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/bookmark`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        ...page && { page },
      },
    });
    yield put({
      type: SUCCESS(BOOKMARK_ACTION.GET_BOOKMARK_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKMARK_ACTION.GET_BOOKMARK_LIST),
      payload: { error: e.message },
    });
  }
}

export default function* bookmarkSaga() {
  yield takeEvery(REQUEST(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL), getBookmarkDetailSaga);
  yield takeEvery(REQUEST(BOOKMARK_ACTION.UPDATE_BOOKMARK), updateBookmarkSaga);
  yield takeEvery(REQUEST(BOOKMARK_ACTION.CREATE_BOOKMARK), createBookmarkSaga);
  yield takeEvery(REQUEST(BOOKMARK_ACTION.GET_BOOKMARK_LIST), getBookmarksSaga);
}
