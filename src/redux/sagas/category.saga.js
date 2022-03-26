import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FAILURE, CATEGORY_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';

function* getCategoryListSaga() {
  try {
    const { data } = yield axios.get(`${SERVER_CLIENT_API_URL}/categories`);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        error: e.message,
      },
    });
  }
}


export default function* categorySaga() {
  yield takeEvery(REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST), getCategoryListSaga);
}
