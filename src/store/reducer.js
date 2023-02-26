import { deepClone } from '../utils';
import {
  ADD_DAY,
  ADD_ITEM,
  ADD_ITEM_TO_DAY,
  CLEAR_ALL_DAYS,
  CLEAR_CURRENT_ITEMS,
  DELETE_DAY,
  DELETE_ITEM,
  DELETE_ITEM_FROM_DAY,
  SET_CURRENT_ITEMS,
  SET_LIST_AS_DAY,
  SET_PRICE,
  SET_SINGLE_DAY,
  TOGGLE_BYED,
  TOGGLE_MODAL,
  TOGGLE_MODE,
} from './types';

export const initialState = {
  mode: 'light',
  currentItems: [],
  visibleModal: false,
  listAsDay: [],
  singleDay: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MODE:
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light',
      };

    case SET_CURRENT_ITEMS:
      return {
        ...state,
        currentItems: action.payload,
      };

    case ADD_ITEM:
      return {
        ...state,
        currentItems: [action.payload, ...state.currentItems],
      };

    case TOGGLE_BYED:
      const oldStateItems = deepClone(state.currentItems);

      const index = oldStateItems.findIndex(
        (item) => item.id === action.payload
      );

      oldStateItems[index].isByed = !oldStateItems[index].isByed;
      oldStateItems[index].price = '';

      return {
        ...state,
        currentItems: oldStateItems,
      };

    case SET_PRICE:
      const oldStateItemsP = deepClone(state.currentItems);

      const priceIndex = oldStateItemsP.findIndex(
        (item) => item.id === action.payload.id
      );
      oldStateItemsP[priceIndex].price = action.payload.price;
      return {
        ...state,
        currentItems: oldStateItemsP,
      };

    case DELETE_ITEM:
      return {
        ...state,
        currentItems: state.currentItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case CLEAR_CURRENT_ITEMS:
      return {
        ...state,
        currentItems: [],
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        visibleModal: !state.visibleModal,
      };

    case SET_LIST_AS_DAY:
      return {
        ...state,
        listAsDay: action.payload,
      };

    case SET_SINGLE_DAY:
      return {
        ...state,
        singleDay: state.listAsDay.find((day) => day.id === action.payload),
      };

    case ADD_DAY:
      return {
        ...state,
        listAsDay: [action.payload, ...state.listAsDay],
      };

    case DELETE_DAY:
      return {
        ...state,
        listAsDay: state.listAsDay.filter((day) => day.id !== action.payload),
      };

    case CLEAR_ALL_DAYS:
      return {
        ...state,
        listAsDay: [],
      };

    case ADD_ITEM_TO_DAY:
      const tempListAsDay = deepClone(state.listAsDay);

      const dayIndex = tempListAsDay.findIndex(
        (day) => day.id === action.payload.dayId
      );

      tempListAsDay[dayIndex].items = [
        ...tempListAsDay[dayIndex].items,
        action.payload.newItem,
      ];

      return {
        ...state,
        listAsDay: tempListAsDay,
        singleDay: tempListAsDay.find((day) => day.id === action.payload.dayId),
      };

    case DELETE_ITEM_FROM_DAY:
      const temListAsDay = deepClone(state.listAsDay);

      const dayInde = temListAsDay.findIndex(
        (day) => day.id === action.payload.dayId
      );

      temListAsDay[dayInde].items = temListAsDay[dayInde].items.filter(
        (item) => item.id !== action.payload.itemId
      );

      return {
        ...state,
        listAsDay: temListAsDay,
        singleDay: temListAsDay.find((day) => day.id === action.payload.dayId),
      };

    default:
      return state;
  }
};
