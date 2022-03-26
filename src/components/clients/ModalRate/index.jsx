import { Col, Rate, Row } from 'antd';
import PropTypes from 'prop-types';
import { createRateAction } from '../../../redux/actions';
import { AiFillStar } from 'react-icons/all';
import { useSelector } from 'react-redux';
import * as S from './style';
import { IMG_SRC } from '../../../contants';

function ModalRate({ isShow, setShow }) {
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const { storeDetail } = useSelector(({ storeReducer }) => storeReducer);
  const userToken = localStorage.userInfo;
  return (
    <S.ModalRate
      visible={isShow}
      footer={null}
      centered
      onCancel={() => setShow(false)}
    >
      <Row>
        <Col span={24}>
          <S.StoreImage imgSrc={IMG_SRC(storeDetail.data.storeImage)} />
        </Col>
        <Col span={24}>
          <S.StoreName>
            <h3>{storeDetail.data.storeName}</h3>
          </S.StoreName>
          <S.DetailPoint>
            <li>
              <span className='point-detail'>
                {storeDetail.data.avgRate === '0'
                  ? '--'
                  : storeDetail.data.avgRate}
                {storeDetail.data.avgRate !== '0' && <AiFillStar />}
              </span>
              <span className='point-title'>
                Trung bình
              </span>
            </li>
            <li>
              <span className='point-detail'>
                {storeDetail.data.totalComment}
              </span>
              <span className='point-title'>
                Bình luận
              </span>
            </li>
            <li>
              <span className='point-detail'>
                {storeDetail.data.totalFood}
              </span>
              <span className='point-title'>
                Món ăn
              </span>
            </li>
            <li>
              <span className='point-detail'>
                {storeDetail.data.totalRating}
              </span>
              <span className='point-title'>
                Lượt đánh giá
              </span>
            </li>
          </S.DetailPoint>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Rate
            disabled={!!storeDetail.data.userRate || !userInfo.data.id}
            defaultValue={storeDetail.data.userRate}
            onChange={(value) => {
              const { accessToken } = JSON.parse(userToken);
              dispatch(createRateAction({
                accessToken,
                data: {
                  storeId: storeDetail.data.id,
                  rate: value,
                },
              }));
            }}
          />
          <S.YourRateCount>
            {!storeDetail.data.userRate
              ? '--'
              : storeDetail.data.userRate}
            {!!storeDetail.data.userRate && <AiFillStar />}
          </S.YourRateCount>
          <S.YourRateText>
            Đánh giá của bạn
          </S.YourRateText>
        </Col>
      </Row>
    </S.ModalRate>
  );
}

ModalRate.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default ModalRate;
