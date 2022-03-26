import { Button, Col, Form, Input, Row, Space, Spin } from 'antd';
import * as S from '../style';
import history from '../../../../utils/history';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAction, resetErrorPasswordAction } from '../../../../redux/actions';
import { useEffect } from 'react';
import { PAGE_TITLE, PATH } from '../../../../contants';

const ChangePassword = () => {
  const userToken = localStorage.userInfo;
  const dispatch = useDispatch();
  const { responseAction: { update: { password } } } = useSelector(({ userReducer }) => userReducer);
  const [changePasswordForm] = Form.useForm();

  useEffect(() => {
    document.title = PAGE_TITLE.CHANGE_PASSWORD;
    dispatch(resetErrorPasswordAction());
  }, []);

  useEffect(() => {
    if (password.error) {
      const errors = { ...password.error };
      const fieldError = [];
      for (const field in errors) {
        fieldError.push({ name: field, errors: [errors[field][0]] });
      }
      changePasswordForm.setFields(fieldError);
    }
  }, [password]);

  return (
    <div style={{ paddingBottom: 15 }}>
      <Row gutter={20}>
        <Col span={8} />
        <Col span={16}>
          <h3 style={{
            padding: '24px 0',
            fontSize: 24,
            margin: 0,
          }}>
            Đổi mật khẩu
          </h3>
        </Col>
      </Row>
      <S.UserProfile>
        <Form
          form={changePasswordForm}
          name='change-password'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          autoComplete='off'
          onFinish={(value) => {
            const { accessToken } = JSON.parse(userToken);
            dispatch(changePasswordAction({
              accessToken,
              data: value,
            }));
          }}
        >
          <Form.Item
            label='Mật khẩu cũ:'
            name='oldPassword'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu cũ!' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
            ]}
          >
            <Input.Password placeholder='Nhập mật khẩu cũ' />
          </Form.Item>
          <Form.Item
            label='Mật khẩu mới:'
            name='password'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.length < 6 || getFieldValue('oldPassword') !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu mới phải khác mật khẩu cũ!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder='Nhập mật khẩu mới' />
          </Form.Item>
          <Form.Item
            label='Nhập lại mật khẩu:'
            name='confirmPassword'
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
            <Input.Password placeholder='Nhập lại mật khẩu' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                disabled={password.load}
                style={{
                  background: '#3380d8',
                  color: 'white',
                }}
                htmlType='submit'
              >
                Đổi mật khẩu
              </Button>
              <Button onClick={() => history.push(PATH.SUP_PROFILE(PATH.PROFILE_INFO))}>Hủy</Button>
              {password.load && <Spin />}
            </Space>
          </Form.Item>
        </Form>
      </S.UserProfile>;
    </div>
  );
};
export default ChangePassword;
