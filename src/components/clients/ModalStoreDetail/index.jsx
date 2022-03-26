import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Form, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AiFillStar } from 'react-icons/all';
import { v4 } from 'uuid';

import * as S from './style';
import {
  getBookmarkDetailAction,
  createBookmarkAction,
  updateBookmarkAction,
  createCommentAction, uploadPicturesAction, removePictureAction, removeAllPicturesAction,
} from '../../../redux/actions';

import { ROOT_PATH } from '../../../contants';
import loadAvatarStore from '../../../assets/images/loadStore.png';
import { MSG } from '../../../contants/message.contant';

const ModalStoreDetail = (
  {
    isShow,
    setShow,
    isComment,
    storeId,
    image,
    slug,
    address,
    avgRate,
    storeName,
    fromDetail,
  },
) => {
  const dispatch = useDispatch();
  const [actionForm] = Form.useForm();
  const userToken = localStorage.getItem('userInfo');
  let accessToken = null;
  if (userToken) {
    accessToken = JSON.parse(userToken)?.accessToken;
  }
  const { bookmarkDetail: { data, load: loadBookmark } } = useSelector(({ bookmarkReducer }) => bookmarkReducer);
  const { pictures } = useSelector(({ commentReducer }) => commentReducer);
  useEffect(() => {
    if (!isComment && isShow) {
      dispatch(getBookmarkDetailAction({
        accessToken,
        data: {
          storeId,
        },
      }));
    }
  }, [isShow]);

  const handleSubmit = (value) => {
    if (!isComment) {
      if (data.description) {
        dispatch(updateBookmarkAction({
          accessToken,
          data: {
            ...value,
            storeId,
          },
        }));
      } else {
        dispatch(createBookmarkAction({
          accessToken,
          data: {
            ...value,
            storeId,
          },
        }));
      }
    } else {
      const data = {
        ...value,
        accessToken,
        slug,
        paths: pictures.map((picture) => picture.url.replace(ROOT_PATH, '')),
      };
      dispatch(createCommentAction(data));
      actionForm.resetFields();
    }
    setShow(false);
  };
  useEffect(() => {
    if (!isComment) {
      actionForm.setFieldsValue({ description: data.description });
    }
  }, [data]);
  return (
    <S.ModalCustom
      title={isComment ? 'Viết bình luận' : 'Lưu vào Bookmarks'}
      visible={isShow}
      onCancel={() => {
        if (!fromDetail) {
          setShow(false);
        } else {
          setShow({ isComment, status: false });
          if (isComment && pictures.length > 0) {
            const { accessToken } = JSON.parse(userToken);
            dispatch(removeAllPicturesAction({
              accessToken,
              data: { paths: pictures.map((picture) => picture.url.replace(ROOT_PATH, '')) },
            }));
          }
        }
        actionForm.resetFields();
      }}
      width={1000}
      footer={false}
    >
      <Row gutter={8}>
        <Col sm={8} xs={24}>
          <div>
            <img
              src={
                image
                  ? `${ROOT_PATH}${image}`
                  : loadAvatarStore
              }
              alt={storeName}
              width='100%'
              height={188}
            />
            <div
              style={{
                overflow: 'hidden',
                clear: 'both',
                margin: '0 0 10px 0',
              }}
            >
              <div className='review-points'>
                <span>{avgRate}<AiFillStar /></span>
              </div>
              <div style={{ float: 'left', width: 'calc(100% - 42px)', marginLeft: '10px' }}>
                <div className='fldr-res-title'>{storeName}</div>
                <div className='fldr-res-address'>{address}</div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={16} xs={24}>
          <S.FormCustom
            onFinish={handleSubmit}
            form={actionForm}
          >
            <div className='form-control'>
              <Form.Item
                name='description'
                rules={[{ required: true, message: ' ' }]}
              >
                <S.TextAreaBox
                  full={isComment}
                  placeholder={isComment ? 'Viết bình luận của bạn...' : 'Thêm mô tả...'}
                  disabled={loadBookmark}
                />
              </Form.Item>
              {
                isComment &&
                <Form.Item>
                  <Upload
                    accept='image/*'
                    listType='picture-card'
                    beforeUpload={false}
                    fileList={pictures}
                    onRemove={({ uid, url }) => {
                      const { accessToken } = JSON.parse(userToken);
                      dispatch(removePictureAction({
                        accessToken,
                        data: {
                          uid,
                          path: url,
                        },
                      }));
                    }}
                    customRequest={({ file }) => {
                      if (pictures.length < 8) {
                        let msgErr = '';
                        if (file.size > 2048 * 1000) {
                          msgErr = MSG.VALIDATE_IMAGE_SIZE;
                        }
                        if (!file.type.match('image/')) {
                          msgErr = MSG.VALIDATE_NOT_IMAGE;
                        }
                        if (!msgErr) {
                          const { accessToken } = JSON.parse(userToken);
                          dispatch(uploadPicturesAction({
                            accessToken,
                            data: {
                              file,
                              uid: v4(),
                            },
                          }));
                        } else {
                          message.error(msgErr);
                        }
                      }
                    }}
                    maxCount={8}
                    multiple
                  >
                    {pictures.length < 8 &&
                    <div style={{ fontSize: 12 }}>
                      <PlusOutlined />
                      <div>Thêm ảnh</div>
                    </div>
                    }
                  </Upload>
                </Form.Item>
              }
            </div>
            <S.SubmitButton
              htmlType='submit'
              disabled={!isComment && loadBookmark}
            >
              {isComment ? 'Viết bình luận' : data.description ? '+ Sửa bộ sưư tập' : '+ Lưu vào bộ sưu tập'}
            </S.SubmitButton>
          </S.FormCustom>
        </Col>
      </Row>
    </S.ModalCustom>
  );
};
export default ModalStoreDetail;

ModalStoreDetail.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  isComment: PropTypes.bool,
  fromDetail: PropTypes.bool,
  slug: PropTypes.string,
  image: PropTypes.string,
  address: PropTypes.string,
  avgRate: PropTypes.string,
  storeId: PropTypes.number,
  storeName: PropTypes.string,
};
