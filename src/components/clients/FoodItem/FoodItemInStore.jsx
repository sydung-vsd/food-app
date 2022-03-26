import { useDispatch, useSelector } from 'react-redux';
import { BsImage, HiShoppingCart } from 'react-icons/all';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { ROOT_PATH } from '../../../contants';
import handleStopPropagation from '../../../utils/common';
import { updateCartAction } from '../../../redux/actions';

import * as S from './style';

export const FoodStore = (
  {
    id,
    foodImage,
    foodName,
    foodDescription,
    foodConsume,
    price,
    discount,
    loading,
    handleClick,
    setIndex,
    index,
    setShowLogin,
    setFoodId,
  },
) => {
  const dispatch = useDispatch();
  const { userInfo: { data: userData } } = useSelector(({ userReducer }) => userReducer);
  return (
    <S.FoodStore
      onClick={() => {
        handleClick(true);
        setIndex(index);
        setFoodId(id);
      }}
    >
      <S.FoodStoreAvatar>
        {loading ? <BsImage /> : <img src={`${ROOT_PATH}${foodImage}`} alt={foodName} />}
      </S.FoodStoreAvatar>
      <S.FoodStoreItemRight>
        <S.SkeletonCustom loading={loading} active>
          <S.FoodStoreTitle>{foodName}</S.FoodStoreTitle>
          <S.FoodStoreDescription>{foodDescription}</S.FoodStoreDescription>
          <p>
            <S.TotalOrder>Lượt đặt: {foodConsume}</S.TotalOrder>
          </p>
          <S.FoodStorePrice>
            <div className='price-discount'>
              {price > discount &&
              <NumberFormat
                value={price}
                displayType={'text'}
                thousandSeparator
                suffix={'đ'}
              />
              }
            </div>
            <span className='price'>
              <NumberFormat
                value={discount}
                displayType={'text'}
                thousandSeparator
                suffix={'đ'}
              />
            </span>
            <span
              className='btn-adding'
              onClick={(e) => {
                handleStopPropagation(e);
                if (!userData.id) {
                  setShowLogin(true);
                } else {
                  const userToken = localStorage.userInfo;
                  dispatch(updateCartAction({
                    data: {
                      accessToken: JSON.parse(userToken).accessToken,
                      food: id,
                      isDisplayMessage: true,
                    },
                  }));
                }
              }}
            >
              <HiShoppingCart />
            </span>
          </S.FoodStorePrice>
        </S.SkeletonCustom>
      </S.FoodStoreItemRight>
    </S.FoodStore>
  );
};

FoodStore.propTypes = {
  id: PropTypes.number,
  foodImage: PropTypes.string,
  foodName: PropTypes.string,
  foodDescription: PropTypes.string,
  foodConsume: PropTypes.number,
  price: PropTypes.number,
  discount: PropTypes.number,
  loading: PropTypes.bool,
  handleClick: PropTypes.func,
  setIndex: PropTypes.func,
  index: PropTypes.number,
  setShowLogin: PropTypes.func,
  setFoodId: PropTypes.func,
};
