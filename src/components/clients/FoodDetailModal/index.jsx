import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { ROOT_PATH } from '../../../contants';

import { updateCartAction } from '../../../redux/actions';

import * as S from './style';

const FoodDetailModal = function({ show, setShow, setShowLogin }) {
  const dispatch = useDispatch();
  const {
    foodDetail: {
      data: {
        discount,
        foodConsume,
        foodDescription,
        foodImage,
        foodName,
        id: foodId,
      },
    },
  } = useSelector(({ foodReducer }) => foodReducer);
  const { userInfo: { data: userData } } = useSelector(({ userReducer }) => userReducer);

  return (
    <S.ModalCustom
      footer={
        <button
          onClick={() => {
            if (!userData.id) {
              setShow(false);
              setShowLogin(true);
            } else {
              const userToken = localStorage.userInfo;
              dispatch(updateCartAction({
                data: {
                  accessToken: JSON.parse(userToken).accessToken,
                  food: foodId,
                  isDisplayMessage: true,
                },
              }));
              setShow(false);
            }
          }}
        >
          <span>+&nbsp;</span>Thêm vào giỏ
        </button>
      }
      visible={show}
      onCancel={() => {
        setShow(false);
      }}
    >
      <S.FoodItem>
        <div>
          <img src={`${ROOT_PATH}${foodImage}`} alt={foodName} />
          <div className='info'>
            <Row>
              <Col lg={20} md={20} sm={20} xs={18}>
                <div className='img-box-food-name'>{foodName}</div>
                <div className='img-box-desc'>{foodDescription}</div>
                <div className='img-box-total'>
                  Đã được đặt
                  <span className='txt-bold'>
                    &nbsp;{foodConsume}&nbsp;
                  </span>
                  lần
                </div>
              </Col>
              <Col lg={4} md={4} sm={4} xs={6} style={{ alignSelf: 'center' }}>
                <div className='img-box-current-price'>
                  <NumberFormat
                    value={discount}
                    displayType={'text'}
                    thousandSeparator
                    suffix={'đ'}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </S.FoodItem>
    </S.ModalCustom>
  );
};
export default FoodDetailModal;

FoodDetailModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setShowLogin: PropTypes.func,
};
