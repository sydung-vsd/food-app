import styled from 'styled-components';
import { Affix } from 'antd';

export const Section = styled.section`
  background-color: rgb(238, 238, 238);
  padding: 50px 20px;
`;
export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1140px;
`;

export const MenuList = styled(Affix)`
  @media screen and (max-width: 767px) {
    & .ant-affix {
      top: 116.781px !important;
    }

    & ul.ant-menu {
      display: flex;

      & > li.ant-menu-item {
        padding: 0 !important;
        height: 50px;
        line-height: 50px;
        text-align: center;

        & > .ant-menu-item-icon {
          display: none;
        }

        &:after {
          width: 100%;
          bottom: 0;
          border-right: 0;
          border-bottom: 2px solid #29d197;
          right: 0 !important;
          left: 0 !important;
        }
      }
    }
  }
  @media screen and (max-width: 479px) {
    & .ant-affix {
      top: 102.781px !important;
    }

    & ul.ant-menu {
      & > li.ant-menu-item {
        height: 40px;
        line-height: 40px;

        & .ant-menu-title-content {
          font-size: 12px;
        }
      }
    }
`;

export const AffixFilter = styled(Affix)`
  & .ant-affix {
    z-index: 3;
  }

  @media screen and (max-width: 767px) {
    & .ant-affix {
      top: 166.781px !important;
    }
  }
  @media screen and (max-width: 479px) {
    & .ant-affix {
      top: 142.781px !important;
    }
  }
`;
