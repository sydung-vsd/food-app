import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

import { loginAction } from '../../../redux/actions';

import * as S from './style';
import { MSG } from '../../../contants/message.contant';
import { PATH } from '../../../contants';

const ModalLogin = ({ visible, setVisible }) => {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    responseAction: {
      login: {
        error: errorLogin,
        load: loadLogin,
      },
    },
  } = useSelector(({ userReducer }) => userReducer);
  const { userInfo: { data: userData } } = useSelector(({ userReducer }) => userReducer);
  useEffect(() => {
    if (userData.id) {
      setVisible(false);
    }
    if (errorLogin) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' '],
        },
        {
          name: 'password',
          errors: [MSG.VALIDATE_LOGIN_INVALID],
        },
      ]);
    }
  }, [userData, errorLogin]);
  const handleLogin = (value) => {
    dispatch(
      loginAction({
        data: value,
      }),
    );
  };
  return (
    <S.ModalLoginCustom
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={false}
    >
      <div>
        <h2>FoodBooking</h2>
        <h5>Đăng nhập để mua sắm</h5>
        <S.FormCustom form={loginForm} layout='vertical' onFinish={handleLogin}>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              {
                pattern: new RegExp(
                  '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
                ),
                message: 'Định dạng email không đúng!',
              },
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 kí tự!' },
            ]}
          >
            <Input.Password placeholder='Mật khẩu' />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              disabled={loadLogin}
            >
              Đăng nhập
              <S.SubmitLoading size='middle' show={loadLogin} />
            </Button>
          </Form.Item>
        </S.FormCustom>
        <Link to={PATH.FORGOT}>Quên mật khẩu?</Link>
        <p>
          Chưa có tài khoản? <Link to={PATH.REGISTER}>Đăng ký</Link>
        </p>
      </div>
    </S.ModalLoginCustom>
  );
};
export default ModalLogin;

ModalLogin.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};
