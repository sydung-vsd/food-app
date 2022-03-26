import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FOOD_ACTION, LIKE_ACTION } from '../constants';

const initialState = {
  foodList: {
    data: [],
    load: false,
    error: null,
    currentPage: 1,
    lastPage: 1,
    total: 0,
  },
  foodPromotions: {
    data: [],
    load: false,
    error: null,
  },
  likes: {
    data: [],
    load: false,
  },
  foodDetail: {
    data: {},
    load: false,
    error: null,
  },
};

const foodReducer = createReducer(initialState, {
  [FOOD_ACTION.GET_FOOD_DETAIL]: (state, action) => {
    const { id } = action.payload.data;
    const foods = [...state.foodList.data, ...state.foodPromotions.data];
    const foodDetail = foods.find((foodItem) => foodItem.id === id);
    return {
      ...state,
      foodDetail: {
        data: {
          ...foodDetail,
        },
      },
    };
  },
  [REQUEST(FOOD_ACTION.GET_FOOD_LIST)]: (state) => {
    return {
      ...state,
      foodList: {
        ...state.foodList,
        load: true,
      },
    };
  },
  [SUCCESS(FOOD_ACTION.GET_FOOD_LIST)]: (state, action) => {
    const { currentPage, lastPage, total, data } = action.payload.data;
    let newFoods = [...data];
    if (currentPage > state.foodList.currentPage) {
      newFoods = [...state.foodList.data, ...newFoods];
    }
    return {
      ...state,
      foodList: {
        ...state.foodList,
        data: newFoods,
        load: false,
        error: null,
        currentPage,
        lastPage,
        total,
        likeLoaded: false,
      },
    };
  },
  [REQUEST(FOOD_ACTION.GET_FOOD_PROMOTIONS)]: (state) => {
    return {
      ...state,
      foodPromotions: {
        ...state.foodPromotions,
        load: true,
      },
    };
  },
  [SUCCESS(FOOD_ACTION.GET_FOOD_PROMOTIONS)]: (state, { payload: { data: { data } } }) => {
    return {
      ...state,
      foodPromotions: {
        ...state.foodPromotions,
        data,
        load: false,
        error: null,
        likeLoaded: false,
      },
    };
  },
  [REQUEST(LIKE_ACTION.GET_LIKE_LIST)]: (state) => {
    return {
      ...state,
      likes: {
        ...state.likes,
        load: true,
      },
    };
  },
  [SUCCESS(LIKE_ACTION.GET_LIKE_LIST)]: (state, action) => {
    const { data } = action.payload;
    const likeList = [...state.likes.data];
    data.forEach((foodItem) => {
      if (!likeList.includes(foodItem)) {
        likeList.push(foodItem);
      }
    });
    return {
      ...state,
      likes: {
        ...state.likes,
        data: likeList,
        load: false,
      },
    };
  },
  [SUCCESS(LIKE_ACTION.TOGGLE_LIKE)]: (state, action) => {
    const { foodId } = action.payload.data;
    const likeList = [...state.likes.data];
    if (likeList.includes(foodId)) {
      likeList.splice(likeList.indexOf(foodId), 1);
    } else {
      likeList.push(foodId);
    }
    return {
      ...state,
      likes: {
        ...state.likes,
        data: likeList,
      },
    };
  },
});

export default foodReducer;
