import { createContext } from 'react';

interface State {
  loading: boolean;
  articles: any[];
  article: Record<string, any>;
}

interface Action {
  type: 'UPDATE';
  payload?: Partial<State>;
}

interface ContextProps {
  state: State;
  dispatch: (action: Action) => void;
}

export const initialState: State = {
  loading: false,
  article: {},
  articles: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...(action.payload || {}) };

    default:
      return state;
  }
};

export const ReduxContext = createContext<ContextProps>({ state: initialState, dispatch: () => {} });
