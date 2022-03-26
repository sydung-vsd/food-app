import { createAction } from '@reduxjs/toolkit';
import { REQUEST, LIKE_ACTION } from '../constants';

export const getLikesAction = createAction(REQUEST(LIKE_ACTION.GET_LIKE_LIST));
export const toggleLikeAction = createAction(REQUEST(LIKE_ACTION.TOGGLE_LIKE));
