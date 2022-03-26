import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Form, Input, Select, Spin } from 'antd';

import {
  LockOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import * as AuthStyle from '../style';
import * as RegisterStyle from './style';
import { TITLE, PATH } from '../../../contants';
import { checkEmailExistsAction, resetCheckEmailAction, registerAction } from '../../../redux/actions';


function RegisterPage() {
  document.title = TITLE(PATH.REGISTER);
  const [registerForm] = Form.useForm();
  const [dataRequest, setDataRequest] = useState(null);

  const dispatch = useDispatch();
  const {
    register: { load: loadRegister },
    checkEmail: { error: checkEmailError, load: checkEmailLoad, success: checkEmailSuccess },
  } = useSelector(({ userReducer }) => userReducer.responseAction);

  const [fieldFocus, setFieldFocus] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    phone: false,
    confirmPassword: false,
  });

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
    } else {
      if (e.target.id === 'email') {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(e.target.value)) {
          dispatch(checkEmailExistsAction({
            data: { email: e.target.value },
          }));
        }
      }
    }
  };
  const handleSubmit = (value) => {
    setDataRequest({ ...value });
  };
  useEffect(() => {
    dispatch(resetCheckEmailAction());
  }, []);

  useEffect(() => {
    if (checkEmailSuccess && dataRequest) {
      dispatch(registerAction({ data: { ...dataRequest } }));
    }
  }, [dataRequest, checkEmailSuccess]);

  useEffect(() => {
    if (checkEmailError) {
      registerForm.setFields([{
        name: 'email',
        errors: [checkEmailError],
      }]);
    } else {
      registerForm.setFields([{
        name: 'email',
        errors: null,
      }]);
    }
  }, [checkEmailError]);

  return (
    <Form
      layout='vertical'
      form={registerForm}
      style={{ width: 450 }}
      onFinish={handleSubmit}
    >
      <AuthStyle.FormTitle>Đăng Ký</AuthStyle.FormTitle>
      <Form.Item noStyle>
        <AuthStyle.FormGroup
          name='firstName'
          label='Họ'
          focus={fieldFocus.firstName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rules={[
            { required: true, message: 'Nhập họ!' },
          ]}
          style={{
            display: 'inline-block',
            width: '49.5%',
          }}
        >
          <Input prefix={<UserOutlined />} />
        </AuthStyle.FormGroup>
        <AuthStyle.FormGroup
          name='lastName'
          label='Tên'
          focus={fieldFocus.lastName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rules={[
            { required: true, message: 'Nhập tên!' },
          ]}
          style={{
            display: 'inline-block',
            width: '49.5%',
            marginLeft: '1%',
          }}
        >
          <Input prefix={' '} />
        </AuthStyle.FormGroup>
      </Form.Item>
      <Form.Item noStyle>
        <AuthStyle.FormGroup
          name='phone'
          label='Số điện thoại'
          focus={fieldFocus.phone}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            {
              pattern: new RegExp('^(0|\\+84)[3|5|7|8|9][\\d+]{8}$'),
              message: 'Định dạng không hợp lệ (0... / +84...)',
            },
          ]}
          style={{
            display: 'inline-block',
            width: '65%',
          }}
        >
          <Input prefix={<PhoneOutlined />} />
        </AuthStyle.FormGroup>
        <AuthStyle.Gender>
          <AuthStyle.FormGroup
            label='Giới tính'
            name='gender'
            focus={fieldFocus.gender}
            rules={[
              { required: true, message: 'Chọn giới tính!' },
            ]}
            className='select-gender'
          >
            <Select
              onChange={() => {
                setFieldFocus({ ...fieldFocus, gender: true });
              }}
            >
              <Select.Option value={1}>Nam</Select.Option>
              <Select.Option value={0}>Nữ</Select.Option>
            </Select>
          </AuthStyle.FormGroup>
          <ManOutlined className='prefix-icon' />
        </AuthStyle.Gender>
      </Form.Item>
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
        <Input
          prefix={<MailOutlined />}
          suffix={checkEmailLoad ? <Spin /> : (checkEmailSuccess && <RegisterStyle.EmailSuccess />)}
        />
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
      <AuthStyle.FormGroup
        name='confirmPassword'
        focus={fieldFocus.confirmPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label='Nhập lại mật khẩu'
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
          { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value.length < 6 || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Nhập lại mật khẩu không khớp!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </AuthStyle.FormGroup>
      <AuthStyle.Agree
        name='agree'
        valuePropName='checked'
        style={{ textAlign: 'left' }}
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error(' ')),
          },
        ]}
      >
        <Checkbox>Đồng ý với điều khoản của chúng tôi</Checkbox>
      </AuthStyle.Agree>
      <AuthStyle.BtnSubmit
        htmlType='submit'
        style={{ marginTop: '2rem' }}
        disabled={loadRegister}
      >
        Đăng ký
        <AuthStyle.SubmitLoading size='middle' show={loadRegister} />
      </AuthStyle.BtnSubmit>
      <div
        style={{
          fontSize: '15px',
        }}
      >
        <p>
          Đã có tài khoản
          <Link to={'/login'}> Đăng nhập</Link>
        </p>
      </div>
    </Form>
  );
}

export default RegisterPage;
