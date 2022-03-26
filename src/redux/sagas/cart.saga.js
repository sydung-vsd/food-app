import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, CART_ACTION, FAILURE, SUCCESS } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import { message } from 'antd';

import AddCartSuccess from '../../components/clients/AddCartSuccess';

function* getCartListSaga({ payload: { data: { accessToken } } }) {
  try {
    const { data } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/carts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.GET_CART_LIST),
      payload: { error: e.message },
    });
  }
}

function* updateCartSaga({ payload: { data: { accessToken, action, food, isDisplayMessage } } }) {
  try {
    const { data: responseData } = yield axios({
        method: 'POST',
        url: `${SERVER_CLIENT_API_URL}/carts`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          food,
          ...action && { action },
        },
      }),
      data = camelCaseKeys(responseData, { deep: true });
    yield put({
      type: SUCCESS(CART_ACTION.UPDATE_CART),
      payload: {
        data: {
          ...data,
          isDisplayMessage,
        },
      },
    });
    const { cartUpdate, totalMoney } = data;
    if (isDisplayMessage) {
      yield message.open({
        className: 'add-cart-message',
        content: (<AddCartSuccess cartItem={cartUpdate} totalMoney={totalMoney} />),
      });
    }
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.UPDATE_CART),
      payload: { error: e.message, data: food },
    });
  }
}

function* deleteCartSaga({ payload: { data: { accessToken, food } } }) {
  try {
    const { data } = yield axios({
      method: 'DELETE',
      url: `${SERVER_CLIENT_API_URL}/carts`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ...food && { food },
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.DESTROY_CART),
      payload: {
        data: camelCaseKeys({ ...data, ...food && { foodId: food } }, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(CART_ACTION.DESTROY_CART),
      payload: { error: e.message, data: food },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga);
  yield takeEvery(REQUEST(CART_ACTION.UPDATE_CART), updateCartSaga);
  yield takeEvery(REQUEST(CART_ACTION.DESTROY_CART), deleteCartSaga);
}
