import styled from 'styled-components';

export const NotFoundWrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-70%, -50%);

    & > svg {
      font-size: 800%;
      color: #e8a82b;
    }

    & > h2 {
      font-size: 400%;
      color: #aaa;
    }

    & > button {
      width: 40%;
      font-weight: bold;
      font-size: 200%;
      height: auto;
    }
  }
`;
