import styled from 'styled-components';

export const MsgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  @media screen and (max-width: 479px) {
    width: 85vw;
  }
`;
export const CartInfo = styled.div`
  width: 70%;
  color: #777;
  font-weight: 700;
  display: flex;
  align-items: center;
`;
export const FoodImage = styled.img`
  margin-right: 10px;
  width: 64px;
  height: 64px;
`;
export const InfoWarp = styled.div`
  text-align: left;
  flex-basis: calc(100% - 74px);
  overflow: hidden;

  & > h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > p {
    margin: 0;
    color: #f5222d;

    & > span:first-child {
      color: #777;
    }
  }
`;
