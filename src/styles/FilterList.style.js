import styled from 'styled-components';
import { Menu } from 'antd';
import { VscThreeBars } from 'react-icons/all';

export const Filter = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 41px;
  background-color: ${(props) => props.theme.bgFilter};
  width: 100%;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
export const PrefixFilter = styled(Menu)`
`;

export const SuffixFilter = styled.ul`
  margin: 0;
  padding: 0 5px 0 0;
  display: flex;
  justify-content: flex-end;
  flex-basis: 70%;

  & > li.sort-by-price {
    flex-basis: calc(30% - 10px);
    margin: 0 0 0 5px;

    & > div {
      min-width: 122px;
    }
  }

  & > li.sort-by-rate {
    flex-basis: calc(30% - 10px);
    margin: 0 0 0 5px;

    & > div {
      min-width: 157.094px;
    }
  }

  & > li.filer-by-tag, & > li.filer-by-category {
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

  & .mobile-filter {
    display: none;
  }

  @media screen and (max-width: 767px) {
    height: ${({ active, selectOpen }) => !active ? 0 : (selectOpen ? 'auto' : '40px')};
    overflow: ${({ active, selectOpen }) => !active ? 'hidden' : (selectOpen ? 'unset' : 'auto')};
    flex-basis: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #ececec;
    padding: ${({ active }) => active ? '4px 11px' : '0 11px'};
    transition: .3s ease;
    & .mobile-filter {
      display: block;
    }

  }
`;
export const MoreFilterIcon = styled(VscThreeBars)`
  position: absolute;
  top: 11.5px;
  right: 15px;
  font-size: 24px;
  color: #ccc;
  display: none;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
