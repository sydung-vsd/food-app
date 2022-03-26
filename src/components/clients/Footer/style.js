import styled from 'styled-components';

export const FooterWrap = styled.footer`
  position: relative;
  z-index: 100;
  padding: 0 20px;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.gray};
  font-size: 130%;

  & > div {
    max-width: 1140px;
    padding: 50px 0 30px 0;
    margin: 0 auto;
    @media screen and (max-width: 767px) {
      padding: 15px;
      & .ant-col.ant-col-8 {
        padding: 0;
      }
    }
  }

  & h4 {
    margin-bottom: 16px;
    font-size: 130%;
    font-weight: bold;
    color: ${(props) => props.theme.gray};
  }

  @media screen and (max-width: 575px) {
    display: none;
  }
`;
export const AboutFooter = styled.footer`
  & > div {
    display: flex;
    align-items: center;

    & > div {
      margin-right: 5px;
      width: 37px;
      height: 37px;
      cursor: pointer;

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
`;
export const Subscribe = styled.div`
  & > ul {
    padding-left: 0;

    & > li > a {
      color: #595959;
    }
  }
`;
export const GetInTouch = styled.div`
  & > ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
    color: ${(props) => props.theme.gray};

    & > li {
      margin: 0 30px 10px 0;

      & > a {
        color: ${(props) => props.theme.gray};
      }

      &:hover > a > svg,
      &:hover > a > span {
        transition: 0.4s;
        transform: scale(1.2);
      }

      & > a > svg,
      & > a > span {
        color: ${(props) => props.theme.rootColor};
        margin-right: 5px;
      }
    }
  }
`;
export const Copyright = styled.div`
  position: relative;
  z-index: 100;
  padding: 10px 0;
  background-color: ${(props) => props.theme.supColor1};
  text-align: center;
  color: ${(props) => props.theme.gray};
  font-size: 14px;

  & > span {
    color: ${(props) => props.theme.gray};
    font-weight: bold;
  }
`;
