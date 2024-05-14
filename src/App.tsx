import { useReducer } from 'react';
import Login from './components/Login';
import { initialState, reducer, ReduxContext } from './store';
import { Home } from './pages';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ReduxContext.Provider value={{ state, dispatch }}>
      <Login />
      <Home />
    </ReduxContext.Provider>
  );
}

export default App;
