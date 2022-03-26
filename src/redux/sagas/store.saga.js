import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FAILURE, STORE_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import toSnakeCase from '../../utils/toSnakeCase';

function* getStoreListSaga({ payload: { category, group, limit, page, search, sort, sortType, user } }) {
  try {
    const params = {
        ...category && { category },
        ...group && { group },
        ...sort && { sort, sortType },
        ...user && { user },
        ...page && { page },
        ...search && { search },
        ...limit && { limit },
      },
      { data } = yield axios({
        method: 'GET',
        url: `${SERVER_CLIENT_API_URL}/stores`,
        params: toSnakeCase(params),
      });
    yield put({
      type: SUCCESS(STORE_ACTION.GET_STORE_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(STORE_ACTION.GET_STORE_LIST), payload: e.message });
  }
}

function* getStoreDetailSaga({ payload: { slug, user } }) {
  try {
    const storeId = slug.slice(slug.lastIndexOf('.') + 1);
    if (/^\d+$/.test(storeId)) {
      const { data } = yield axios({
        method: 'GET',
        url: `${SERVER_CLIENT_API_URL}/stores/${storeId}`,
        params: {
          ...(user && { user }),
        },
      });
      yield put({
        type: SUCCESS(STORE_ACTION.GET_STORE_DETAIL),
        payload: {
          data: camelCaseKeys(data, { deep: true }),
        },
      });
    } else {
      yield put({
        type: FAILURE(STORE_ACTION.GET_STORE_DETAIL),
        payload: { error: 'StoreId không tồn tại' },
      });
    }
  } catch (e) {
    yield put({
      type: FAILURE(STORE_ACTION.GET_STORE_DETAIL),
      payload: { error: e.message },
    });
  }
}

function* getStorePicturesSaga({ payload: { params, storeId } }) {
  try {
    const { data } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/stores/${storeId}/pictures`,
      params,
    });
    yield put({
      type: SUCCESS(STORE_ACTION.GET_STORE_PICTURES),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(STORE_ACTION.GET_STORE_PICTURES),
      payload: { error: e.message },
    });
  }
}

export default function* storeSaga() {
  yield takeEvery(REQUEST(STORE_ACTION.GET_STORE_LIST), getStoreListSaga);
  yield takeEvery(REQUEST(STORE_ACTION.GET_STORE_DETAIL), getStoreDetailSaga);
  yield takeEvery(REQUEST(STORE_ACTION.GET_STORE_PICTURES), getStorePicturesSaga);
}
