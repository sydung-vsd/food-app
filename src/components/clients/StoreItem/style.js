import styled from 'styled-components';
import { Card } from 'antd';

const { Meta } = Card;

export const CardItem = styled(Card)`
  border-radius: 4px;
`;
export const StoreImage = styled.div`
  height: 141px;
  max-width: 226px;
  border-radius: 4px 4px 0 0;
  background-image: url(${({ avatar }) => avatar});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.3s ease;
`;
export const StoreInfo = styled.div`
  padding: 0 0 10px 0;
  height: 55px;
  box-sizing: border-box;
  line-height: 1.4em;
  overflow: hidden;
  @media screen and (min-width: 767px) {
    padding-bottom: 0;
  }
`;
export const StoreNameInfo = styled.div`
  display: block;
  padding: 0 0 3px;
  font-weight: 700;
  white-space: nowrap;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline !important;
  }
`;
export const StoreAddress = styled.div`
  display: block;
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const StoreCommentWrap = styled(Meta)`
  padding: 10px 0;
  clear: both;
  border-top: #f6f6f6 1px solid;
  overflow: hidden;
  @media screen and (min-width: 767px) {
    padding: 0;
    & .ant-card-meta-avatar {
      padding-right: 0 !important;
    }
  }
`;
export const StoreComment = styled.div`
  position: relative;
  float: left !important;
  margin-left: 5px !important;
  margin-right: -1em;
  padding-right: 1em;
  height: 32px;
  width: 150px !important;
  color: #666;
  overflow: hidden;
  line-height: 1.4em;
  font-size: 12px;
  text-align: justify;

  &:after {
    position: absolute;
    right: 0;
    margin-top: 0.2em;
    height: 2.1em;
    width: 1em;
    content: "";
    background: #fff;
  }

  &:before {
    content: "...";
    position: absolute;
    right: 2px;
    bottom: 0;
  }

  @media screen and (max-width: 767px) {
    font-size: 10px;
    height: 25px;
    width: 100% !important;
    &:before {
      bottom: -5px;
    }
    &:after {
      margin-top: 0.5em;
    }
  }
`;
export const StoreCommentName = styled.b`
  display: inline-block;
  color: #222;
  text-align: left;
`;
export const StoreCommentDoc = styled.span`
  color: #333;
  outline: 0;
`;
export const StoreStatistical = styled.div`
  padding-top: 10px;
  border-top: #f8f8f8 1px solid;
  color: #888;
  clear: both;
  overflow: hidden;
  font-size: 12px;

  & > div {
    position: relative;
    display: flex;
    color: #777;

    & > div {
      display: flex;
      align-items: center;
      margin-right: 10px;

      & > svg {
        margin-right: 3px;
      }

      & > span {
        font-weight: 300;
      }

      &:hover {
        color: #111;
      }
    }

    & > div:nth-child(3) > svg {
      color: orange;
    }

    & > span {
      position: absolute;
      top: 50%;
      right: 0;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      margin: -3px 0;
      border-radius: 2px;
      background: #ddd;
      transform: translateY(-50%);

      &:hover {
        background: #ccc;
      }
    }
  }
`;
