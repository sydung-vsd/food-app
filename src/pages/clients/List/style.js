import styled from 'styled-components';

export const TitleList = styled.h3`
  line-height: 46px;
  margin: 0 20px;
  font-size: 16px;
  @media screen and (max-width: 767px) {
    margin-right: 0;
  }
  @media screen and (max-width: 575px) {
    margin-left: 10px;
  }
  @media screen and (max-width: 479px) {
    margin-left: 5px;
    font-size: 14px;
  }
`;
