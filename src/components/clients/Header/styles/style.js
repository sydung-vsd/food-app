import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Menu, Select } from 'antd';

export const TopBar = styled.div`
  padding: 7px;
  background-color: ${(props) => props.theme.supColor1};
  font-size: 14px;
  @media screen and (max-width: 921px) {
    font-size: 12px;
  }

  & > div {
    display: flex;
    justify-content: space-between;

    max-width: 1140px;

    margin: 0 auto;

    & > ul {
      display: flex;
      align-items: center;

      margin: 0;

      & > li {
        margin-right: 30px;

        & > a {
          color: ${(props) => props.theme.gray};
        }

        & > a > svg,
        & > a > span {
          color: ${(props) => props.theme.rootColor};
          margin-right: 5px;
        }

        &:hover > a > svg,
        &:hover > a > span {
          transition: 0.4s;
          transform: scale(1.2);
        }

      }
    }

    & > div {
      display: flex;
      align-items: center;

      & > p {
        color: ${(props) => props.theme.gray};
        margin: 0 15px 0 0;
        font-weight: bold;
      }

      & > div {
        margin-right: 5px;
        width: 37px;
        height: 37px;

        & > a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        &.facebook > a {
          color: ${(props) => props.theme.facebook};
          background-color: ${(props) => props.theme.facebook1};
        }

        &.google > a {
          color: ${(props) => props.theme.google};
          background-color: ${(props) => props.theme.google1};
        }

        &.skype > a {
          color: ${(props) => props.theme.skype};
          background-color: ${(props) => props.theme.skype1};
        }

        &:hover > svg {
          transition: 0.4s;
          transform: scale(1.2);
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const Header = styled.header`
  z-index: 99;

  width: 100%;

  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgb(99 99 99 / 20%);

  @media screen and (max-width: 767px) {
    position: relative;
  }


`;

export const MenuWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1140px;

  margin: auto;
  padding: 1.5rem 0;
  @media screen and (max-width: 767px) {
    padding: 0.5rem 1.75rem;
  }
  @media screen and (max-width: 479px) {
    padding: 0.5rem 1rem;
    & > .ant-space.ant-space-horizontal.ant-space-align-center {
      gap: 12px !important;
    }
  }
`;

export const Logo = styled(Link)`
  font-family: "Poppins", sans-serif !important;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 900;
  color: ${(props) => props.theme.rootColor};

  &:hover {
    color: ${(props) => props.theme.rootColor};
  }

  @media screen and (max-width: 479px) {
    font-size: 1.8rem;
  }
`;
export const SearchWrap = styled.div`
  flex-basis: 60%;
  border: 2px solid ${(props) => props.theme.rootColor};
  border-radius: 6px;
  overflow: hidden;

  & .ant-input-group-addon {
    width: 15%;
    padding: 0;
    border: 0;
    border-right: 1px solid #ccc;

    & .ant-select-selection-item {
      color: #777 !important;
    }
  }

  & .ant-select-selector {
    border: 0 !important;
    font-size: 13px;
  }

  & .ant-input-affix-wrapper {
    border: 0 !important;
    padding: 0;

    & .ant-input {
      padding: 4px 11px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 767px) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100vw;
    background: #f0f0f0;
    padding: 8px;
    border: 0;
    border-radius: 0;
    & > form {
      width: 87%;
      margin: 0 6.5%;
      border: 1px solid ${(props) => props.theme.rootColor};
      border-radius: 6px;
      overflow: hidden;

      & .ant-input-group-addon {
        width: 20%;

        & .ant-select-selection-item {
          color: #777 !important;
        }
      }
    }
  }
  @media screen and (max-width: 575px) {
    & > form {
      width: 95%;
      margin: 0 2.5%;

      & .ant-input-group-addon {
        width: 23%;
      }
    }
  }
  @media screen and (max-width: 479px) {
    & .ant-input-group-addon {
      width: 15% !important;
    }
  }
`;
export const SearchBtn = styled.button`
  background-image: linear-gradient(to right, #6adcb3, #29d197, #6adcb3);
  background-size: 200%;
  border: 0;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  padding: 4px 16px 4px 11px;
  height: auto;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-position: right !important;
  }

  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
  @media screen and (max-width: 575px) {
    & > span:last-child {
      display: none;
    }
  }
`;
export const FormGroup = styled.div`
  position: relative;
`;
export const InputSearch = styled.input`
  padding: 1rem;
  width: 100%;
  border-radius: 5px;
  border: none;
  font-size: 150%;
  outline: none;
  background: #fff;
  box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
`;
export const IconSearch = styled(SearchOutlined)`
  position: absolute;
  top: 50%;
  right: 0.75rem;

  font-size: 1.5rem;
  color: #777;
  transform: translateY(-50%);
`;
export const CartBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ccc;
  color: #777;
  border-radius: 4px;
  height: 45px;
  width: 45px;
  text-align: center;
  cursor: pointer;
  transition: .3s;

  ${(props) => props.disabled && css`
    cursor: default !important;
    color: #777;
    background-color: #ddd;
  `}
  & > span:first-child {
    font-size: 20px;
  }

  & > span:last-child {
    font-size: 10px;
  }

  &:hover {
    color: #444;
    border: 1px solid #aaa;

  }

  @media screen and (max-width: 479px) {
    height: 35px;
    width: 35px;
    & .text {
      display: none;
    }
  }
`;
export const UserAvatar = styled(Avatar)`
  background-color: rgba(15, 157, 88, 0.1);
  border-color: rgba(15, 157, 88, 0.1);
  box-shadow: 0 0 5px 0 rgb(15 157 88 / 30%);
  color: ${(props) => props.theme.rootColor};
  @media screen and (max-width: 479px) {
    height: 35px;
    width: 35px;
    line-height: 35px;
    & .anticon.anticon-user{
      font-size: 20px;
    }
  }
`;

export const SearchType = styled(Select)`
  width: 100%;

  & .ant-select-selection-item {
    color: black !important;
  }

  & .search-icon {
    display: none;
  }

  @media screen and (max-width: 479px) {
    & .search-icon {
      display: inline-block !important;
    }

    & .search-text {
      display: none;
    }
  }
`;
export const UserMenu = styled(Menu)`
  top: 35px;
  width: 250px;
  @media screen and (max-width: 767px) {
    top: 25px;
    right: -23px;
  }
`;