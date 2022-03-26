import styled from 'styled-components';

export const BackGround = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  width: auto;
  @media screen and (max-width: 1199px) {
    width: 50vw;
  }
  @media screen and (max-width: 991px) {
    width: 50vw;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  width: 100vw;
  height: 100vh;
  padding: 0 2rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    grid-gap: 0;
  }
`;
export const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > a {
    display: block;
  }

  @media screen and (max-width: 767px) {
    justify-content: flex-start;
  }
`;
export const LogoImg = styled.img`
  width: 80%;
  height: auto;

  & + h1 {
    width: 80%;
    text-align: center;
    margin-top: -15%;
    font-family: "Poppins", sans-serif !important;
    color: #fff;
    font-size: 500%;
    font-weight: 800;
  }

  @media screen and (max-width: 1199px) {
    width: 100%;
    & + h1 {
      width: 100%;
    }
  }
  @media screen and (max-width: 991px) {
    width: 120%;
    & + h1 {
      width: 120%;
      font-size: 400%;
    }
  }
  @media screen and (max-width: 767px) {
    display: none;
    & + h1 {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      background: #fff;
      font-size: 300%;
      box-shadow: 0 2px 8px 0 rgb(99 99 99 / 20%);
      text-align: left;
      padding-left: 20px;
      color: ${(props) => props.theme.rootColor};
      margin-top: 0;
    }
  }
`;
export const FormWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding-top: 68px;
  @media screen and (max-width: 767px) {
    flex-basis: 100%;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    & > form {
      width: calc(100% - 2rem) !important;
      overflow: hidden;
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
