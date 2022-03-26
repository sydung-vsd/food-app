import styled from 'styled-components';
import { Link } from 'react-router-dom';

import bgIntroduce from '../../../../../assets/images/bg4.jpg';

export const Introduce = styled.section`
  margin-bottom: 80px;
  padding: 0;
  background-size: 1900px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(26, 38, 92, 0.6), rgba(26, 38, 92, 0.6)), url(${bgIntroduce});

  & > div {
    position: relative;
    margin: 0 auto;
    padding: 50px 20px 80px;
    max-width: 1430px;
    color: #fff;
    font-size: 16px;

    & h2 {
      color: #fff;
      font-size: 200%;

      & > span {
        color: ${(props) => props.theme.rootColor};
      }
    }

    & ul {
      list-style: none;

      & > li {
        padding: 0.5rem 0;

        & > svg {
          color: ${(props) => props.theme.rootColor};
          margin-right: 5px;
        }
      }
    }

    & > div.list {
      position: absolute;
      left: 50%;
      min-width: 800px;
      bottom: 0;
      transform: translate(-50%, 50%);
    }
  }

  @media screen and (max-width: 767px) {
    & > div {
      padding: 20px 20px 50px;

      & .ant-col.listed-header {

        & > h2 {
          margin: 0;
          font-size: 150%;

          & + p.note-store {
            display: none;
          }
        }

        & > ul {
          padding-left: 10px;

          & > li {
            padding: 4px;
          }
        }
      }

      & > .list {
        width: 80%;
        min-width: auto !important;
        transform: translateX(-50%);
      }
    }
  }
  @media screen and (max-width: 575px) {
    & > div {
      padding: 20px 20px 0;
      margin-bottom: 150px;

      & .ant-col.listed-header {

        & > h2 {
          font-size: 140%;
          text-align: center;

        }


        & > ul {
          padding-left: 40px;

          & > li {
            padding: 4px;
          }
        }
      }

      & > .list {
        width: 100%;
        top: 100%;
        min-width: 100%;

      }
    }

  }
  @media screen and (max-width: 479px) {
    & > div {
      margin: 0;
    }
  }
`;
export const IntroduceLink = styled(Link)`
  & > figure {
    position: relative;
    z-index: 4;
    padding: 30px 10px 0 10px;
    margin: 0;
    width: 100%;
    min-width: 200px;
    height: 100%;
    border-right: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
    border-bottom: 5px solid ${({ color }) => color};
    text-align: center;
    background-color: #fcfcfc;

    & > figcaption {
      color: black;

      & > p:first-child {
        font-size: 200%;
        font-weight: bold;
        margin: 0;
        color: ${(props) => props.theme.rootColor};
      }
    }

    & > svg {
      font-size: 250%;
      color: ${({ color }) => color};
    }

    & + span {
      position: absolute;
      top: 90%;
      left: 43%;
      z-index: 3;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      content: "";
      background-color: ${({ color }) => color};
    }
  }

  &:hover {
    & > figure {
      border-right: 1px solid ${({ color }) => color};
      border-left: 1px solid ${({ color }) => color};
      transition: 0.4s;
      background-color: ${({ color }) => color};
      transform: translateY(20px);

      & > svg {
        color: #fff;
      }

      & > figcaption {
        color: #fff;
      }

      & + span {
        transition: 0.4s;
        top: calc(90% + 20px);
      }
    }
  }

  @media screen and (max-width: 767px) {
    & > figure {
      padding: 10px 10px 0 10px;
      margin: 0;
      width: 100%;
      min-width: auto;
      height: auto;

      & > figcaption {
        & > p:first-child {
          font-size: 150%;
        }

        & > p:last-child {
          font-size: 90%;
          margin: 0 -10px 1em -10px;
        }
      }
    }
  }
  @media screen and (max-width: 479px) {
    & > figure {
      padding: 10px 10px 20px 10px;
      width: 100%;
      min-width: auto;
      height: auto;

      & > svg {
        font-size: 150%;
      }

      & > figcaption {
        & > p:first-child {
          font-size: 125%;
        }

        & > p.list-name {
          display: none;
        }
      }

      & + span {
        top: 100%;
        left: 50%;
        width: 20px;
        height: 20px;
        transform: translate(-50%, -50%);
      }
    }
  }
`;
