import styled from 'styled-components';

export const FormCommentWrap = styled.div`
  max-height: ${({ show }) => show ? 'auto' : 0};
  height: auto;
  padding: ${({ show }) => show ? '5px' : 0} 10px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 2px 8px 0 rgb(99 99 99 / 20%);
  transition: .3s ease;

  & > form {
    position: relative;

    & .ant-form-item-explain {
      display: none;
    }

    & textarea {
      border-radius: 4px;
      background: #f5f9fd;
      min-height: 32px;
      line-height: 32px;
      padding-right: 30px;
    }

    & span.upload-picture {
      position: absolute;
      right: 10px;
      bottom: 5px;
      display: block;
      cursor: pointer;

      & svg {
        font-size: 20px;
      }
    }
  }
`;
export const PictureWrap = styled.div`
  float: left;
  position: relative;
  width: calc(12.5% - 20px);
  padding-bottom: calc(12.5% - 20px);
  border-radius: 4px;
  margin: 10px;
  @media screen and (max-width: 767px) {
    margin: 5px;
    width: calc(25% - 10px);
    padding-bottom: calc(25% - 10px);
  }
`;
export const PictureItem = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0;

  &:hover .btn-delete {
    opacity: 1;
  }

  & .ant-image {
    width: 100%;
    height: 100%;

    & img.ant-image-img {
      width: 100%;
      height: 100%;
    }

    & .ant-image-mask {
      z-index: 2;
    }
  }

  & .ant-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;
export const DeleteBtn = styled.div`
  position: absolute;
  top: -10%;
  right: -10%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
  width: 30%;
  background: #fff;
  border: 2px solid #777;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: .3s;

  &:hover {
    border-color: #444;

    & > span {
      background: #444;
    }
  }

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 80%;
    background: #777;
    border-radius: 50%;
    color: #fff;
    font-size: 14px;
    transition: .3s;
  }
`;
