import { createTheme } from '@mui/material/styles';
import { useEffect, useMemo, useReducer } from 'react';

import dayjs from 'dayjs';
import { initialState, reducer } from '../store/reducer';
import {
  ADD_DAY,
  ADD_ITEM,
  ADD_ITEM_TO_DAY,
  CLEAR_CURRENT_ITEMS,
  DELETE_DAY,
  DELETE_ITEM,
  DELETE_ITEM_FROM_DAY,
  DELETE_MONTH,
  SET_PRICE,
  TOGGLE_BYED,
  TOGGLE_MODAL,
  TOGGLE_MODE,
} from '../store/types';
import { generateId } from '../utils';

const useStore = () => {
  const initial =
    JSON.parse(localStorage.getItem('PWA_SHOPPING_LIST_STATE')) ?? initialState;
  const [state, dispatch] = useReducer(reducer, initial);

  const addItem = (data, cb) => {
    const exist = state.currentItems.find(
      (item) => item.itemName.toLowerCase() === data.name.toLowerCase()
    );

    if (exist) {
      return cb({ name: 'This item already exist!' });
    } else {
      const newItem = {
        id: generateId(),
        itemName: data.name,
        amount: data.amount,
        price: '',
        isBuyed: false,
      };

      dispatch({
        type: ADD_ITEM,
        payload: newItem,
      });

      cb();
    }
  };

  const toggleByed = (id) => {
    dispatch({
      type: TOGGLE_BYED,
      payload: id,
    });
  };

  const setItemPrice = (id, price) => {
    dispatch({
      type: SET_PRICE,
      payload: { id, price },
    });
  };

  const deleteItem = (id) => {
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  };
  const clearCurrentItems = () => dispatch({ type: CLEAR_CURRENT_ITEMS });

  const toggleModal = () => dispatch({ type: TOGGLE_MODAL });

  const addDay = (date, items) => {
    const newDay = {
      id: generateId(),
      month: dayjs(date).format('MMM YYYY'),
      date,
      items,
    };

    dispatch({
      type: ADD_DAY,
      payload: newDay,
    });
  };

  const deleteDay = (dateId) => {
    dispatch({
      type: DELETE_DAY,
      payload: dateId,
    });
  };

  const deleteMonth = (monthName) =>
    dispatch({ type: DELETE_MONTH, payload: monthName });

  const addItemToDay = (dateId, data, cb) => {
    const dayInfo = state.listAsDay.find((day) => day.id === dateId);

    const exist = dayInfo.items.find(
      (item) => item.itemName.toLowerCase() === data.name.toLowerCase()
    );

    if (exist) {
      return cb({ name: 'This item already exist!' });
    } else {
      const newItem = {
        id: generateId(),
        itemName: data.name,
        amount: data.amount,
        price: data.price,
        isBuyed: true,
      };

      dispatch({
        type: ADD_ITEM_TO_DAY,
        payload: { dayId: dateId, newItem },
      });

      cb();
    }
  };

  const deleteItemFromDay = (dayId, itemId) => {
    dispatch({
      type: DELETE_ITEM_FROM_DAY,
      payload: { dayId, itemId },
    });
  };

  useEffect(() => {
    localStorage.setItem('PWA_SHOPPING_LIST_STATE', JSON.stringify(state));
  }, [state]);

  const toggleColorMode = () => dispatch({ type: TOGGLE_MODE });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.mode,
          primary: {
            main: state.mode === 'dark' ? '#2fceff' : '#0087b1',
            light: '#2fceff',
            dark: '#046380',
          },
          secondary: {
            main: state.mode === 'dark' ? '#ff6f6f' : '#f00927',
            light: '#ff6f6f',
          },
          background: {
            paper: state.mode === 'dark' ? '#292929' : '#ececec',
          },
        },
        typography: {
          fontFamily: "'Titillium Web', sans-serif",
        },
      }),
    [state.mode]
  );

  return {
    toggleColorMode,
    state,
    addItem,
    deleteItem,
    toggleByed,
    setItemPrice,
    clearCurrentItems,
    toggleModal,
    addDay,
    deleteDay,
    deleteMonth,
    addItemToDay,
    deleteItemFromDay,
    theme,
  };
};

export default useStore;
