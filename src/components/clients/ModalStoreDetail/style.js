import styled from 'styled-components';
import { Button, Input, Form, Modal } from 'antd';

export const ModalCustom = styled(Modal)`
  & .ant-modal-content {
    position: relative;

    & .ant-modal-close {
      position: absolute;
      top: 0;
      right: 0;

      transform: translate(50%, -50%);

      & > .ant-modal-close-x {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        box-shadow: -5px 5px 10px 1px rgba(0, 0, 0, .4);
        background-color: white;

        & > .anticon.anticon-close.ant-modal-close-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background-color: #444;
          color: white;
        }
      }
    }

    & .ant-modal-header {
      padding: 8px 24px;
    }

    & .ant-modal-body {
      background-color: #eee;
      padding: 15px;

      & .review-points {
        float: left;
        display: block;
        margin: 10px 0 0;
        width: 32px;
        height: 32px;
        border-radius: 100px;
        background: ${(props) => props.theme.rootColor};
        color: #fff;
        text-align: center;
        font-size: 12px;
        line-height: 32px;
        overflow: hidden;

        & > span {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 12px;
          line-height: 32px;

          & > svg {
            color: ${(props) => props.theme.star};
          }
        }

      }

      & .fldr-res-title {
        padding: 6px 0 1px;
        font-weight: 700;
        color: #000;
        font-size: 14px;
        clear: both;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      & .fldr-res-address {
        font-weight: 400;
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        line-height: 1.4em;
      }
    }
  }
`;
export const FormCustom = styled(Form)`
  & .form-control {
    min-height: 188px;

    & .ant-form-item {
      margin-bottom: 8px;

      & .ant-form-item-explain.ant-form-item-explain-error, .ant-form-item-explain.ant-form-item-explain-success {
        height: 0;
        min-height: 0;
      }

      & .ant-form-item-control-input {

        & .ant-upload.ant-upload-select.ant-upload-select-picture-card, .ant-upload-list-picture-card-container {
          width: 71px;
          height: 71px;

          & > .ant-upload-list-item.ant-upload-list-item-error.ant-upload-list-item-list-type-picture-card,
          .ant-upload-list-item.ant-upload-list-item-undefined.ant-upload-list-item-list-type-picture-card {
            padding: 0;
          }

          & .ant-upload-list-item-actions {
          }
        }
      }
    }
  }
`;
export const TextAreaBox = styled(Input.TextArea)`
  resize: none;
  min-height: calc(188px ${(props) => props.full && '- 79px'}) !important;
`;
export const SubmitButton = styled(Button)`
  width: 100%;
  background: #3380d8;
  color: #fff;
  height: 38px;
`;
