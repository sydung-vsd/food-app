import { createReducer } from '@reduxjs/toolkit';
import { CART_ACTION, FAILURE, ORDER_ACTION, REQUEST, SUCCESS, USER_ACTION } from '../constants';

const initialState = {
  cartList: {
    data: [],
    load: false,
    error: null,
  },
  totalMoney: 0,
  total: 0,
};

const cartReducer = createReducer(initialState, {

  [REQUEST(CART_ACTION.GET_CART_LIST)]: (state) => {
    return {
      ...state,
      cartList: {
        ...state.cartList,
        load: true,
        error: null,
      },
    };
  },
  [SUCCESS(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    const { cartList, total, totalMoney } = action.payload.data;
    return {
      ...state,
      cartList: {
        data: cartList,
        load: false,
        error: null,
      },
      total,
      totalMoney,
    };
  },
  [FAILURE(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        load: false,
        error,
      },
    };
  },


  [REQUEST(CART_ACTION.UPDATE_CART)]: (state, action) => {
    const { food } = action.payload.data;
    const data = [...state.cartList.data];
    const cartIndex = data.findIndex((cartItem) => cartItem.id === food);
    if (cartIndex !== -1) {
      let updateItem = data[cartIndex];
      updateItem = {
        ...updateItem,
        load: true,
      };
      data.splice(cartIndex, 1, updateItem);
    }
    return {
      ...state,
      cartList: {
        data,
        load: false,
        error: null,
      },
    };
  },
  [SUCCESS(CART_ACTION.UPDATE_CART)]: (state, action) => {
    const { cartUpdate, total, totalMoney } = action.payload.data;
    const cartList = [...state.cartList.data];
    const cartIndex = cartList.findIndex((cartItem) => cartItem.id === cartUpdate.id);
    if (cartIndex !== -1) {
      let updateItem = cartList[cartIndex];
      const { quantity } = cartUpdate.pivot;
      updateItem = {
        ...updateItem,
        load: false,
        pivot: {
          ...updateItem.pivot,
          quantity,
        },
      };
      cartList.splice(cartIndex, 1, updateItem);
    }
    return {
      ...state,
      cartList: {
        data: cartList,
        load: false,
        error: null,
      },
      total,
      totalMoney,
    };
  },
  [FAILURE(CART_ACTION.UPDATE_CART)]: (state, action) => {
    const { error } = action.payload;
    const { food } = action.payload.data;
    const data = [...state.cartList.data];
    const cartIndex = data.findIndex((cartItem) => cartItem.id === food);
    if (cartIndex !== -1) {
      let updateItem = data[cartIndex];
      updateItem = {
        ...updateItem,
        load: false,
      };
      data.splice(cartIndex, 1, updateItem);
    }
    return {
      ...state,
      cartList: {
        data,
        load: false,
        error,
      },
    };
  },


  [REQUEST(CART_ACTION.DESTROY_CART)]: (state, action) => {
    const { food } = action.payload.data;
    const data = [...state.cartList.data];
    if (food){
      const cartIndex = data.findIndex((cartItem) => cartItem.id === food);
      if (cartIndex !== -1) {
        let updateItem = data[cartIndex];
        updateItem = {
          ...updateItem,
          load: true,
        };
        data.splice(cartIndex, 1, updateItem);
      }
    }
    return {
      ...state,
      cartList: {
        data,
        load: false,
        error: null,
      },
    };
  },

  [SUCCESS(CART_ACTION.DESTROY_CART)]: (state, action) => {
    const { foodId } = action.payload.data;
    let cartList = [...state.cartList.data];
    let total = 0;
    let totalMoney = 0;
    if (foodId) {
      const cartIndex = cartList.findIndex((cartItem) => cartItem.id === foodId);
      const { quantity } = cartList[cartIndex].pivot;
      total = state.total - quantity;
      totalMoney = state.totalMoney - cartList[cartIndex].discount * quantity;
      cartList.splice(cartIndex, 1);
    } else {
      cartList = [];
    }
    return {
      ...state,
      cartList: {
        data: cartList,
        load: false,
        error: null,
      },
      total,
      totalMoney,
    };
  },
  [FAILURE(CART_ACTION.DESTROY_CART)]: (state, action) => {
    const { error } = action.payload;
    const { food } = action.payload.data;
    const data = [...state.cartList.data];
    if (food){
      const cartIndex = data.findIndex((cartItem) => cartItem.id === food);
      if (cartIndex !== -1) {
        let updateItem = data[cartIndex];
        updateItem = {
          ...updateItem,
          load: false,
        };
        data.splice(cartIndex, 1, updateItem);
      }
    }
    return {
      ...state,
      cartList: {
        data,
        load: false,
        error,
      },
    };
  },


  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { carts } = action.payload.data;
    const total = carts?.count || 0;
    return {
      ...state,
      total,
    };
  },

  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { carts } = action.payload.data;
    const total = carts?.count || 0;
    return {
      ...state,
      total,
    };
  },

  [SUCCESS(ORDER_ACTION.CREATE_ORDER)]: () => {
    return initialState;
  },

  [REQUEST(USER_ACTION.LOGOUT)]: () => {
    return initialState;
  },
});

export default cartReducer;
