import { PATH } from './path.contant';

export const PAGE_TITLE = {
  [PATH.LOGIN]: 'Đăng nhập',
  [PATH.REGISTER]: 'Đăng ký',
  [PATH.HOME]: 'Trang chủ',

  [PATH.STORE]: 'Cửa hàng',
  [PATH.CROWDED]: 'Đông khách',
  [PATH.FOOD]: 'Món ăn',
  [PATH.PROMOTION]: 'Khuyến mãi',
  [PATH.FAVORITE]: 'Món ăn đã thích',


  [PATH.CART]: 'Giỏ hàng',

  [PATH.PROFILE]: 'Quản lý tài khoản',

  STORE_DETAIL: 'Thông tin cửa hàng',
  ORDERS: 'Lịch sử giao dịch',
  BOOKMARKS: 'Bộ sưu tập',
  COMMENTS: 'Lịch sử bình luận',
  RATES: 'Lịch sử đánh giá',
  USER_INFO: 'Thông tin tài khoản',
  CHANGE_PASSWORD: 'Đổi mật khẩu',
  USER_UPDATE: 'Cập nhật tài khoản',
};
const PREFIX = (title, custom = 'FreshFood') => {
  return `${custom} | ${title}`;
};
export const TITLE = (title, suffix = false, isDefault = true, prefix = true) => {
  if (isDefault) {
    title = PAGE_TITLE[title];
  }
  if (prefix) {
    if (suffix) {
      title = PREFIX(suffix, title);
    } else {
      title = PREFIX(title);
    }
  }
  return title;
};
