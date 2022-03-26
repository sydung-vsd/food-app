import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { adminLoginAction } from '../../redux/actions';

import * as Style from './styles';

function AdminLoginPage() {
  const dispatch = useDispatch();
  const { responseAction: { login: loginRespons } } = useSelector(({ adminReducer }) => adminReducer);
  document.title = 'Foodbooking | Đăng nhập';

  const onLogin = (value) => {
    dispatch(
      adminLoginAction({
        data: value,
      })
    );
  };
  const [loginForm] = Form.useForm();

  useEffect(() => {
    if (loginRespons.error) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' '],
        },
        {
          name: 'password',
          errors: [loginRespons.error],
        },
      ]);
    }
  }, [loginRespons]);

  return (
    <Style.LoginWrap>
      <Style.FormWrap>
        <Style.H3>FOODBOOKING || Quản lý Cửa Hàng</Style.H3>
        <Form onFinish={onLogin} form={loginForm}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
              {
                pattern: new RegExp(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
                message: 'Định dạng email không đúng!',
              },
            ]}
          >
            <Input
              placeholder="Tài khoản"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Style.ButtonSubmit
              htmlType="submit"
              loading={loginRespons.load}
            >
              {!loginRespons.load && 'Đăng nhập'}
            </Style.ButtonSubmit>
          </Form.Item>
        </Form>
        <p>
          <Link to="/forgot">Quên mật khẩu?</Link>
        </p>
      </Style.FormWrap>
    </Style.LoginWrap>
  );
}

export default AdminLoginPage;
