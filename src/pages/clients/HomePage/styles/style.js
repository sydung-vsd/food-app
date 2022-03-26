import styled from 'styled-components';
import { Affix, Button, Carousel } from 'antd';

import bgInvite from '../../../../assets/images/bg5.jpg';

export const TilteDiv = styled.div`
  position: relative;
  width: 10%;
  margin: 0 45%;
`;
export const TitleFirstSpan = styled.span`
  position: absolute;
  right: 54%;
  display: block;
  width: 30%;
  border-top: 1px dashed #ccc;
  content: "";

  &:after {
    position: absolute;
    top: -5px;
    right: -8%;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    content: "";
    background-color: #ccc;
  }
`;
export const TitleLastSpan = styled.span`
  position: absolute;
  left: 54%;
  display: block;
  width: 30%;
  border-top: 1px dashed #ccc;
  content: "";

  &:after {
    position: absolute;
    top: -5px;
    left: -8%;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    content: "";
    background-color: #ccc;
  }
`;
export const TitleWrap = styled.div`
  text-align: center;
`;
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;
// heading
export const Heading = styled.section`
  min-height: 500px;
  position: relative;

  @media screen and (max-width: 767px) {
    height: 300px;
    overflow: hidden;
  }
  @media screen and (max-width: 479px) {
    min-height: 250px;
    height: 250px;
    margin-top: 54px;
  }
`;
export const HeadingCarousel = styled(Carousel)`
  height: 600px;
  overflow: hidden;
`;
export const CarouselItem = styled.img`
  max-width: 100%;
  height: auto;
`;
export const Slogan = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 50%;
  text-align: left;
  transform: translate(-100%, -70%);

  @media screen and (max-width: 921px) {
    transform: translate(-85%, -60%);
  }
  @media screen and (max-width: 767px) {
    transform: translate(-75%, -50%);
  }
  @media screen and (max-width: 479px) {
    max-width: 80%;
    transform: translate(-80%, -70%);
  }
`;

export const SloganTitle = styled.h1`
  margin-bottom: 0;
  font-weight: 700;
  font-size: 7rem;
  color: ${(props) => props.theme.rootColor};
  text-align: left;
  @media screen and (max-width: 767px) {
    font-size: 5rem;
  }
  @media screen and (max-width: 479px) {
    font-size: 2rem;
  }
`;
export const SloganDescription = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.gray};
  @media screen and (max-width: 479px) {
    font-size: 1rem;
  }
`;

export const SloganBtn = styled.button`
  padding: 1rem 5rem;
  outline: 0;
  background-color: unset;
  border: 0.125rem solid ${(props) => props.theme.rootColor};
  border-radius: 2.5rem;
  color: ${(props) => props.theme.rootColor};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  transition: 0.3s ease-in-out;

  &:hover {
    border-color: ${(props) => props.theme.supColor2};
    color: ${(props) => props.theme.supColor2};
  }

  @media screen and (max-width: 767px) {
    padding: .75rem 3rem;
  }
  @media screen and (max-width: 479px) {
    padding: .5rem 2rem;
    font-size: 1rem;
  }
`;
export const Section = styled.section`
  padding: 50px 20px;
  @media screen and (max-width: 767px) {
    padding: 30px 20px;
  }
`;
export const SectionContainer = styled.div`
  width: 100%;
  max-width: 1430px;
  margin: 2rem auto 1rem;
  @media screen and (max-width: 767px) {
    & .filter-food-by-tags {
      display: none;
    }
  }
`;
export const Invite = styled.section`
  padding: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(26, 38, 92, 0.6), rgba(26, 38, 92, 0.6)), url(${bgInvite});

  & > div {
    margin: 0 auto;
    padding: 50px 0 80px;
    max-width: 1430px;
    text-align: center;
    color: #fff;

    & h2 {
      color: #fff;
      font-size: 350%;
      text-transform: uppercase;

      & > b {
        color: ${(props) => props.theme.rootColor};
      }
    }

    & p {
      font-size: 200%;
      margin-bottom: 0;

      & > b {
        color: ${(props) => props.theme.rootColor};
      }
    }

    & p.invite {
      font-size: 150%;
      color: #ccc;
      margin-bottom: 1rem;

      & > b {
        text-transform: uppercase;
      }
    }
  }

  @media screen and (max-width: 767px) {
    & > div {
      padding: 40px 0;

      & .ant-col {

        & h2 {
          font-size: 300%;
          margin-bottom: 0;
        }

        & p {
          font-size: 150%;
        }

        & p.invite {
          font-size: 130%;
        }
      }
    }
  }
  @media screen and (max-width: 479px) {
    & > div {

      & .ant-col {

        & h2 {
          font-size: 250%;
        }
      }
    }
  }
`;
export const BtnInvite = styled.button`
  padding: 1rem 5rem;
  border: 0.125rem solid ${(props) => props.theme.rootColor};
  border-radius: 2.5rem;
  outline: 0;
  background-color: unset;
  color: ${(props) => props.theme.rootColor};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.rootColor};
    color: #fff;
  }

  @media screen and (max-width: 767px) {
    padding: 1rem 3rem;
  }
  @media screen and (max-width: 479px) {
    padding: .75rem 2rem;
  }
`;

export const AffixIndex = styled(Affix)`
  & .ant-affix {
    z-index: 1;
  }

  @media screen and (max-width: 767px) {
    & .ant-affix {
      top: 116.781px !important;
    }
  }
  @media screen and (max-width: 479px) {
    & .ant-affix {
      top: 102.781px !important;
    }
  }
`;
export const ButtonCustom = styled(Button)`
  width: 100%;
`;
