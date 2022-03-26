import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import userReducer from './user.reducer';
import commonReducer from './common.reducer';
import adminReducer from './admin.reducer';
import foodReducer from './food.reducer';
import storeReducer from './store.reducer';
import cartReducer from './cart.reducer';
import tagReducer from './tag.reducer';
import promotionReducer from './promotion.reducer';
import categoryReducer from './category.reducer';
import addressReducer from './address.reducer';
import bookmarkReducer from './bookmark.reducer';
import commentReducer from './comment.reducer';
import rateReducer from './rate.reducer';
import orderReducer from './order.reducer';

import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    commonReducer,
    userReducer,
    adminReducer,
    foodReducer,
    storeReducer,
    cartReducer,
    tagReducer,
    promotionReducer,
    categoryReducer,
    addressReducer,
    bookmarkReducer,
    commentReducer,
    orderReducer,
    rateReducer,
  },
  middleware: [...getDefaultMiddleware({
    thunk: false, serializableCheck: false,
  }), sagaMiddleware],
  devTools: false,
});

sagaMiddleware.run(rootSaga);

export default store;
