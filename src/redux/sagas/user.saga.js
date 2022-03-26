import { notification } from 'antd';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from '../constants';
import { PATH, SERVER_CLIENT_API_URL } from '../../contants';

import history from '../../utils/history';
import toSnakeCase from '../../utils/toSnakeCase';
import { MSG, MSG_ERROR, MSG_SUCCESS } from '../../contants/message.contant';

function* loginSaga({ payload: { data } }) {
  try {
    let result = yield axios.post(`${SERVER_CLIENT_API_URL}/login`, data);
    yield (result = camelCaseKeys(result.data, { deep: true }));
    yield (localStorage.userInfo = JSON.stringify({
      accessToken: result.accessToken,
      expires: result.expire,
    }));

    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.user,
      },
    });

    notification.success({ message: MSG_SUCCESS(MSG.LOGIN) });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.LOGIN),
      payload: {
        error: MSG.VALIDATE_LOGIN_INVALID,
      },
    });
  }
}

function* refreshSaga({ payload: { data } }) {
  try {
    let result = yield axios({
      method: 'post',
      url: `${SERVER_CLIENT_API_URL}/refresh`,
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    yield (result = camelCaseKeys(result.data, { deep: true }));
    yield (localStorage.userInfo = JSON.stringify({
      accessToken: result.accessToken,
      expires: result.expire,
    }));
    yield put({
      type: SUCCESS(USER_ACTION.REFRESH_TOKEN),
      payload: {
        data: result.user,
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.REFRESH_TOKEN),
      payload: {
        error: e.message,
      },
    });
  }
}

function* checkEmailExistsSaga({ payload: { data } }) {
  try {
    yield axios.post(`${SERVER_CLIENT_API_URL}/email-exist`, data);
    yield put({
      type: SUCCESS(USER_ACTION.CHECK_EMAIL_EXISTS),
    });
  } catch (error) {
    let payload = {
      status: error.response.status,
    };
    if (error.response.status === 403) {
      const { message } = error.response.data;
      payload = {
        ...payload,
        error: message,
      };
    }
    yield put({
      type: FAILURE(USER_ACTION.CHECK_EMAIL_EXISTS),
      payload,
    });
  }
}

function* registerSaga({ payload: { data } }) {
  try {
    yield axios.post(`${SERVER_CLIENT_API_URL}/register`, toSnakeCase(data));
    yield put({ type: SUCCESS(USER_ACTION.REGISTER) });
    notification.success({ message: MSG_SUCCESS(MSG.REGISTER) });
    history.push(PATH.LOGIN);
  } catch (e) {
    notification.error({ message: MSG_ERROR(MSG.REGISTER) });
    yield put({
      type: FAILURE(USER_ACTION.REGISTER),
    });
  }
}

function* getInfoSaga({ payload: { data } }) {
  try {
    const { data: responseData } = yield axios({
      method: 'get',
      url: `${SERVER_CLIENT_API_URL}/user-profile`,
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: camelCaseKeys(responseData, { deep: true }),
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.GET_USER_INFO),
      payload: {
        error: e.message,
      },
    });
  }
}

function* logoutSaga({ payload: { data } }) {
  yield axios({
    method: 'post',
    url: `${SERVER_CLIENT_API_URL}/logout`,
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  localStorage.removeItem('userInfo');
  history.push(PATH.LOGIN);
}


function* changeAvatarSaga({ payload: { accessToken, data } }) {
  try {
    const formData = new FormData();
    formData.set('image', data.image);
    const { data: responseData } = yield axios.post(`${SERVER_CLIENT_API_URL}/user-avatar`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put({
      type: SUCCESS(USER_ACTION.CHANGE_AVATAR),
      payload: {
        data: responseData,
      },
    });
    notification.success({ message: MSG_SUCCESS(MSG.UPDATE_AVATAR) });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.CHANGE_AVATAR),
      payload: {
        error: e.message,
      },
    });
    notification.error({ message: MSG_ERROR(MSG.UPDATE_AVATAR) });
  }
}

function* changeFullNameSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responseData } = yield axios.patch(
      `${SERVER_CLIENT_API_URL}/user-full-name`,
      toSnakeCase(data),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    yield put({
      type: SUCCESS(USER_ACTION.CHANGE_FULL_NAME),
      payload: {
        data: camelCaseKeys(responseData),
      },
    });
    notification.success({ message: MSG_SUCCESS(MSG.UPDATE_FULL_NAME) });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.CHANGE_FULL_NAME),
      payload: {
        error: e.message,
      },
    });
    notification.error({ message: MSG_ERROR(MSG.UPDATE_FULL_NAME) });
  }
}

function* changeEmailSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responseData } = yield axios.patch(
      `${SERVER_CLIENT_API_URL}/user-email`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    yield put({
      type: SUCCESS(USER_ACTION.CHANGE_EMAIL),
      payload: {
        data: camelCaseKeys(responseData),
      },
    });
    notification.success({ message: MSG_SUCCESS(MSG.UPDATE_EMAIL) });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.CHANGE_EMAIL),
      payload: {
        error: MSG.VALIDATE_EMAIL_EXIST,
      },
    });
    notification.error({ message: MSG_ERROR(MSG.UPDATE_EMAIL) });
  }
}

function* changeNumberPhoneSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responseData } = yield axios.patch(
      `${SERVER_CLIENT_API_URL}/user-phone`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    yield put({
      type: SUCCESS(USER_ACTION.CHANGE_NUMBER_PHONE),
      payload: {
        data: camelCaseKeys(responseData),
      },
    });
    notification.success({ message: MSG_SUCCESS(MSG.UPDATE_NUMBER_PHONE) });
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.CHANGE_NUMBER_PHONE),
      payload: {
        error: e.message,
      },
    });
    notification.error({ message: MSG_ERROR(MSG.UPDATE_NUMBER_PHONE) });
  }
}

function* changePasswordSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responseData } = yield axios.patch(
      `${SERVER_CLIENT_API_URL}/user-change-password`,
      toSnakeCase(data),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    yield put({
      type: SUCCESS(USER_ACTION.CHANGE_PASSWORD),
      payload: {
        data: camelCaseKeys(responseData),
      },
    });
    notification.success({ message: MSG_SUCCESS(MSG.CHANGE_PASSWORD) });
    history.push(PATH.SUP_PROFILE(PATH.PROFILE_INFO));
  } catch (e) {
    const data = camelCaseKeys(e.response.data);
    yield put({
      type: FAILURE(USER_ACTION.CHANGE_PASSWORD),
      payload: {
        error: { ...data },
      },
    });
    notification.error({ message: MSG_ERROR(MSG.CHANGE_PASSWORD) });
  }
}

function* updateUserSaga({ payload: { accessToken, data } }) {
  try {
    const { data: responseData } = yield axios.patch(
      `${SERVER_CLIENT_API_URL}/user`,
      toSnakeCase(data),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    yield put({
      type: SUCCESS(USER_ACTION.UPDATE_USER),
      payload: {
        data: camelCaseKeys(responseData),
      },
    });
    notification.success({ message: MSG_SUCCESS(MSG.UPDATE_USER) });
    history.push(PATH.SUP_PROFILE(PATH.PROFILE_INFO));
  } catch (e) {
    const data = camelCaseKeys(e.response.data);
    yield put({
      type: FAILURE(USER_ACTION.UPDATE_USER),
      payload: {
        error: { ...data },
      },
    });
    notification.error({ message: MSG_ERROR(MSG.UPDATE_USER) });
  }
}

export default function* adminSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REFRESH_TOKEN), refreshSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHECK_EMAIL_EXISTS), checkEmailExistsSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.LOGOUT), logoutSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_AVATAR), changeAvatarSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_FULL_NAME), changeFullNameSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_EMAIL), changeEmailSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_NUMBER_PHONE), changeNumberPhoneSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_PASSWORD), changePasswordSaga);
  yield takeEvery(REQUEST(USER_ACTION.UPDATE_USER), updateUserSaga);
}
