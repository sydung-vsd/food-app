import styled from 'styled-components';
import Search from 'antd/es/input/Search';

export const Header = styled.header`
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 71px;
  border-bottom: 1px solid #e9ecef !important;
  box-shadow: 0 0 3px rgb(52 58 64 / 15%);
  background: #fff;
`;
export const Flex = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: space-between;
`;
export const SearchForm = styled(Search)`
  width: 400px;
`;
