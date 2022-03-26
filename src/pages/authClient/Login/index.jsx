import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import * as AuthStyle from '../style';

import { TITLE, PATH } from '../../../contants';

import { loginAction } from '../../../redux/actions';
import { Form, Input } from 'antd';

function LoginPage() {
  document.title = TITLE(PATH.LOGIN);
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const {
    responseAction: {
      login: {
        error: responseError,
        load: LoginLoad,
      },
    },
  } = useSelector(({ userReducer }) => userReducer);


  const [fieldFocus, setFieldFocus] = useState({
    email: false,
    password: false,
  });
  useEffect(() => {
    if (responseError) {
      loginForm.setFields([
        { name: 'email', errors: [' '] },
        { name: 'password', errors: [responseError] },
      ]);
    }
  }, [responseError]);

  const handleFocus = (e) => {
    setFieldFocus({
      ...fieldFocus,
      [e.target.id]: true,
    });
  };
  const handleBlur = (e) => {
    if (!e.target.value) {
      setFieldFocus({
        ...fieldFocus,
        [e.target.id]: false,
      });
    }
  };
  const handleSubmit = (value) => {
    dispatch(loginAction({ data: { ...value } }));
  };
  return (
    <Form
      layout='vertical'
      style={{ width: 360 }}
      form={loginForm}
      onFinish={handleSubmit}
    >
      <AuthStyle.FormTitle>Đăng Nhập</AuthStyle.FormTitle>
      <AuthStyle.FormGroup
        name='email'
        label='Email'
        focus={fieldFocus.email}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
        <Input prefix={<MailOutlined />} />
      </AuthStyle.FormGroup>
      <AuthStyle.FormGroup
        name='password'
        focus={fieldFocus.password}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label='Mật khẩu'
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          { min: 6, message: 'Mật khẩu tối thiệu 6 ký tự!' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </AuthStyle.FormGroup>
      <AuthStyle.BtnSubmit htmlType='submit' disabled={LoginLoad}>
        Đăng nhập
        <AuthStyle.SubmitLoading size='middle' show={LoginLoad} />
      </AuthStyle.BtnSubmit>
      <div
        style={{
          fontSize: '15px',
        }}
      >
        <p>
          Chưa có tài khoản?
          <Link to={'/register'}> Đăng ký</Link>
        </p>
        <Link to={'/forgot'}>Quên mật khẩu</Link>
      </div>
    </Form>
  );
}

export default LoginPage;
