import { useDispatch, useSelector } from 'react-redux';
import { Form, Image, Input, message, Progress, Upload } from 'antd';
import { AiOutlineCamera } from 'react-icons/all';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import { createCommentAction, removePictureAction, uploadPicturesAction } from '../../../../../../../redux/actions';
import * as S from './style';
import { DeleteOutlined } from '@ant-design/icons';
import { PATH, ROOT_PATH } from '../../../../../../../contants';
import history from '../../../../../../../utils/history';
import { MSG } from '../../../../../../../contants/message.contant';

const FormComment = ({ show, form, slug, setShow }) => {
  const userToken = localStorage.getItem('userInfo');
  const { pictures } = useSelector(({ commentReducer }) => commentReducer);
  const dispatch = useDispatch();
  const renderPictures = () => {
    return (
      <Image.PreviewGroup>
        <div className='clearfix' style={{ paddingTop: 23 }}>
          {pictures.map((picture) => {
            return (
              <S.PictureWrap key={picture.uid}>
                <S.PictureItem>
                  {
                    picture.status === 'done' ?
                      <div style={{ height: '100%' }}>
                        <Image
                          src={picture.url}
                          alt={picture.name}
                          preview={{ mask: <span /> }}
                        />
                        <S.DeleteBtn
                          className='btn-delete'
                          onClick={() => {
                            const { accessToken } = JSON.parse(userToken);
                            dispatch(removePictureAction({
                              accessToken,
                              data: {
                                uid: picture.uid,
                                path: picture.url,
                              },
                            }));
                          }}
                        >
                          <span>
                            <DeleteOutlined />
                          </span>
                        </S.DeleteBtn>
                      </div>
                      :
                      <Progress type='circle' percent={picture.percent} width='80%' />
                  }
                </S.PictureItem>
              </S.PictureWrap>
            );
          })}
        </div>
      </Image.PreviewGroup>
    );
  };
  return (
    <S.FormCommentWrap show={show}>
      <Form
        form={form}
        onFinish={(value) => {
          const { accessToken } = JSON.parse(userToken);
          const data = {
            ...value,
            accessToken,
            from: history.location.pathname.replace(`${PATH.STORE}/${slug}/`, ''),
            slug,
            paths: pictures.map((picture) => picture.url.replace(ROOT_PATH, '')),
          };
          dispatch(createCommentAction(data));
          form.resetFields();
          setShow(false);
        }}
      >
        <Form.Item
          name='description'
          style={{ marginBottom: '0' }}
          rules={[
            { required: true, message: ' ' },
            { max: 1000, message: ' ' },
          ]}
        >
          <Input.TextArea
            showCount
            autoSize
            maxLength={1000}
            placeholder='Viết bình luận của bạn...'
          />
        </Form.Item>
        <Upload
          disabled={pictures.length === 8}
          className='upload-picture'
          accept='image/*'
          beforeUpload={false}
          showUploadList={false}
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
          <AiOutlineCamera />
        </Upload>
      </Form>
      {renderPictures()}
    </S.FormCommentWrap>
  );
};

FormComment.propTypes = {
  slug: PropTypes.string,
  show: PropTypes.bool,
  form: PropTypes.object,
  setShow: PropTypes.func,
};

export default FormComment;
