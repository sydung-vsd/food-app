import * as S from '../style';
import { Button, Spin } from 'antd';
import { getRatesAction } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, GiRank3, MdDescription, TiLocationArrow } from 'react-icons/all';
import { useEffect } from 'react';
import { IMG_SRC, PAGE_TITLE, PATH } from '../../../../contants';
import { Link } from 'react-router-dom';
import moment from 'moment';

const HistoryRating = () => {
  const dispatch = useDispatch();
  const {
    rateList: {
      currentPage,
      data: rateData,
      lastPage,
      load: rateLoad,
      total,
    },
  } = useSelector(({ rateReducer }) => rateReducer);
  const { userInfo: { data: { id: userId } } } = useSelector(({ userReducer }) => userReducer);
  const { accessToken } = JSON.parse(localStorage.userInfo);

  useEffect(() => {
    document.title = PAGE_TITLE.RATES;
    if (userId) {
      dispatch(getRatesAction({
        accessToken,
      }));
    }
  }, []);
  moment.locale('vi');
  const renderRateList = () => {
    return rateData.map(({
      id: rateId,
      storeCateName,
      storeImage,
      storeName,
      storeNotMark,
      storeDescription,
      storeAddress,
      rate,
      createdAt,
    }) => {
      return (
        <S.RateItem key={rateId} imagePath={IMG_SRC(storeImage)}>
          <Link to={PATH.STORE_DETAIL(`${storeNotMark}.${rateId}`)}>
            <div className='store-image'>
              <div />
            </div>
          </Link>
          <div className='store-info'>
            <div className='store-info-name'>
              <Link to={PATH.STORE_DETAIL(`${storeNotMark}.${rateId}`)}>{storeName}</Link>
              <div><small>{storeCateName}</small></div>
            </div>
            <S.InfoLine fSize={14}>
              <span><TiLocationArrow /></span>
              <p>{storeAddress}</p>
            </S.InfoLine>
            <div className='store-info-description'>
              <MdDescription />
              <p><span>{storeDescription}</span></p>
            </div>
          </div>
          <div className='rate-data-user'>
            <div>
              <p>Đánh giá của bạn:</p>
              <span>{rate}<AiFillStar /></span>
            </div>
            <small>{moment(createdAt).fromNow()}</small>
          </div>
        </S.RateItem>
      );
    });
  };
  return (
    <div>
      {
        total === 0 ?
          <S.ProfileEmpty minHeight={500}>
            {
              !rateLoad ?
                <div>
                  <GiRank3 />
                  <p>Bạn chưa đánh giá cửa hàng nào</p>
                </div>
                :
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    marginTop: '10px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <Spin />
                </div>
            }

          </S.ProfileEmpty>
          :
          <div style={{ paddingBottom: 15 }}>
            <S.TitleContent>
              Đánh giá của bạn
            </S.TitleContent>
            <div style={{ minHeight: 430, position: 'relative' }}>
              {renderRateList()}
              {
                rateLoad &&
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    marginTop: '10px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <Spin />
                </div>
              }
              {currentPage < lastPage &&
              <div className='d-flex vertical-center horizontal-center mt-3r'>
                <Button
                  onClick={() =>
                    dispatch(getRatesAction({
                      accessToken,
                      page: currentPage + 1,
                    }))
                  }
                >
                  Xem thêm
                </Button>
              </div>
              }
            </div>
          </div>
      }
    </div>
  );
};
export default HistoryRating;
