import {
  SET_CURRENT_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_BYED,
  SET_PRICE,
  CLEAR_CURRENT_ITEMS,
  TOGGLE_MODAL,
  SET_LIST_AS_DAY,
  SET_SINGLE_DAY,
  ADD_DAY,
  DELETE_DAY,
  CLEAR_ALL_DAYS,
  ADD_ITEM_TO_DAY,
  DELETE_ITEM_FROM_DAY,
} from './types';

export const initialState = {
  currentItems: [],
  visibleModal: false,
  listAsDay: [],
  singleDay: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
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
      const currentItemsByed = [...state.currentItems];
      const index = currentItemsByed.findIndex(
        (item) => item.id === action.payload
      );
      currentItemsByed[index].isByed = !currentItemsByed[index].isByed;
      currentItemsByed[index].price = '';
      return {
        ...state,
        currentItems: currentItemsByed,
      };

    case SET_PRICE:
      const currentItemsPrice = [...state.currentItems];
      const priceIndex = currentItemsPrice.findIndex(
        (item) => item.id === action.payload.id
      );
      currentItemsPrice[priceIndex].price = action.payload.price;
      return {
        ...state,
        currentItems: currentItemsPrice,
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
      const tempListAsDay = [...state.listAsDay];
      const dayIndex = tempListAsDay.findIndex(
        (day) => day.id === action.payload.dayId
      );
      tempListAsDay[dayIndex].items = [
        action.payload.newItem,
        ...tempListAsDay[dayIndex].items,
      ];

      return {
        ...state,
        listAsDay: tempListAsDay,
      };

    case DELETE_ITEM_FROM_DAY:
      const temListAsDay = [...state.listAsDay];
      const dayInde = temListAsDay.findIndex(
        (day) => day.id === action.payload.dayId
      );
      temListAsDay[dayInde].items = temListAsDay[dayInde].items.filter(
        (item) => item.id !== action.payload.itemId
      );
      return {
        ...state,
        listAsDay: temListAsDay,
      };

    default:
      return state;
  }
};
