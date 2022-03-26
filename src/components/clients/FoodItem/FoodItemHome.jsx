import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, message, Skeleton } from 'antd';
import NumberFormat from 'react-number-format';

import PropTypes from 'prop-types';
import * as S from './style';

import foodLoading from '../../../assets/images/food_logo.png';
import { PATH, ROOT_PATH } from '../../../contants';
import { getFoodDetailAction, toggleLikeAction, updateCartAction } from '../../../redux/actions';
import handleStopPropagation from '../../../utils/common';

const MetaTitle = ({ name, store, slug }) => {
  return (
    <div>
      <S.FoodTitle>{name}</S.FoodTitle>
      <S.FoodStoreWrap to={PATH.STORE_DETAIL(slug)} onClick={(e) => handleStopPropagation(e)}>
        <S.StoreName>{store}</S.StoreName>
      </S.FoodStoreWrap>
    </div>
  );
};

const MetaDescription = ({ id, price, discount, userId }) => {
  const dispatch = useDispatch();
  const { likes: { data: likeData, load: loadLike } } = useSelector(({ foodReducer }) => foodReducer);
  return (
    <S.PriceBox>
      <p>
        <S.AfterPrice>
          <NumberFormat
            value={discount}
            displayType={'text'}
            thousandSeparator
            suffix={'đ'}
          />
        </S.AfterPrice>
      </p>
      <p style={{ paddingLeft: 10 }}>
        <S.Price>
          {price > discount &&
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator
            suffix={'đ'}
          />
          }
        </S.Price>
      </p>
      <S.LikeBtn
        onClick={
          (e) => {
            handleStopPropagation(e);
            const userToken = localStorage.userInfo;
            if (userToken && userId && !loadLike) {
              const { accessToken } = JSON.parse(userToken);
              dispatch(toggleLikeAction({
                accessToken,
                data: {
                  foodId: id,
                },
              }));
            } else {
              message.error('Bạn chưa đăng nhập!');
            }
          }
        }>
        {likeData.includes(id) ? <S.Like /> : <S.UnLike />}
      </S.LikeBtn>

    </S.PriceBox>
  );
};
export const FoodItemHome = (
  {
    id,
    foodImage,
    foodName,
    storeId,
    storeName,
    storeNotMark,
    price,
    discount,
    load,
    setShowDetail,
    setShowLogin,
  },
) => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const { userInfo: { data: userData } } = useSelector(({ userReducer }) => userReducer);
  return (
    <S.CardItem
      hoverable
      cover={
        <S.CardImage avatar={load ? foodLoading : `${ROOT_PATH}${foodImage}`} />
      }
      onClick={() => {
        if (!load) {
          dispatch(
            getFoodDetailAction({
              data: {
                id,
              },
            }),
          );
          setShowDetail(true);
        }
      }}
    >
      <Skeleton loading={load} active>
        <Meta
          title={
            <MetaTitle
              name={foodName}
              store={storeName}
              slug={`${storeNotMark}.${storeId}`}
            />
          }
          description={
            <MetaDescription
              id={id}
              price={price}
              discount={discount}
              userId={userData.id}
            />
          }
          avatar={
            <S.AddCard
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
                  setShowDetail(false);
                }
              }}
            >
              <ShoppingCartOutlined />
            </S.AddCard>
          }
        />
      </Skeleton>
    </S.CardItem>
  );
};

MetaTitle.propTypes = {
  name: PropTypes.string,
  store: PropTypes.string,
  slug: PropTypes.string,
};

MetaDescription.propTypes = {
  id: PropTypes.number,
  isLike: PropTypes.bool,
  price: PropTypes.number,
  discount: PropTypes.number,
  userId: PropTypes.number,
};

FoodItemHome.propTypes = {
  id: PropTypes.number,
  foodImage: PropTypes.string,
  foodName: PropTypes.string,
  storeId: PropTypes.number,
  storeName: PropTypes.string,
  storeNotMark: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  load: PropTypes.bool,
  setShowDetail: PropTypes.func,
  setShowLogin: PropTypes.func,
};
