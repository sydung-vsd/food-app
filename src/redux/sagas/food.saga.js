import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FOOD_ACTION, FAILURE, LIKE_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import toSnakeCase from '../../utils/toSnakeCase';

function* getFoodListSaga({ payload: { group, limit, page, search, sort, sortType, store, tags, user } }) {
  try {
    const params = {
        ...store && { store },
        ...tags && { tags },
        ...group && { group },
        ...sort && { sort, sortType },
        ...user && { user },
        ...page && { page },
        ...search && { search },
        ...limit && { limit },
      },
      { data } = yield axios({
        method: 'GET',
        url: `${SERVER_CLIENT_API_URL}/foods`,
        params: toSnakeCase(params),
      });
    yield put({
      type: SUCCESS(FOOD_ACTION.GET_FOOD_LIST),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
    yield call(getLikeList, data.data);
  } catch (e) {
    yield put({ type: FAILURE(FOOD_ACTION.GET_FOOD_LIST), payload: { error: e.message } });
  }
}

function* getFoodPromotionSaga() {
  try {
    const { data } = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/foods`,
      params: toSnakeCase({
        group: 'promotion',
        limit: 12,
      }),
    });
    yield put({
      type: SUCCESS(FOOD_ACTION.GET_FOOD_PROMOTIONS),
      payload: {
        data: camelCaseKeys(data, { deep: true }),
      },
    });
    yield call(getLikeList, data.data);
  } catch (e) {
    // yield put({ type: FAILURE(FOOD_ACTION.GET_FOOD_LIST_INITIAL), payload: e.message });
  }
}

function* getLikeList(data) {
  const userToken = localStorage.userInfo;
  if (userToken && data.length > 0) {
    const { accessToken } = JSON.parse(userToken);
    const foodIds = data.map((foodItem) => {
      return foodItem.id;
    });
    yield put({
      type: REQUEST(LIKE_ACTION.GET_LIKE_LIST),
      payload: {
        accessToken,
        data: { foodIds },
      },
    });
  }
}

export default function* foodSaga() {
  yield takeEvery(REQUEST(FOOD_ACTION.GET_FOOD_LIST), getFoodListSaga);
  yield takeEvery(REQUEST(FOOD_ACTION.GET_FOOD_PROMOTIONS), getFoodPromotionSaga);
}
