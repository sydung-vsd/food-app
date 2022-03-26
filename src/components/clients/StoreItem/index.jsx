import { Avatar, message, Skeleton } from 'antd';
import {
  AiTwotoneStar, BsFillBookmarkFill,
  FaComment,
  IoIosPizza,
} from 'react-icons/all';

import PropTypes from 'prop-types';

import history from '../../../utils/history';

import * as S from './style';

import { ROOT_PATH } from '../../../contants';
import storeLoading from '../../../assets/images/loadStore.png';
import handleStopPropagation from '../../../utils/common';
import { useSelector } from 'react-redux';

const StoreItem = ({
  id,
  storeImage,
  storeName,
  storeAddress,
  storeNotMark,
  totalFood,
  totalComment,
  avgRate,
  lastComment,
  loading,
  isShowModalBookmark,
  setIsShowModalBookmark,
  setStoreDetail,
}) => {
  const { userInfo: { data: { id: userId } } } = useSelector(({ userReducer }) => userReducer);
  return (
    <S.CardItem
      hoverable
      cover={
        <S.StoreImage
          avatar={loading ? storeLoading : `${ROOT_PATH}${storeImage}`}
        />
      }
      onClick={() => {
        if (!loading) {
          history.push(`/stores/${storeNotMark}.${id}`);
        }
      }}
    >
      <Skeleton avatar loading={loading} active>
        <S.StoreInfo>
          <S.StoreNameInfo>{storeName}</S.StoreNameInfo>
          <S.StoreAddress>{storeAddress}</S.StoreAddress>
        </S.StoreInfo>
        {lastComment?.firstName ? (
          <S.StoreCommentWrap
            avatar={<Avatar src={`${ROOT_PATH}${lastComment?.avatar}`} />}
            title={
              <S.StoreComment>
                <S.StoreCommentName>
                  {`${lastComment?.firstName} ${lastComment?.lastName}`}{' '}
                </S.StoreCommentName>
                <S.StoreCommentDoc> {lastComment?.content}</S.StoreCommentDoc>
              </S.StoreComment>
            }
          />
        ) : (
          <div style={{ minHeight: 44 }} />
        )}

        <S.StoreStatistical>
          <div>
            <div>
              <FaComment />
              <span>{totalComment}</span>
            </div>
            <div>
              <IoIosPizza />
              <span>{totalFood}</span>
            </div>
            {avgRate > 0 && (
              <div>
                <AiTwotoneStar />
                <span>{avgRate}</span>
              </div>
            )}
            <span
              onClick={(e) => {
                handleStopPropagation(e);
                if (userId) {
                  setStoreDetail({
                    storeId: id,
                    storeName,
                    avgRate,
                    storeImage,
                    storeAddress,
                  });
                  setIsShowModalBookmark(!isShowModalBookmark);
                } else {
                  message.error('Vui lòng đăng nhập!');
                }
              }}
            >
              <BsFillBookmarkFill />
            </span>
          </div>
        </S.StoreStatistical>
      </Skeleton>
    </S.CardItem>
  );
};
export default StoreItem;

StoreItem.propTypes = {
  id: PropTypes.number,
  storeImage: PropTypes.string,
  storeName: PropTypes.string,
  storeAddress: PropTypes.string,
  storeNotMark: PropTypes.string,
  avgRate: PropTypes.string,
  totalComment: PropTypes.number,
  lastComment: PropTypes.shape({
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    avatar: PropTypes.string,
    content: PropTypes.string,
  }),
  totalFood: PropTypes.number,
  loading: PropTypes.func,
  isShowModalBookmark: PropTypes.bool,
  setIsShowModalBookmark: PropTypes.func,
  setStoreDetail: PropTypes.func,
};
