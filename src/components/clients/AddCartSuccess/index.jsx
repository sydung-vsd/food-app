import { Button } from 'antd';
import NumberFormat from 'react-number-format';

import { ROOT_PATH } from '../../../contants';
import history from '../../../utils/history';
import * as S from './style';
import PropTypes from 'prop-types';

const AddCartSuccess = ({ cartItem, totalMoney }) => {
  return (
    <S.MsgWrap>
      <S.CartInfo>
        <S.FoodImage src={`${ROOT_PATH}${cartItem.foodImage}`} alt={''} />
        <S.InfoWarp>
          <h4>{cartItem.foodName}</h4>
          <p>
            <span>Tổng tiền: </span>
            <NumberFormat
              value={totalMoney}
              displayType={'text'}
              thousandSeparator
              suffix={'đ'}
            />
          </p>
        </S.InfoWarp>
      </S.CartInfo>
      <Button type='primary' onClick={() => history.push('/cart')}>Xem giỏ hàng</Button>
    </S.MsgWrap>
  );
};

AddCartSuccess.propTypes = {
  cartItem: PropTypes.shape({
    foodImage: PropTypes.string.isRequired,
    foodName: PropTypes.string.isRequired,
  }),
  totalMoney: PropTypes.number.isRequired,
};

export default AddCartSuccess;
