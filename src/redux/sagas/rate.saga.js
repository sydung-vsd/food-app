import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, RATE_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';

function* createRateSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responserData } = yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/rate`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(RATE_ACTION.CREATE_RATE),
      payload: {
        data: camelCaseKeys({ avgRate: responserData, rate: data.rate }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(RATE_ACTION.CREATE_RATE),
      payload: { error: e.message },
    });
  }
}

function* getRatesSaga({ payload: { accessToken, page } }) {
  try {
    const { data } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/rate`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        ...page && { page },
      },
    });
    yield put({
      type: SUCCESS(RATE_ACTION.GET_RATE_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(RATE_ACTION.GET_RATE_LIST),
      payload: { error: e.message },
    });
  }
}

export default function* rateSaga() {
  yield takeEvery(REQUEST(RATE_ACTION.CREATE_RATE), createRateSaga);
  yield takeEvery(REQUEST(RATE_ACTION.GET_RATE_LIST), getRatesSaga);
}
