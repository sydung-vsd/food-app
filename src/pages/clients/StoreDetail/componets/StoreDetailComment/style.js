import styled from 'styled-components';

export const CommentWrap = styled.div`
  background-color: #fff;
  margin-top: 10px;
  border-radius: 4px;
`;
export const CommentHeader = styled.div`
  border-bottom: 1px solid #f6f6f6;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;

  & small {
    display: flex;
    align-items: center;
    font-size: 11px;
    color: #666;
    margin-right: 20px;
  }
`;
export const AvatarWrap = styled.div`
  display: flex;
  align-items: center;

  & h5 {
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 0 10px;
  }
`;
export const CommentContent = styled.div`
  padding: 10px;

  & p {
    font-size: 16px;
    margin: 0;
  }
`;
