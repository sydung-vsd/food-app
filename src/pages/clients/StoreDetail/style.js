import styled, { css } from 'styled-components';
import { Affix, Modal } from 'antd';

export const MicroHeader = styled.div`
  position: relative;
  clear: both;
  overflow: hidden;
  background: #fff;
`;
export const MainImg = styled.div`
  position: relative;
`;
export const ImageWrap = styled.div`
  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 275px;
  overflow: hidden;
`;
export const MainInformation = styled.div`
  float: left;
  padding-left: 25px;
  width: 100%;
  @media screen and (max-width: 575px) {
    padding-left: 15px;
  }
  @media screen and (max-width: 479px) {
    padding-left: 10px;
  }
`;
export const ResCommon = styled.div`
  position: relative;
  float: left;
  height: 275px;
  width: 100%;
  margin-top: 0;
  overflow: hidden;
  font-size: 14px;
  @media screen and (max-width: 767px) {
    height: auto;
    padding-bottom: 15px;
  }
`;
export const MainInfoTitle = styled.div`
  float: left;
  padding: 10px 0;
  width: 100%;
  overflow: hidden;
`;
export const StoreName = styled.h1`
  float: left;
  width: 80%;
  padding: 5px 0 2px;
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2em;
  text-shadow: 0 1px 1px #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  @media screen and (max-width: 479px) {
    width: 75%;
  }
`;
export const StoreShare = styled.div`
  display: flex;
  justify-content: center;
  float: right;
  width: 20%;
  padding: 5px 0 2px;
  margin: 0;
  line-height: 1.2em;
  @media screen and (max-width: 479px) {
    width: 25%;
  }
`;
export const StoreCategory = styled.div`
  padding: 2px 0;
  overflow: hidden;
  clear: both;

  & > small {
    color: #888;
    font-size: 12px;
  }
`;
const InfoRow = css`
  display: flex;
  align-items: center;
  width: 90%;
  max-height: 35px;
  line-height: 35px;
  overflow: hidden;
  clear: both;

  & > svg {
    float: left;
    flex-basis: 3%;
    margin-right: 6px;
    padding-top: 1px;
    font-size: 13px;
  }

  & > span {
    display: inline-block;
    flex-basis: 97%;
    white-space: nowrap;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & span.its-open {
    color: ${(props) => props.theme.rootColor};
    font-weight: 700;
  }

  & span.its-closed {
    color: #989898;
    font-weight: 700;
  }
`;
export const StoreAddress = styled.div`
  ${InfoRow}
`;
export const StoreTime = styled.div`
  ${InfoRow}
`;
export const ResSummaryPoint = styled.div`
  margin-top: 5px;
  overflow: hidden;
  clear: both;
  @media screen and (max-width: 479px) {
    margin-left: -8px;
  }
`;
export const MicroPoints = styled.div`
  float: left;
  margin-bottom: 10px;
  padding: 10px 0 6px;
  width: 100px;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.rootColor};
  text-shadow: 0 1px 1px #fff;
  @media screen and (max-width: 1199px) {
    width: 90px;
  }
  @media screen and (max-width: 575px) {
    width: 105px;
  }
  @media screen and (max-width: 479px) {
    width: 80px;
    margin-bottom: 5px;
  }
`;
export const MicroReviewCount = styled.div`
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
  width: 100%;
  text-align: center;

  & > svg {
    color: ${(props) => props.theme.star};
  }
`;
export const MicroReviewText = styled.div`
  float: left;
  margin-top: 7px;
  width: 100%;
  font-size: 12px;
  color: #777;
  text-align: center;
  @media screen and (max-width: 479px) {
    font-size: 11px;
  }
`;
export const MicroMainMenu = styled.div`
  margin-top: 20px;
`;
export const StoreToolbar = styled.div`
  margin-bottom: 15px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;

  & > ul {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 0;
    border: 1px solid #ddd;
    list-style: none;
    background: #fff;

    & > li {
      flex-basis: 25%;
      overflow: hidden;

      & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
        border-right: #f0f0f0 1px solid;
        border-bottom: none;
        font-size: 14px;
        text-align: center;
        font-weight: 700;
        color: ${(props) => props.theme.priceBlue};
        transition: .3s;

        & > svg {
          margin-right: 5px;
        }

        &:hover {
          background: #f7f7f7;
        }
      }

    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const ToolbarAffix = styled(Affix)`
  & .ant-affix {
    z-index: 5;
  }
`;
export const StoreContent = styled.div`
  margin-bottom: 15px;
  padding-top: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
  background: #fff;
  overflow: hidden;
`;
export const StoreFilterSuffix = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-basis: 70%;
  margin: 0;
  padding: 0 5px 0 0;
  align-items: center;

  & > li.sort-by-price {
    flex-basis: calc(30% - 10px);
    margin: 0 0 0 5px;

    & > div {
      min-width: 122px;
    }
  }

  & > li.filer-by-tag {
    flex-basis: 70%;
  }

  & > li > div {
    min-width: unset;
    width: 100%;

    & .ant-select-selector {
      max-height: 32px;
      overflow: hidden;
    }
  }

  @media screen and (max-width: 767px) {
    flex-basis: 100%;
  }
`;
export const StoreFilterTitle = styled.div`
  padding: 10px 15px 5px 0;
  border-bottom: 1px solid #eee;
  font-size: 1.25rem;
  font-weight: 600;
  overflow: hidden;
  color: #333;
  @media screen and (max-width: 767px) {
    &.mobile-hidden {
      display: none;
    }
  }
`;
export const ViewOther = styled.div`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 2px;
  text-align: center;
  overflow: hidden;
  font-size: 14px;
  color: #fff;
  background-color: ${(props) => props.theme.btnDanger};
  cursor: pointer;
`;
export const ModalCustom = styled(Modal)`
  & .ant-modal-close {
    display: none;
  }

  & .ant-modal-body {
    padding: 0 !important;
  }

  & .ant-modal-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;

    & > button {
      display: inline-block;
      width: 50%;
      padding: 4px 10px;
      border: 1px solid ${(props) => props.theme.btnDanger};
      border-radius: 3px;
      font-size: 16px;
      cursor: pointer;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -webkit-appearance: button;
      font-weight: 400;
      user-select: none;
      line-height: 1.5;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      overflow: visible;
      background-color: ${(props) => props.theme.btnDanger};
      text-transform: none;
    }
  }

  @media screen and (max-width: 479px) {
    top: 50px;
    overflow: hidden;
    & .ant-modal-close {
      position: absolute;
      right: 10px;
      top: 10px;

      display: block;
      color: #444;

      & .ant-modal-close-x {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ccc;
        border-radius: 50%;
        width: 30px !important;
        height: 30px !important;
      }
    }
  }
`;
export const PictureWrap = styled.div`
  float: left;
  position: relative;
  width: ${({ index }) => index && index > 3 ? 0 : 'calc(25% - 20px)'};
  padding-bottom: ${({ index }) => index && index > 3 ? 0 : 'calc(25% - 20px)'};
  margin: 10px;
  overflow: hidden;
  @media screen and (max-width: 479px) {
    width: ${({ index }) => index && index > 2 ? 0 : 'calc(100% / 3 - 20px)'};
    padding-bottom: ${({ index }) => index && index > 2 ? 0 : 'calc(100% / 3 - 20px)'};
  }
`;

export const PictureItem = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0;

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
`;
export const MorePicture = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .4);

  &:after {
    color: #fff;
    font-weight: 600;
    font-size: 2rem;
  }

  ${
          ({ total, index }) => {
            if (total > 4 && index === 3) {
              return css`
                height: 100%;
                width: 100%;

                &:after {
                  content: '+${({ total }) => total - 4}';
                }
              `;
            } else if (total > 3 && index === 2) {
              return css`
                @media screen and (max-width: 479px) {
                  height: 100%;
                  width: 100%;

                  &:after {
                    content: '+${({ total }) => total - 3}';
                  }
                }
              `;
            }
          }
  }
`;
export const DetailFilter = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 41px;
  background-color: ${({ theme }) => theme.bgFilter};
  width: 100%;
  flex-basis: 100%;
  padding-left: 10px;
  @media screen and (max-width: 991px) {
    padding-left: 2px;
  }
  @media screen and (max-width: 479px) {
    padding-left: 5px;
  }
`;
export const MobileAction = styled.div`
  display: none;
  justify-content: flex-end;
  margin-right: 10px;
  @media screen and (max-width: 767px) {
    display: flex;
  }
`;
