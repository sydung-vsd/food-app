import styled, { css, keyframes } from 'styled-components';
import { Button, Card, Skeleton, Space } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, FcLike } from 'react-icons/all';

export const CardImage = styled.div`
  height: 230px;
  border-radius: 4px 4px 0 0;
  background-image: url(${({ avatar }) => avatar});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.3s ease;
  @media screen and (max-width: 767px) {
    height: 160px;
  }
`;
export const AddCard = styled(Button)`
  position: absolute;
  right: 10px;
  top: 20%;

  &:hover {
    & > span {
      transition: 0.4s ease;
      transform: scale(1.2);
    }
  }

  @media screen and (max-width: 767px) {
    top: 10px;
    right: 3px;
    padding: 0 10px;
  }
`;
export const AfterPrice = styled.span`
  color: ${(props) => props.theme.price};
  font-size: 1.5rem;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
export const CardItem = styled(Card)`
  max-height: 347px;
  border-radius: 4px;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    height: 250px;
    & .ant-card-body {
      padding: 10px 5px 0 !important;
    }
  }
`;
export const FoodTitle = styled.h3`
  margin-bottom: 0;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    font-size: 16px;
    max-width: 75%;
  }
`;
export const FoodStoreWrap = styled(Link)`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #aaa;
  @media screen and (max-width: 767px) {
    font-size: 14px;
    margin-top: -5px;
  }
`;
export const Price = styled.span`
  color: #888;
  text-decoration: line-through;
  font-size: 1.2rem;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;
export const StoreName = styled.small`
  color: #aaa;
  transition: 0.4s;

  &:hover {
    color: ${(props) => props.theme.btnPrimary};
  }
`;
export const FoodStore = styled.div`
  position: relative;
  margin: 0 10px 10px 15px;
  padding-bottom: 10px;
  height: 70px;
  border-bottom: #f5f5f5 1px solid;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  @media screen and (max-width: 479px) {
    margin: 0 5px 0 5px;
  }
`;
export const FoodStoreAvatar = styled.div`
  float: left;
  width: 60px;

  & > img,
  & > svg {
    position: relative;
    display: block;
    height: 60px;
    width: 60px;
    border-radius: 2px;
    border: 0;
    aspect-ratio: auto 60 / 60;
  }

  & > svg {
    color: #bfbfbf;
  }
`;
export const FoodStoreItemRight = styled.div`
  float: left;
  max-width: 80%;
  width: calc(100% - 76px);
  margin-left: 16px;
  line-height: 2em;
  @media screen and (max-width: 479px) {
    margin-left: 5px;
  }
`;
export const FoodStoreTitle = styled.div`
  max-width: 75%;
  max-height: 40px;
  color: #464646;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 479px) {
    max-width: 70%;
  }
`;
export const FoodStoreDescription = styled.div`
  margin: 0;
  width: 75%;
  line-height: 2em;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 479px) {
    width: 70%;
  }
`;
export const TotalOrder = styled.span`
  margin: 0;
  font-size: 12px;
  color: ${(props) => props.theme.supGray};
`;
export const FoodStorePrice = styled.div`
  position: absolute;
  bottom: 20px;
  right: 0;
  z-index: 2;

  & > .price-discount {
    height: 20px;
    color: ${(props) => props.theme.gray};
    font-size: 14px;
    text-decoration: line-through;
  }

  & > .price {
    color: ${(props) => props.theme.priceBlue};
    font-size: 16px;
    font-weight: 700;
  }

  & > .btn-adding {
    display: inline-block;
    padding-top: 3px;
    margin-left: 10px;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    text-align: center;
    line-height: 1.75rem;
    font-size: 1rem;
    color: #fff;
    font-weight: 700;
    background-color: ${(props) => props.theme.btnDanger};
    cursor: pointer !important;
    outline: 0;
    transition: .3s;

    &:hover {
      background-color: #e01423;

      & > svg {
        transition: .3s;
        transform: scale(1.1);
      }
    }
  }

  @media screen and (max-width: 479px) {
    & .price-discount {
      font-size: 13px;
    }

    & .price {
      font-size: 14px;
    }

    & .btn-adding {
      margin-left: 5px;
    }
  }
`;
export const SkeletonCustom = styled(Skeleton)`
  & h3 {
    margin-top: 0 !important;
  }

  & ul {
    margin-top: 0 !important;

    & > li:nth-child(2) {
      margin-top: 10px !important;
    }
  }
`;
const likeIcon = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
const likeStyle = css`
  color: ${(props) => props.theme.price};

  &:hover {
    transform: scale(1.2);
    opacity: 0.6;
  }

  animation-name: ${likeIcon};
  animation-duration: .5s;
  animation-direction: normal;
`;
export const Like = styled(FcLike)`
  ${likeStyle}
`;
export const UnLike = styled(AiOutlineHeart)`
  ${likeStyle}
`;
export const PriceBox = styled(Space)`
  position: relative;
  width: 100%;
  margin-top: -5px;
`;
export const LikeBtn = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 150%;

  @media screen and (max-width: 767px) {
    top: -2px;
    right: 0;
  }
`;
