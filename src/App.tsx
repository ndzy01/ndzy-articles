import { useReducer } from 'react';
import { initialState, reducer, ReduxContext } from './store';
import { Home } from './pages';
import { SnackbarProvider } from 'notistack';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ReduxContext.Provider value={{ state, dispatch }}>
      <SnackbarProvider>
        <Home />
      </SnackbarProvider>
    </ReduxContext.Provider>
  );
}

export default App;
