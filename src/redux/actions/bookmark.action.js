import { createAction } from '@reduxjs/toolkit';
import { REQUEST, BOOKMARK_ACTION } from '../constants';

export const createBookmarkAction = createAction(REQUEST(BOOKMARK_ACTION.CREATE_BOOKMARK));
export const deleteBookmarkAction = createAction(REQUEST(BOOKMARK_ACTION.DELETE_BOOKMARK));
export const updateBookmarkAction = createAction(REQUEST(BOOKMARK_ACTION.UPDATE_BOOKMARK));
export const getBookmarkDetailAction = createAction(REQUEST(BOOKMARK_ACTION.GET_BOOKMARK_DETAIL));
export const getBookmarksAction = createAction(REQUEST(BOOKMARK_ACTION.GET_BOOKMARK_LIST));
