import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useMemo, useReducer } from 'react';

import App from '../App';
import StoreContext from './StoreContext';

import { generateId } from '../utils';
import { initialState, reducer } from './reducer';
import {
  ADD_DAY,
  ADD_ITEM,
  ADD_ITEM_TO_DAY,
  CLEAR_ALL_DAYS,
  CLEAR_CURRENT_ITEMS,
  DATA_LOADING,
  DELETE_DAY,
  DELETE_ITEM,
  DELETE_ITEM_FROM_DAY,
  SET_PRICE,
  SET_SINGLE_DAY,
  TOGGLE_BYED,
  TOGGLE_MODAL,
  TOGGLE_MODE,
} from './types';

const StoreProvider = () => {
  const initial =
    JSON.parse(localStorage.getItem('PWA_SHOPPING_LIST_STATE')) ?? initialState;
  const [state, dispatch] = useReducer(reducer, initial);

  const addItem = (itemName, amount) => {
    const newItem = {
      id: generateId(),
      itemName,
      amount,
      price: '',
      isByed: false,
    };

    dispatch({
      type: ADD_ITEM,
      payload: newItem,
    });
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

  const setSingleDay = (id) => {
    dispatch({
      type: SET_SINGLE_DAY,
      payload: id,
    });
  };

  const addDay = (date, items) => {
    const newDay = {
      id: generateId(),
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

  const clearAllDays = () => dispatch({ type: CLEAR_ALL_DAYS });

  const addItemToDay = (itemName, amount, price) => {
    const newItem = {
      id: generateId(),
      itemName,
      amount,
      price,
      isByed: true,
    };

    dispatch({
      type: ADD_ITEM_TO_DAY,
      payload: { dayId: state.singleDay.id, newItem },
    });
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

  useEffect(() => {
    dispatch({ type: DATA_LOADING, payload: false });
  }, []);

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

  return (
    <StoreContext.Provider
      value={{
        toggleColorMode,
        state,
        addItem,
        deleteItem,
        toggleByed,
        setItemPrice,
        clearCurrentItems,
        toggleModal,
        setSingleDay,
        addDay,
        deleteDay,
        clearAllDays,
        addItemToDay,
        deleteItemFromDay,
      }}
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreContext.Provider>
  );
};

export default StoreProvider;
