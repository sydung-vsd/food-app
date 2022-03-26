import styled from 'styled-components';
import { Form, Modal, Spin } from 'antd';

export const ModalLoginCustom = styled(Modal)`
  padding-bottom: 0;
  border-radius: 10px;

  & button.ant-modal-close {
    transform: translate(40%, -40%);

    & > span.ant-modal-close-x {
      border-radius: 50%;
      transform: scale(0.7);
      background-color: #fff;
      font-size: 200%;
      color: rgba(0, 0, 0, 0.65);
    }
  }

  & .ant-modal-content {
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  & .ant-modal-body {
    padding: 3rem;

    & h2 {
      margin-bottom: 0;
      color: ${(props) => props.theme.rootColor};
      font-family: "Poppins", sans-serif !important;
      font-weight: 800;
      font-size: 200%;

      & + h5 {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 120%;
        color: #777;
      }
    }
  }

  & a {
    color: ${(props) => props.theme.btnPrimary};
  }
`;
export const FormCustom = styled(Form)`
  & input {
    padding: 10px 15px !important;
    font-size: 16px;
  }

  & .ant-input-affix-wrapper.ant-input-password {
    padding: 0 !important;

    & > span.ant-input-suffix {
      margin: 0 10px !important;
    }
  }

  & .ant-col.ant-form-item-control {
    & button {
      height: auto;
      width: 100%;
      padding: 5px;
      margin-top: 10px;
      font-weight: bold;

      &[disabled] {
        cursor: wait;
      }

      & > span {
        font-size: 120%;
      }
    }
  }
`;

export const SubmitLoading = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  display: ${({ show }) => (show ? 'block' : 'none')};
  transform: translate(-50%, -50%);
`;
