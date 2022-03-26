import { createAction } from '@reduxjs/toolkit';
import { REQUEST, ADDRESS_ACTION } from '../constants';

export const getAddressAction = createAction(REQUEST(ADDRESS_ACTION.GET_ADDRESS));
export const getDistrictsAction = createAction(REQUEST(ADDRESS_ACTION.GET_DISTRICTS));
export const getWardsAction = createAction(REQUEST(ADDRESS_ACTION.GET_WARDS));
