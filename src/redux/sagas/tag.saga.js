import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FAILURE, TAG_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';

function* getTagListSaga() {
  try {
    const { data } = yield axios.get(`${SERVER_CLIENT_API_URL}/food-tag`);
    yield put({
      type: SUCCESS(TAG_ACTION.GET_TAG_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TAG_ACTION.GET_TAG_LIST),
      payload: {
        error: e.message,
      },
    });
  }
}

export default function* tagSaga() {
  yield takeEvery(REQUEST(TAG_ACTION.GET_TAG_LIST), getTagListSaga);
}
