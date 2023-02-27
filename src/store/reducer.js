import { deepClone } from '../utils';
import {
  ADD_DAY,
  ADD_ITEM,
  ADD_ITEM_TO_DAY,
  CLEAR_CURRENT_ITEMS,
  DELETE_DAY,
  DELETE_ITEM,
  DELETE_ITEM_FROM_DAY,
  DELETE_MONTH,
  SET_CURRENT_ITEMS,
  SET_LIST_AS_DAY,
  SET_PRICE,
  TOGGLE_BYED,
  TOGGLE_MODAL,
  TOGGLE_MODE,
} from './types';

export const initialState = {
  mode: 'light',
  currentItems: [],
  visibleModal: false,
  listAsDay: [],
};

export const reducer = (state, action) => {
  const oldState = deepClone(state);

  switch (action.type) {
    case TOGGLE_MODE:
      oldState.mode = oldState.mode === 'light' ? 'dark' : 'light';
      return oldState;

    case SET_CURRENT_ITEMS:
      oldState.currentItems = action.payload;
      return oldState;

    case ADD_ITEM:
      oldState.currentItems = [action.payload, ...state.currentItems];
      return oldState;

    case TOGGLE_BYED:
      const buyIndex = oldState.currentItems.findIndex(
        (item) => item.id === action.payload
      );
      oldState.currentItems[buyIndex].isBuyed =
        !oldState.currentItems[buyIndex].isBuyed;
      oldState.currentItems[buyIndex].price = '';

      return oldState;

    case SET_PRICE:
      const priceIndex = oldState.currentItems.findIndex(
        (item) => item.id === action.payload.id
      );
      oldState.currentItems[priceIndex].price = action.payload.price;

      return oldState;

    case DELETE_ITEM:
      oldState.currentItems = oldState.currentItems.filter(
        (item) => item.id !== action.payload
      );

      return oldState;

    case CLEAR_CURRENT_ITEMS:
      oldState.currentItems = [];

      return oldState;

    case TOGGLE_MODAL:
      oldState.visibleModal = !oldState.visibleModal;

      return oldState;

    case SET_LIST_AS_DAY:
      oldState.listAsDay = action.payload;

      return oldState;

    case ADD_DAY:
      oldState.listAsDay = [action.payload, ...state.listAsDay];

      return oldState;

    case DELETE_DAY:
      oldState.listAsDay = oldState.listAsDay.filter(
        (day) => day.id !== action.payload
      );

      return oldState;

    case DELETE_MONTH:
      oldState.listAsDay = oldState.listAsDay.filter(
        (day) => day.month !== action.payload
      );

      return oldState;

    case ADD_ITEM_TO_DAY:
      const dayIndex = oldState.listAsDay.findIndex(
        (day) => day.id === action.payload.dayId
      );

      oldState.listAsDay[dayIndex].items = [
        ...oldState.listAsDay[dayIndex].items,
        action.payload.newItem,
      ];

      return oldState;

    case DELETE_ITEM_FROM_DAY:
      const delDayIndex = oldState.listAsDay.findIndex(
        (day) => day.id === action.payload.dayId
      );

      oldState.listAsDay[delDayIndex].items = oldState.listAsDay[
        delDayIndex
      ].items.filter((item) => item.id !== action.payload.itemId);

      return oldState;

    default:
      return state;
  }
};
