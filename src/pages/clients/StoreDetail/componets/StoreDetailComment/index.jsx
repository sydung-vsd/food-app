import { Avatar, Image, Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCommentsAction, removeAllPicturesAction } from '../../../../../redux/actions';
import { ROOT_PATH } from '../../../../../contants';
import moment from 'moment';

import * as StoreDetailStyle from '../../style';
import * as ClientStyle from '../../../styles';
import * as S from './style';
import FormComment from './components/FormComment';

const StoreDetailComment = (
  {
    slug,
    checkLogin,
    userInfo,
  },
) => {
  const dispatch = useDispatch();
  const {
    commentList: {
      currentPage,
      data: commentData,
      lastPage,
      load,
      total,
    },
    pictures,
  } = useSelector(({ commentReducer }) => commentReducer);
  const storeId = slug.slice(slug.lastIndexOf('.') + 1);
  const [loadMore, setLoadMore] = useState(false);
  const [showFormComment, setShowFormComment] = useState(false);
  const [commentForm] = Form.useForm();
  moment.locale('vi');

  const loadMoreComment = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 300 >= document.documentElement.scrollHeight) {
      if (!loadMore) {
        setLoadMore(true);
      }
    }
  };
  useEffect(() => {
    dispatch(getCommentsAction({ storeId }));
    window.addEventListener('scroll', loadMoreComment);

    return () => {
      window.removeEventListener('scroll', loadMoreComment);
    };
  }, []);

  useEffect(() => {
    if (currentPage === lastPage && loadMore) {
      window.removeEventListener('scroll', loadMoreComment);
    } else {
      setLoadMore(false);
    }
  }, [currentPage]);
  useEffect(() => {
    if (loadMore && currentPage < lastPage) {
      dispatch(getCommentsAction({
        storeId,
        page: currentPage + 1,
      }));
    }
    if (loadMore && currentPage === lastPage) {
      window.removeEventListener('scroll', loadMoreComment);
    }
  }, [loadMore]);

  const renderComment = () => {
    return commentData.map((commentItem) => {
      return (
        <S.CommentWrap key={commentItem.id}>
          <S.CommentHeader>
            <S.AvatarWrap>
              <Avatar
                size='large'
                src={commentItem.userAvatar && `${ROOT_PATH}${commentItem.userAvatar}`}
              >
                {!commentItem.userAvatar && (
                  <span style={{ fontSize: '2rem' }}>
                    {commentItem.lastName && commentItem.lastName[0].toUpperCase()}
                  </span>
                )}
              </Avatar>
              <h5>{`${commentItem.firstName} ${commentItem.lastName}`}</h5>
            </S.AvatarWrap>
            <small>{moment(commentItem.createdAt).fromNow()}</small>
          </S.CommentHeader>
          <S.CommentContent>
            <p style={{ marginBottom: 10 }}>{commentItem.content}</p>
            {commentItem.pictures?.length > 0 &&
            <Image.PreviewGroup>
              <div className='clearfix'>
                {commentItem.pictures.map((picture, pictureIndex) => {
                  return (
                    <StoreDetailStyle.PictureWrap key={picture} index={pictureIndex}>
                      <StoreDetailStyle.PictureItem>
                        <Image
                          src={`${ROOT_PATH}${picture}`}
                          alt={picture}
                          preview={{
                            mask: <span />,
                          }}
                        />
                      </StoreDetailStyle.PictureItem>
                      {
                        ((pictureIndex === 2 && commentItem.pictures.length > 3) || (pictureIndex === 3 && commentItem.pictures.length > 4)) &&
                        <StoreDetailStyle.MorePicture total={commentItem.pictures.length} index={pictureIndex} />
                      }
                    </StoreDetailStyle.PictureWrap>
                  );
                })}
              </div>
            </Image.PreviewGroup>
            }
          </S.CommentContent>
        </S.CommentWrap>
      );
    });
  };
  return (
    <div>
      <div className='list-of-store-detail'>
        <ClientStyle.AffixFilter offsetTop={88.375 + 54}>
          <StoreDetailStyle.DetailFilter>
            <StoreDetailStyle.StoreFilterTitle>
              Bình luận cửa hàng
            </StoreDetailStyle.StoreFilterTitle>
            {
              showFormComment
                ?
                <Space size='small'>
                  <Button
                    onClick={() => {
                      const userToken = localStorage.userInfo;
                      if (userToken && pictures.length > 0) {
                        const { accessToken } = JSON.parse(userToken);
                        dispatch(removeAllPicturesAction({
                          accessToken,
                          data: { paths: pictures.map((picture) => picture.url.replace(ROOT_PATH, '')) },
                        }));
                      }
                      setShowFormComment(!showFormComment);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    style={{
                      color: '#fff',
                      background: '#3380d8',
                      marginRight: 10,
                    }}
                    onClick={() => {
                      commentForm.submit();
                    }}
                  >
                    Gửi
                  </Button>
                </Space>
                :
                <Button
                  style={{
                    color: '#fff',
                    background: '#3380d8',
                    marginRight: 10,
                  }}
                  onClick={() => {
                    if (checkLogin()) {
                      setShowFormComment(!showFormComment);
                    }
                  }}
                >
                  Viết Bình luận
                </Button>
            }
          </StoreDetailStyle.DetailFilter>
          {userInfo.data.id && <FormComment
            show={showFormComment}
            form={commentForm}
            slug={slug}
            setShow={setShowFormComment}
          />}
        </ClientStyle.AffixFilter>
        {
          total > 0 ?
            <div>
              {renderComment()}
              {load && (
                <div className='d-flex horizontal-center vertical-center' style={{ width: '100%' }}>
                  <Spin />
                </div>
              )}
            </div>
            :
            <div className='d-flex vertical-center horizontal-center t-center' style={{ minHeight: 200, fontSize: 16 }}>
              {load ?
                <div className='d-flex horizontal-center vertical-center' style={{ width: '100%' }}>
                  <Spin />
                </div>
                :
                <div>
                  <p>Chưa có bình luận nào!</p>
                  <p>Hãy là người đầu tiên bình luận về cửa hàng</p>
                  <Button
                    style={{
                      width: '80%',
                      color: '#fff',
                      background: '#3380d8',
                    }}
                    onClick={() => {
                      if (checkLogin()) {
                        setShowFormComment(!showFormComment);
                      }
                    }}
                  >
                    Viết Bình luận
                  </Button>
                </div>
              }
            </div>
        }
      </div>
    </div>
  );
};
export default StoreDetailComment;

StoreDetailComment.propTypes = {
  slug: PropTypes.string,
  checkLogin: PropTypes.func,
  userInfo: PropTypes.object,
};
