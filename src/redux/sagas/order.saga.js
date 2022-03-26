import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, ORDER_ACTION, FAILURE, SUCCESS } from '../constants';
import { PATH, SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';
import toSnakeCase from '../../utils/toSnakeCase';
import history from '../../utils/history';
import { notification } from 'antd';
import { MSG, MSG_SUCCESS } from '../../contants/message.contant';

function* createOrderSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responseData } = yield axios({
      method: 'POST',
      url: `${SERVER_CLIENT_API_URL}/order`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: toSnakeCase(data),
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.CREATE_ORDER),
      payload: {
        data: camelCaseKeys(responseData),
      },
    });
    history.push(PATH.SUP_PROFILE(PATH.PROFILE_ORDER));
    notification.success({ message: MSG_SUCCESS(MSG.ORDER) });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.CREATE_ORDER),
      payload: { error: e.message },
    });
  }
}

function* getListOrdersSaga({ payload: { accessToken, params } }) {
  try {
    const { data } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/order`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: toSnakeCase(params),
    });
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ORDER_ACTION.GET_ORDER_LIST),
      payload: { error: e.message },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.CREATE_ORDER), createOrderSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getListOrdersSaga);
}
