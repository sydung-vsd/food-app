import styled from 'styled-components';

export const CarouselItem = styled.div`
  position: relative;
  min-height: 500px;
  background: #d4d5da !important;

  & > div {
    & > img {
      position: absolute;
      top: 50%;
      max-width: 100%;
      height: 500px;
      width: 100%;
      max-height: 500px;
      border-style: none;
      vertical-align: middle;
      transform: translateY(-50%);
    }

    & > div.info {
      position: absolute;
      top: auto;
      left: 0;
      bottom: 0;
      padding: 10px;
      width: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.6);
      box-sizing: border-box;

      & div.imgbox-food-name {
        margin-bottom: 3px;
        font-size: 16px;
        font-weight: bold;
      }

      & div.imgbox-desc {
        font-weight: 300;
      }

      & div.imgbox-total {
        font-size: 11px;
        color: #ccc;

        & > span.txt-bold {
          font-weight: 700 !important;
        }
      }

      & div.imgbox-current-price {
        text-align: right;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
`;
export const NextArrowButtonWrap = styled.div`
  position: absolute;
  right: 0;
  top: 46%;
  left: auto;
  z-index: 100;
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  align-items: center;
  width: 50px;
  height: 60px;
  overflow: hidden;
  transform: translateY(-50%);
`;
export const NextArrowButton = styled.button`
  position: relative;
  flex-basis: 100%;
  padding: 0;
  height: 50px;
  width: 50px;
  border: 0;
  border-radius: 50%;
  border-left: 1px solid #444;
  background: rgba(204, 204, 204, 0.8);
  box-shadow: 0 0 10px 1px #898989;
  transform: translateX(50%);
  cursor: pointer;
  outline: none;

  & > svg {
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-40%, -50%);
  }
`;
export const PrevArrowButtonWrap = styled.div`
  position: absolute;
  right: auto;
  top: 46%;
  left: 0;
  z-index: 100;
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  width: 50px;
  height: 60px;
  overflow: hidden;
  align-items: center;
  transform: translateY(-50%);
`;
export const PrevArrowButton = styled.button`
  position: relative;
  flex-basis: 100%;
  height: 50px;
  border-radius: 50%;
  border: 0;
  border-right: 1px solid #444;
  transform: translateX(-50%);
  outline: none;
  background: rgba(204, 204, 204, 0.8);
  box-shadow: 0 0 10px 1px #898989;
  cursor: pointer;

  & > svg {
    position: absolute;
    top: 50%;
    right: 25%;
    transform: translate(40%, -50%);
  }
`;
