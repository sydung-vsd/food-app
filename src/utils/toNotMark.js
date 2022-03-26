const toNotMark = (str) => {
  return str.toLowerCase().trim()
    .replaceAll(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    .replaceAll(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    .replaceAll(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    .replaceAll(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    .replaceAll(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    .replaceAll(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    .replaceAll(/(đ)/g, 'd')
    .replaceAll('&*#39', '')
    .replaceAll(' ', '-');
};

export default toNotMark;