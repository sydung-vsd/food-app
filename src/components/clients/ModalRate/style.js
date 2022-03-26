import styled from 'styled-components';
import Modal from 'antd/es/modal/Modal';

export const ModalRate = styled(Modal)`
  & .ant-modal-body {
    padding: 48px 24px;

    & .ant-rate-star-zero .ant-rate-star-second {
      color: #e0e0e0;
    }
  }

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
`;
export const StoreImage = styled.div`
  height: 258px;
  background-image: url("${({ imgSrc }) => imgSrc}");
  background-position: center;
  background-size: cover;
  @media screen and (max-width: 479px) {
    height: 188px;
  }
`;
export const StoreName = styled.div`
  padding: 5px 0;

  & > h3 {
    margin: 0;
  }
`;
export const DetailPoint = styled.ul`
  padding: 0;
  display: flex;

  & > li {
    flex-basis: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .point-detail {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      color: #29d197;
      text-shadow: 0 1px 1px #fff;

      & > svg {
        color: ${(props) => props.theme.star};
      }
    }

    & .point-title {
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  }
`;

export const YourRateCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  color: ${(props) => props.theme.rootColor};
  font-size: 20px;
  font-weight: bold;

  & > svg {
    color: ${(props) => props.theme.star};
  }
`;

export const YourRateText = styled.div`
  font-size: 16px;
  color: #777;
`;
