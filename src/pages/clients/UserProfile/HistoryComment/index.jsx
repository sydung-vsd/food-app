import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsCardImage } from 'react-icons/all';
import { CommentOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Image, Row, Spin } from 'antd';

import { getCommentsAction } from '../../../../redux/actions';
import * as S from '../style';
import { IMG_SRC, PAGE_TITLE, PATH } from '../../../../contants';

const HistoryComment = () => {
  moment.locale('vi');
  const dispatch = useDispatch();
  const { userInfo: { data: { id: userId } } } = useSelector(({ userReducer }) => userReducer);
  const {
    commentList: {
      currentPage,
      data: commentData,
      lastPage,
      load: commentLoad,
      total,
    },
  } = useSelector(({ commentReducer }) => commentReducer);
  useEffect(() => {
    document.title = PAGE_TITLE.COMMENTS;
    if (userId) {
      dispatch(getCommentsAction({
        userId: userId,
      }));
    }
  }, []);
  const renderComments = () => {
    return (
      <Collapse expandIconPosition='right'>
        {
          commentData.map(({
            content,
            createdAt,
            id: commentId,
            pictures,
            storeId,
            storeImage,
            storeName,
            storeNotMark,
          }) => {
            return (
              <Collapse.Panel
                key={commentId}
                header={
                  <Row gutter={20}>
                    <Col span={10}>
                      <S.StoreTitle>
                        <img
                          src={IMG_SRC(storeImage)}
                          alt={storeName}
                        />
                        <Link to={PATH.STORE_DETAIL(`${storeNotMark}.${storeId}`)}>
                          {storeName}
                        </Link>
                      </S.StoreTitle>
                    </Col>
                    <Col
                      className='d-flex vertical-center'
                      span={10}
                      style={{ justifyContent: 'space-around' }}
                    >
                      <S.CommentTitleContent>{content}</S.CommentTitleContent>
                      <div>
                        {
                          pictures.length > 0 &&
                          <span>{pictures.length}<BsCardImage /></span>
                        }
                      </div>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                      {moment(createdAt).fromNow()}
                    </Col>
                  </Row>
                }
              >
                <p style={{ marginBottom: 10 }}>{content}</p>
                {pictures.length > 0 &&
                <Row gutter={10}>
                  <Image.PreviewGroup>
                    {pictures.map((picture) => {
                      return (
                        <Col key={picture} span={6}>
                          <div style={{
                            width: '194px',
                            height: '194px',
                            overflow: 'hidden',
                            border: '1px solid #f6f6f6',
                            borderRadius: 4,
                          }}>
                            <Image
                              style={{
                                width: '194px',
                                height: '194px',
                                objectFit: 'cover',
                                verticalAlign: 'middle',
                              }}
                              src={IMG_SRC(picture)}
                              alt={picture}
                              preview={{
                                mask: <div><EyeOutlined /> Xem ảnh</div>,
                              }}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </Image.PreviewGroup>
                </Row>
                }
              </Collapse.Panel>
            );
          })
        }
      </Collapse>
    );
  };
  return (
    <div>
      {
        total === 0 ?
          <S.ProfileEmpty minHeight={500}>
            {
              !commentLoad ?
                <div>
                  <CommentOutlined />
                  <p>Bạn chưa có bình luận nào</p>
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
              Bình luận của bạn
            </S.TitleContent>
            <div style={{ minHeight: 430 }}>
              {renderComments()}
              {
                commentLoad &&
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
                    dispatch(getCommentsAction({
                      userId: userId,
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
export default HistoryComment;
