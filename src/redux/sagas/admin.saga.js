import { notification } from 'antd';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FAILURE, ADMIN_ACTION } from '../constants';
import { SERVER_ADMIN_API_URL } from '../../contants';

import history from '../../utils/history';

function* loginAdminSaga({ payload: { data } }) {
  try {
    let result = yield axios.post(`${SERVER_ADMIN_API_URL}/login`, data);
    yield (result = camelCaseKeys(result.data, { deep: true }));
    yield (localStorage.adminInfo = JSON.stringify({
      accessToken: result.accessToken,
      expires: result.expire,
    }));

    yield put({
      type: SUCCESS(ADMIN_ACTION.ADMIN_LOGIN),
      payload: {
        data: result.user,
      },
    });

    yield notification.success({
      message: 'Đăng nhập thành công!',
    });

    yield history.push('/manager');
  } catch (e) {
    yield put({
      type: FAILURE(ADMIN_ACTION.ADMIN_LOGIN),
      payload: {
        error: 'Email hoặc mật khẩu không đúng!',
      },
    });
  }
}

function* refreshAdminSaga({ payload: { data } }) {
  try {
    let result = yield axios({
      method: 'post',
      url: `${SERVER_ADMIN_API_URL}/refresh`,
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    yield (result = camelCaseKeys(result.data, { deep: true }));
    yield (localStorage.adminInfo = JSON.stringify({
      accessToken: result.accessToken,
      expires: result.expire,
    }));

    yield put({
      type: SUCCESS(ADMIN_ACTION.REFRESH_ADMIN_TOKEN),
      payload: {
        data: result.user,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ADMIN_ACTION.REFRESH_ADMIN_TOKEN),
      payload: {
        error: e.message,
      },
    });
  }
}

// function* registerSaga(action) {
//     try {
//         const {data} = action.payload;
//         yield axios.post(`${SERVER_API_URL}/register`, data);
//         yield put({type: SUCCESS(USER_ACTION.REGISTER)});
//         yield notification.success({
//             message: 'Đăng ký thành công!',
//         });
//         yield history.push('/login');
//     } catch (e) {
//         if (e.response.data === 'Email already exists') {
//             yield put({
//                 type: FAILURE(USER_ACTION.REGISTER),
//                 payload: {
//                     error: 'Email đã tồn tại!'
//                 }
//             });
//         } else {
//             yield put({
//                 type: FAILURE(USER_ACTION.REGISTER),
//                 payload: {
//                     error: null
//                 },
//             });
//         }
//     }
// }
//
function* getAdminInfoSaga({ payload: { data } }) {
  try {
    const { data: responseData } = yield axios.get(`${SERVER_ADMIN_API_URL}/user-profile`, {
      headers: { Authorization: `Bearer ${data}` },
    });
    yield put({
      type: SUCCESS(ADMIN_ACTION.GET_ADMIN_INFO),
      payload: {
        data: camelCaseKeys(responseData, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(ADMIN_ACTION.GET_ADMIN_INFO),
      payload: e.message,
    });
  }
}

export default function* adminSaga() {
  yield takeEvery(REQUEST(ADMIN_ACTION.ADMIN_LOGIN), loginAdminSaga);
  yield takeEvery(REQUEST(ADMIN_ACTION.REFRESH_ADMIN_TOKEN), refreshAdminSaga);
  // yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(ADMIN_ACTION.GET_ADMIN_INFO), getAdminInfoSaga);
}
