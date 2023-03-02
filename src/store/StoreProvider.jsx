import App from '../App';
import useStore from '../hooks/useStore';

import { ThemeProvider } from '@mui/material/styles';
import StoreContext from './StoreContext';

const StoreProvider = () => {
  const {
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
  } = useStore();

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
        addDay,
        deleteDay,
        deleteMonth,
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
