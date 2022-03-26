export const MSG_ERROR = (message) => {
  return `${message} thất bại!`;
};
export const MSG_SUCCESS = (message) => {
  return `${message} thành công!`;
};
export const MSG = {
  LOGIN: 'Đăng nhập',
  REGISTER: 'Đăng ký',
  UPDATE_EMAIL: 'Cập nhật email',
  UPDATE_NUMBER_PHONE: 'Cập nhập số điện thoại',
  UPDATE_FULL_NAME: 'Cập nhập họ tên',
  UPDATE_AVATAR: 'Cập nhập ảnh đại diện',
  UPDATE_USER: 'Cập nhật',
  CHANGE_PASSWORD: 'Đổi mật khẩu',
  ORDER: 'Đặt hàng',
  VALIDATE_LOGIN_INVALID: 'Email hoặc mật khẩu không đúng!',
  VALIDATE_EMAIL_EXIST: 'Email dẫ tồn tại!',
  VALIDATE_NOT_IMAGE: 'Định dạng file phải là ảnh!',
  VALIDATE_IMAGE_SIZE: 'Dung lượng ảnh tối đa 2Mb!',
};