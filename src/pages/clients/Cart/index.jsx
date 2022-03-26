import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { FcPrevious, HiMinus, HiPlusSm, MdRemoveShoppingCart } from 'react-icons/all';
import { Affix, Col, Form, Input, Row, Select, Spin } from 'antd';
import NumberFormat from 'react-number-format';


import * as S from './style';
import * as ClientStyle from '../styles';

import {
  createOrderAction,
  destroyCartsAction,
  getAddressAction,
  getCartsAction,
  getDistrictsAction, getWardsAction,
  updateCartAction,
} from '../../../redux/actions';

import history from '../../../utils/history';
import { ROOT_PATH, TITLE, PATH } from '../../../contants';
import { shortAddress } from '../../../utils/address';

const CartPage = () => {
  const { Option } = Select;
  const [orderForm] = Form.useForm();
  const dispatch = useDispatch();

  const {
    cartList: { data: cartList, load: loadCarts },
    total,
    totalMoney,
  } = useSelector(({ cartReducer }) => cartReducer);
  const {
    userInfo: {
      data: { address: userAddress, districtCode, firstName, id: userId, lastName, phone, provinceCode, wardCode },
      error: userError,
      load: userLoad,
    },
  } = useSelector(({ userReducer }) => userReducer);
  const {
    provinces: { data: provinceList },
    districts: { data: districtList, load: districtLoad },
    wards: { data: wardList },
  } = useSelector(({ addressReducer }) => addressReducer);
  document.title = TITLE(PATH.CART, userId && `${firstName} ${lastName}`);
  const [redirect, setRedirect] = useState(false);
  const userToken = localStorage.userInfo;

  useEffect(() => {
    if (!userToken || userError) {
      setRedirect(true);
    }
    if (userId) {

      orderForm.setFieldsValue({
        fullName: `${firstName} ${lastName}`,
        phone: phone,
        address: {
          province: provinceCode,
          district: districtCode,
          ward: wardCode,
          street: (userAddress?.split('-').length === 4 ? userAddress?.split('-')[0].trim() : null),
        },
      });
      dispatch(
        getCartsAction({
          data: {
            accessToken: JSON.parse(userToken).accessToken,
          },
        }),
      );
      dispatch(getAddressAction({
        provinceCode,
        districtCode,
      }));
    }
  }, [userId]);

  const handleOrder = (value) => {
    dispatch(createOrderAction({
      accessToken: JSON.parse(userToken).accessToken,
      data: {
        ...value,
        address: shortAddress(value.address, provinceList, districtList, wardList),
      },
    }));
  };

  const renderAddressInfo = (typeList) => {
    return typeList.map((typeListItem) => {
      return (
        <Option key={typeListItem.code} value={typeListItem.code}>{typeListItem.name}</Option>
      );
    });
  };
  const renderCart = () => {
    return cartList.map(({
      discount,
      foodImage,
      foodName,
      id: cartId,
      load,
      pivot: { quantity },
      price,
      storeId,
      storeName,
      storeNotMark,
    }) => {
      return (
        <li key={cartId} style={{ position: 'relative' }}>
          {
            load &&
            <div className='p-absolute' style={{ top: '50%', left: '50%' }}>
              <Spin />
            </div>
          }
          <div className='img'>
            <Link to={`/stores/${storeNotMark}.${storeId}`} style={{}}>
              <img src={`${ROOT_PATH}${foodImage}`} alt='' />
            </Link>
            <button onClick={() => {
              dispatch(destroyCartsAction({
                data: {
                  accessToken: JSON.parse(userToken).accessToken,
                  food: cartId,
                },
              }));
            }}>
              <span /> Xóa
            </button>
          </div>
          <S.CartInfo>
            <div className='food-info'>
              <div className='food-name'>
                <Link to={`/stores/${storeNotMark}.${storeId}`}>{foodName}</Link>
              </div>
              <div className='store-name'>
                <Link to={`/stores/${storeNotMark}.${storeId}`}>
                  {storeName}
                </Link>
              </div>
            </div>
            <div className='price-info'>
              <div className='choose-quantity'>
                <div
                  className='minus'
                  style={
                    quantity === 1 || load ? { pointerEvents: 'none' } : {}
                  }
                  onClick={() => {
                    if (quantity > 1 && !load) {
                      dispatch(updateCartAction({
                        data: {
                          accessToken: JSON.parse(userToken).accessToken,
                          food: cartId,
                          action: -1,
                        },
                      }));
                    }
                  }}
                >
                  <HiMinus />
                </div>
                <div className='quantity'>{quantity}</div>
                <div
                  className='plus'
                  style={
                    load ? { pointerEvents: 'none' } : {}
                  }
                  onClick={() => {
                    if (!load) {
                      dispatch(updateCartAction({
                        data: {
                          accessToken: JSON.parse(userToken).accessToken,
                          food: cartId,
                        },
                      }));
                    }
                  }}
                >
                  <HiPlusSm />
                </div>
                <input type='hidden' />
              </div>
              <span>
                <strike>
                  <NumberFormat
                    value={
                      discount < price &&
                      price * quantity
                    }
                    displayType={'text'}
                    thousandSeparator
                    suffix={'đ'}
                  />
                </strike>
                <NumberFormat
                  value={discount * quantity}
                  displayType={'text'}
                  thousandSeparator
                  suffix={'đ'}
                />
              </span>
            </div>
          </S.CartInfo>
        </li>
      );
    });
  };
  if (redirect) {
    return <Redirect to='/' />;
  } else {
    if (userLoad) {
      return (
        <Spin
          size={'large'}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    } else {
      return (
        <ClientStyle.Section>
          <ClientStyle.Container>
            <S.CartWrap>
              {
                loadCarts ?
                  <div
                    className='d-flex horizontal-center vertical-center'
                    style={{
                      minHeight: '500px',
                      alignItems: 'center',
                    }}
                  >
                    <Spin />
                  </div>
                  :
                  <div>
                    {total === 0 ?
                      (
                        <S.CartEmpty>
                          <div>
                            <MdRemoveShoppingCart />
                          </div>
                          <div>Không có sản phẩm nào trong giỏ hàng</div>
                          <button onClick={() => history.push(PATH.FOOD)}>Tiếp tục mua sắm</button>
                        </S.CartEmpty>
                      )
                      :
                      <Row gutter={16}>
                        <Col lg={15} md={24} sm={24} xs={24}>
                          <S.CartHeader>
                            <Link to={PATH.STORE}><FcPrevious />Tiếp tục mua sắm</Link>
                            <h4>Giỏ hàng của bạn</h4>
                          </S.CartHeader>
                        </Col>
                        <Col lg={9} md={0} sm={0} xs={0} />
                        <Col lg={15} md={24} sm={24} xs={24}>
                          <S.CartContent>
                            <S.CartList>{renderCart()}</S.CartList>
                            <S.TotalProvisional>
                              <span>Tạm tính ({total} sản phẩm):</span>
                              <span>
                                <NumberFormat
                                  value={totalMoney}
                                  displayType={'text'}
                                  thousandSeparator
                                  suffix={'đ'}
                                />
                              </span>
                            </S.TotalProvisional>
                            <S.DeleteAllBtn
                              onClick={() => {
                                dispatch(destroyCartsAction({
                                  data: {
                                    accessToken: JSON.parse(userToken).accessToken,
                                  },
                                }));
                              }}
                            >
                              Xóa tất cả
                            </S.DeleteAllBtn>
                          </S.CartContent>
                        </Col>
                        <Col lg={9} md={24} sm={24} xs={24}>
                          <Affix offsetTop={100} className='form-order'>
                            <S.CartOrder>
                              <h4>Thông tin khách hàng</h4>
                              <Form
                                form={orderForm}
                                layout='vertical'
                                onFinish={handleOrder}
                              >
                                <Form.Item
                                  name='fullName'
                                  rules={[{ required: true, message: 'Vui lòng nhập họ tên người nhận' }]}
                                >
                                  <Input placeholder='Họ và tên' />
                                </Form.Item>
                                <Form.Item
                                  name='phone'
                                  rules={[
                                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                                    {
                                      pattern: new RegExp('^(0|\\+84)[3|5|7|8|9][\\d+]{8}$'),
                                      message: 'Định dạng không hợp lệ (0... / +84...)',
                                    },
                                  ]}
                                >
                                  <Input placeholder='Số diện thoại' />
                                </Form.Item>

                                <Form.Item
                                  name='address'
                                  style={{ marginBottom: 0 }}
                                >
                                  <Input.Group>
                                    <Row gutter={3}>
                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'province']}
                                          rules={[{ required: true, message: 'Chọn Tỉnh / Thành phố!' }]}
                                        >
                                          <Select
                                            placeholder='--Tỉnh--'
                                            style={{ width: '100%' }}
                                            onChange={(value) => {
                                              dispatch(getDistrictsAction({
                                                provinceCode: value,
                                              }));
                                              orderForm.setFieldsValue({
                                                address: {
                                                  district: null,
                                                  ward: null,
                                                },
                                              });
                                            }}
                                          >
                                            {renderAddressInfo(provinceList)}
                                          </Select>
                                        </Form.Item>
                                      </Col>

                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'district']}
                                          rules={[{ required: true, message: 'Chọn Quận / Huyện!' }]}
                                        >
                                          <Select
                                            placeholder='--Quận/Huyện--'
                                            style={{ width: '100%' }}
                                            disabled={districtLoad}
                                            onChange={(value) => {
                                              dispatch(getWardsAction({
                                                districtCode: value,
                                              }));
                                              orderForm.setFieldsValue({
                                                address: {
                                                  ward: null,
                                                },
                                              });
                                            }}
                                          >
                                            {renderAddressInfo(districtList)}
                                          </Select>
                                        </Form.Item>
                                      </Col>
                                    </Row>

                                    <Row gutter={3}>
                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'ward']}
                                          rules={[{ required: true, message: 'Chọn Xã / Phường!' }]}
                                        >
                                          <Select
                                            placeholder='--Phường/Xã--'
                                            style={{ width: '100%' }}
                                            disabled={wardList.length === 0}
                                          >
                                            {renderAddressInfo(wardList)}
                                          </Select>
                                        </Form.Item>
                                      </Col>

                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'street']}
                                          rules={[{ required: true, message: 'Chọn Đường / Thôn!' }]}
                                        >
                                          <Input placeholder='Đường / Thôn xóm' />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </Input.Group>
                                </Form.Item>

                                <Form.Item name='note'>
                                  <Input placeholder='Yêu cầu khác' />
                                </Form.Item>

                                <S.OrderTotal>
                                  <span>Tổng <b>{total}</b> sản phẩm:</span>
                                  <span>
                                    <NumberFormat
                                      value={totalMoney}
                                      displayType={'text'}
                                      thousandSeparator
                                      suffix={'đ'}
                                    />
                                  </span>
                                </S.OrderTotal>
                                <Form.Item
                                  style={{
                                    textAlign: 'center',
                                    paddingTop: 20,
                                    marginBottom: 10,
                                  }}
                                >
                                  <S.OrderButton htmlType='submit' disabled={total === 0}>
                                    Đặt hàng
                                  </S.OrderButton>
                                </Form.Item>
                              </Form>
                            </S.CartOrder>
                          </Affix>
                        </Col>
                      </Row>
                    }
                  </div>
              }
            </S.CartWrap>
          </ClientStyle.Container>
        </ClientStyle.Section>
      );
    }
  }
};
export default CartPage;
