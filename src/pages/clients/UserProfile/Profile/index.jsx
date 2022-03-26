import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

import * as S from '../style';

import history from '../../../../utils/history';
import { changeFullNameAction, changeNumberPhoneAction, changeEmailAction } from '../../../../redux/actions';
import { PAGE_TITLE } from '../../../../contants';
import PropTypes from 'prop-types';

const Profile = ({ changeAvatar }) => {
  const userToken = localStorage.userInfo;
  const dispatch = useDispatch();
  const {
    userInfo,
    responseAction: { update: { email, phone, fullName } },
  } = useSelector(({ userReducer }) => userReducer);
  const [emailForm] = Form.useForm();
  const [updateInfo, setUpdateInfo] = useState({
    fullName: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    document.title = PAGE_TITLE.USER_INFO;
    if (
      email.success ||
      phone.success ||
      fullName.success
    ) {
      let updateInfoState = { ...updateInfo };
      if (phone.success) {
        updateInfoState = {
          ...updateInfoState,
          phone: false,
        };
      }
      if (email.success) {
        updateInfoState = {
          ...updateInfoState,
          email: false,
        };
      }
      if (fullName.success) {
        updateInfoState = {
          ...updateInfoState,
          fullName: false,
        };
      }
      setUpdateInfo(updateInfoState);
    }
  }, [email, phone, fullName]);

  useEffect(() => {
    if (email.error) {
      emailForm.setFields([
        {
          name: 'email',
          errors: [email.error],
        },
      ]);
    }
  }, [email]);

  return (
    <div style={{ paddingBottom: 15 }}>
      <Row gutter={20}>
        <Col lg={6} md={6} sm={6} xs={6} />
        <Col lg={18} md={18} sm={18} xs={18}>
          <h3 style={{
            padding: '24px 0',
            fontSize: 24,
            margin: 0,
          }}>
            Thông tin tài khoản
          </h3>
        </Col>
      </Row>
      <S.UserProfile>
        <Row gutter={20}>
          <Col lg={6} md={6} sm={6} xs={8}>
            <div className='user-profile-title'><span>Họ và tên:</span></div>
            <div className='user-profile-title'><span>Email:</span></div>
            <div className='user-profile-title'><span>Số điện thoại:</span></div>
            <div className='user-profile-title'><span>Địa chỉ:</span></div>
            <div className='user-profile-title'><span>Giới tính:</span></div>
            <div className='user-profile-title'><span>Ngày sinh:</span></div>
            <div className='user-profile-title'><span>Mô tả bản thân:</span></div>
          </Col>
          <Col lg={18} md={18} sm={18} xs={16}>
            <div className='user-content'>
              {
                updateInfo.fullName ?
                  <Form
                    className='only-field'
                    name='edit-full-name'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      firstName: userInfo.data.firstName,
                      lastName: userInfo.data.lastName,
                    }}
                    onFinish={(value) => {
                      if (value.firstName !== userInfo.data.firstName || value.lastName !== userInfo.data.lastName) {
                        const { accessToken } = JSON.parse(userToken);
                        dispatch(changeFullNameAction({
                          accessToken,
                          data: value,
                        }));
                      } else {
                        setUpdateInfo({
                          ...updateInfo,
                          fullName: false,
                        });
                      }
                    }}
                  >
                    <Form.Item
                      name='firstName'
                      style={{ width: 100 }}
                      rules={[{ required: true, message: 'Nhập họ' }]}
                    >
                      <Input placeholder='Họ' />
                    </Form.Item>
                    <Form.Item
                      name='lastName'
                      style={{ width: 100 }}
                      rules={[{ required: true, message: 'Nhập tên' }]}
                    >
                      <Input
                        placeholder='Tên'
                      />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      <Space>
                        <Button
                          disabled={fullName.load}
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setUpdateInfo({
                          ...updateInfo,
                          fullName: false,
                        })}>Hủy</Button>
                        {fullName.load && <Spin />}
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.firstName} {userInfo.data.lastName}
                    <span className='edit' onClick={() => setUpdateInfo({
                      ...updateInfo,
                      fullName: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </div>
            <div className='user-content'>
              {
                updateInfo.email ?
                  <Form
                    className='only-field'
                    form={emailForm}
                    name='edit-email'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      email: userInfo.data.email,
                    }}
                    onFinish={(value) => {
                      if (value.email !== userInfo.data.email) {
                        const { accessToken } = JSON.parse(userToken);
                        dispatch(changeEmailAction({
                          accessToken,
                          data: value,
                        }));
                      } else {
                        setUpdateInfo({
                          ...updateInfo,
                          email: false,
                        });
                      }
                    }}
                  >
                    <Form.Item
                      name='email'
                      style={{ width: 218 }}
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
                    <Form.Item shouldUpdate>
                      <Space>
                        <Button
                          disabled={email.load}
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setUpdateInfo({
                          ...updateInfo,
                          email: false,
                        })}>Hủy</Button>
                        {email.load && <Spin />}
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.email}
                    <span className='edit' onClick={() => setUpdateInfo({
                      ...updateInfo,
                      email: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </div>
            <div className='user-content'>
              {
                updateInfo.phone ?
                  <Form
                    className='only-field'
                    name='edit-phone'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      phone: userInfo.data.phone,
                    }}
                    onFinish={(value) => {
                      if (value.phone !== userInfo.data.phone) {
                        const { accessToken } = JSON.parse(userToken);
                        dispatch(changeNumberPhoneAction({
                          accessToken,
                          data: value,
                        }));
                      } else {
                        setUpdateInfo({
                          ...updateInfo,
                          phone: false,
                        });
                      }
                    }}
                  >
                    <Form.Item
                      name='phone'
                      style={{ width: 218 }}
                      rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        {
                          pattern: new RegExp('^(0|\\+84)[3|5|7|8|9][\\d+]{8}$'),
                          message: 'Định dạng không hợp lệ (0... / +84...)',
                        },
                      ]}
                    >
                      <Input placeholder='Số điện thoại' />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      <Space>
                        <Button
                          disabled={phone.load}
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setUpdateInfo({
                          ...updateInfo,
                          phone: false,
                        })}>Hủy</Button>
                        {phone.load && <Spin />}
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.phone}
                    <span className='edit' onClick={() => setUpdateInfo({
                      ...updateInfo,
                      phone: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </div>
            <div className='user-content'>
              <span className={!userInfo.data.address ? 'empty' : undefined}>
                {userInfo.data.address ? userInfo.data.address : 'Chưa rõ'}
              </span>
            </div>
            <div className='user-content'>
              <span>
                {userInfo.data.gender === 1 ? 'Nam' : 'Nữ'}
              </span>
            </div>
            <div className='user-content'>
              <span className={!userInfo.data.birthday ? 'empty' : undefined}>
                {userInfo.data.birthday ? userInfo.data.birthday : 'Chưa rõ'}
              </span>
            </div>
            <div className='user-content'>
              <span className={!userInfo.data.description ? 'empty' : undefined}>
                {userInfo.data.description ? userInfo.data.description : 'Chưa có mô tả'}
              </span>
            </div>
          </Col>
        </Row>
        <S.ControlWrap>
          <Space>
            <Button
              style={{
                background: '#3380d8',
                color: 'white',
              }}
              onClick={() => history.push('/profile/user-info/edit')}
            >
              Cập nhập tài khoản
            </Button>
            <Button onClick={() => history.push('/profile/user-password')}>Đổi mật khẩu</Button>
          </Space>
          <S.BtnUploadAvatar htmlFor='avatar_input'>
            <input
              type='file'
              id='avatar_input'
              hidden
              accept='image/*'
              onChange={changeAvatar}
            />
            Đổi ảnh đại diện
          </S.BtnUploadAvatar>
        </S.ControlWrap>
      </S.UserProfile>;
    </div>
  );
};
export default Profile;

Profile.propTypes = {
  changeAvatar: PropTypes.func,
};
