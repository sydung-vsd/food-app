import { ROOT_PATH } from './backend.contant';

export const PATH = {
  HOME: '/',
  STORE: '/stores',
  FOOD: '/foods',
  PROMOTION: '/promotions',
  CROWDED: '/crowded',
  FAVORITE: '/favorite',
  CART: '/cart',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT: '/forgot',
  ADMIN: '/manager',
  ADMIN_LOGIN: '/manager/login',

  PROFILE: '/profile',
  SUP_PROFILE: (sup) => {
    return `/profile/${sup}`;
  },
  PROFILE_ORDER: 'order',
  PROFILE_BOOKMARKS: 'history-bookmark',
  PROFILE_COMMENTS: 'history-comment',
  PROFILE_RATES: 'history-rating',
  PROFILE_INFO: 'user-info',
  PROFILE_CHANGE_PASSWORD: 'user-password',
  PROFILE_UPDATE: '/profile/user-info/edit',

  STORE_DETAIL: (slug, menu = '') => {
    if (menu === 'food') {
      menu = '';
    }
    return `/stores/${slug}/${menu}`;
  },
  STORE_MENU_FOOD: 'food',
  STORE_MENU_COMMENT: 'comment',
  STORE_MENU_PICTURE: 'picture',
  STORE_MENU_PROMOTION: 'promotion',
};
export const IMG_SRC = (path) => `${ROOT_PATH}${path}`;
export const DYNAMIC = (path, params, menu = '') => {
  return `${path}/:${params.join('/:')}/${menu}`;
};
