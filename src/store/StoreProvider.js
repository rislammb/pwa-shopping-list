import React, { useState, useMemo, useReducer, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from '../App';
import StoreContext from './StoreContext';

import { initialState, reducer } from './reducer';
import {
  DATA_LOADING,
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
  ADD_ITEM_TO_DAY,
  DELETE_ITEM_FROM_DAY,
  CLEAR_ALL_DAYS,
} from './types';

const StoreProvider = () => {
  const [mode, setMode] = useState('light');
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (itemName, amount) => {
    const newItem = {
      id: Math.random() + '-' + Math.random(),
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
      id: Math.random() + '-' + Math.random(),
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
      id: Math.random() + '-' + Math.random(),
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
    async function fetchData() {
      try {
        const localCurrentItems = await localStorage.getItem(
          'CURRENT_ITEMS_KEY'
        );
        if (localCurrentItems !== null) {
          dispatch({
            type: SET_CURRENT_ITEMS,
            payload: JSON.parse(localCurrentItems),
          });
        }
        const localListAsDay = await localStorage.getItem('LIST_AS_DAY_KEY');
        if (localListAsDay !== null) {
          dispatch({
            type: SET_LIST_AS_DAY,
            payload: JSON.parse(localListAsDay),
          });
        }
        dispatch({
          type: DATA_LOADING,
          payload: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function saveCurrentItems() {
      try {
        await localStorage.setItem(
          'CURRENT_ITEMS_KEY',
          JSON.stringify(state.currentItems)
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (!state.dataLoading) saveCurrentItems();
  }, [state.currentItems, state.dataLoading]);

  useEffect(() => {
    async function saveListAsDay() {
      try {
        await localStorage.setItem(
          'LIST_AS_DAY_KEY',
          JSON.stringify(state.listAsDay)
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (!state.dataLoading) saveListAsDay();
  }, [state.listAsDay, state.dataLoading]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#0087b1',
            light: '#00b9f1',
            dark: '#046380',
          },
          secondary: {
            main: '#f00927',
            light: '#ff576d',
          },
          background: {
            paper:
              mode === 'light'
                ? 'linear-gradient(to right, #fffaf2, #fcffef)'
                : 'linear-gradient(to right, #0e0b00, #0f0006)',
          },
        },
        typography: {
          fontFamily: "'Titillium Web', sans-serif",
        },
      }),
    [mode]
  );

  return (
    <StoreContext.Provider
      value={{
        colorMode,
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
