import styled, { css } from 'styled-components';
import { Table } from 'antd';

export const ProfileWrap = styled.div`
  min-height: calc(100vh - 475px);
`;
export const ProfileSidebar = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px 0 10px 0;
  margin-top: -20px;

  & li {
    border-top: 1px solid #e7ecef;
  }
`;
export const ProfileAvatarWrap = styled.div`
  position: relative;

  & img {
    float: none;
    margin: 0 auto;
    width: 126px;
    height: 126px;
    border-radius: 50% !important;
    display: block;
    max-width: 100%;
    cursor: pointer;
  }

  & div.no-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    float: none;
    margin: 0 auto;
    width: 126px;
    height: 126px;
    border-radius: 50% !important;
    max-width: 100%;
    cursor: pointer;
    font-size: 400%;
    color: ${(props) => props.theme.rootColor};
    border: 1px solid ${(props) => props.theme.rootColor};
    background: #f6ffed;
  }

  & img:hover + svg {
    opacity: 1;
  }

  & svg {
    position: absolute;
    font-size: 250%;
    opacity: 0;
    transition: 0.4s;
    bottom: 0;
    color: #888;
    right: calc(50% - 126px / 2);
  }
`;

export const ProfileFullName = styled.div`
  text-align: center;
  margin-top: 10px;

  & > div {
    color: ${(props) => props.theme.btnPrimary};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 7px;
  }
`;
export const ProfileContent = styled.div`
  background: rgb(255, 255, 255);
  margin-top: -20px;
  min-height: 378.031px;
`;
export const ProfileEmpty = styled.div`
  position: relative;

  ${({ minHeight }) => minHeight && css`
    min-height: ${minHeight}px;
  `}
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-50%, -50%);

    & > svg, & > span > svg {
      color: #aaa;
      font-size: 500%;
      margin-bottom: 10px;
    }

    & > p {
      font-size: 20px;
    }
  }
`;
export const TableCustom = styled(Table)`
  & .ant-table-cell.order-address, .ant-table-cell.order-note {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .ant-table-row {
    cursor: pointer;
  }

  & th.ant-table-cell.order-name, td.ant-table-cell.order-name {
    padding-left: 0;
  }

  & tr.ant-table-row.ant-table-row-level-0 > td.ant-table-cell.ant-table-row-expand-icon-cell,
  & th.ant-table-cell.ant-table-row-expand-icon-cell {
    padding: 16px 8px;
  }

  & tr.ant-table-expanded-row.ant-table-expanded-row-level-1 > td.ant-table-cell {
    padding-left: 62px;
  }
`;
export const StoreTitle = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  & a {
    color: rgba(0, 0, 0, .85);
    font-weight: 700;
    display: inline-block;
    white-space: nowrap;
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const CommentTitleContent = styled.p`
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;

  & + div {
    & > span {
      display: flex;
      align-items: center;
      color: #aaa;

      & > svg {
        margin-left: 5px;
      }
    }
  }
`;
export const StoreList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
  }

  & a {
    color: rgba(0, 0, 0, .85);
    font-weight: 700;
  }
`;
export const FoodList = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    margin-left: 8px;
    color: rgba(0, 0, 0, .65);
    font-weight: 600;

    & > img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  & > div:last-child {
    display: flex;
    align-items: center;

    & > p {
      margin-bottom: 0;
      margin-right: 25px;
      font-weight: 600;

      & > span.value {
        color: ${(props) => props.theme.price};
      }
    }
  }
`;
export const OrderInfo = styled.div`
  & > p > span {
    font-weight: 600;
  }
`;
export const PaginationBox = styled.div`
  margin: 20px;
  display: flex;
  justify-content: end;
`;
export const TitleContent = styled.div`
  padding: 8px 15px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  background-color: rgb(221, 221, 221);
`;
export const UserProfile = styled.div`
  & div.user-content, div.user-profile-title {
    font-size: 14px;
    font-weight: bold;

    & > span.empty {
      color: #777;
      font-weight: 500;
    }

    & > form.only-field {
      position: relative;

      & .ant-row.ant-form-item.ant-form-item-with-help.ant-form-item-has-error,
      & .ant-row.ant-form-item.ant-form-item-has-success.ant-form-item-with-help {
        margin-bottom: 0;

        & .ant-form-item-explain {
          position: absolute;;

          & > div {
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }

    & > span {
      display: inline-block;
      padding: 12px 0;
      width: 100%;

      & > span.edit {
        position: relative;
        float: right;
        margin-right: 16px;
        font-size: 14px;
        font-weight: 300;
        color: ${(props) => props.theme.btnPrimary};
        opacity: 0;
        transition: .3s;
        cursor: pointer;

        &:hover:after {
          position: absolute;
          bottom: 2px;
          display: block;
          width: 100%;
          border-bottom: 1px solid ${(props) => props.theme.btnPrimary};
          content: '';
        }
      }
    }

    & > span:hover > span.edit {
      opacity: 1;
    }
  }


  & .user-profile-title {
    text-align: right;
  }
`;
export const RateItem = styled.div`
  ${({ isBookmark }) => isBookmark && css`
    position: relative;

    & > small {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #aaa;
      font-size: 13px;
    }
  `}

  padding: 5px;
  border: 1px solid #f0f0f0;
  margin-bottom: 15px;
  transition: .3s;

  &:hover {
    box-shadow: 0 10px 30px .2px #ddd;
  }

  & .store-image {
    float: left;
    width: 168.75px;
    height: 105.75px;
    overflow: hidden;
    margin-right: 5px;

    & > div {
      width: 100%;
      height: 100%;
      background-image: url("${({ imagePath }) => imagePath}");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  & .store-info {
    float: left;
    padding-left: 10px;
    width: ${({ isBookmark }) => isBookmark ? 'calc(100% - 173.75px)' : 'calc(100% - 342.5px)'};
    min-height: 105.75px;

    & > .store-info-name {
      ${({ isBookmark }) => isBookmark && css`
        width: calc(100% - 168.75px);
      `}
      & > a {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        font-weight: bold;
        font-size: 16px;
        color: #777;
        transition: .3s;

        &:hover {
          color: ${({ theme }) => theme.btnPrimary};
        }
      }

      & > div {
        margin-top: -6px;

        & > small {
          color: #aaa;
          font-size: 12px;
        }
      }
    }

    & > .store-info-description {
      & > p {
        font-size: 12px !important;
        color: #666;
      }

      display: flex;
      margin-left: -10px;

      & > svg {
        margin-top: 4px;
      }

      & > p {
        position: relative;
        margin-left: 5px !important;
        margin-right: -1em;
        margin-bottom: 0;
        padding-right: 1em;
        height: 40px;
        width: calc(100% - 27px) !important;
        overflow: hidden;
        line-height: 1.6em;
        text-align: justify;

        &:before {
          box-sizing: border-box;
          content: "...";
          position: absolute;
          right: 2px;
          bottom: 0;
        }

        &:after {
          box-sizing: border-box;
          position: absolute;
          right: 0;
          margin-top: 0.4em;
          height: 2.5em;
          width: 1em;
          content: "";
          background: #fff;
        }
      }
    }
  }

  & .rate-data-user {
    float: left;
    width: 168.75px;
    min-height: 105.75px;
    text-align: center;
    padding: 15px 0;

    & p {
      margin: 0;
      font-size: 16px;
      color: #aaa;

      & + span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        color: ${({ theme }) => theme.btnPrimary};

        & > svg {
          color: ${({ theme }) => theme.star};
        }
      }
    }

    & small {
      color: #aaa;
      font-size: 13px;
    }
  }

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;
export const InfoLine = styled.div`
  display: flex;
  font-size: ${({ fSize }) => fSize}px;
  align-items: center;
  margin: 0 0 0 -10px;

  & > span {
    flex-basis: 15px;
    display: flex;
    align-items: center;
  }

  & > p {
    margin: 0;
    flex-basis: calc(100% - 25px);
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
export const ControlWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  @media screen and (max-width: 479px) {
    flex-direction: column;
    gap: 8px;
    justify-self: flex-end;
    & > div, & > label {
      align-self: flex-end;
    }
  }
`;
export const BtnUploadAvatar = styled.label`
  margin-left: 8px;
  display: none;
  line-height: 1.5715;
  position: relative;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  border: 1px solid #d9d9d9;
  box-shadow: unset;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  background: #fff;
  @media screen and (max-width: 991px) {
    display: flex;
  }
`;
