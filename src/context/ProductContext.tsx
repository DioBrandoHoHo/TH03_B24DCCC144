import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, Action } from '../types';
import { initialProducts } from '../data/initialProducts';

interface State {
  products: Product[];
}

interface ProductContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState: State = { products: initialProducts };

const ProductContext = createContext<ProductContextType | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { products: [action.payload, ...state.products] };

    case 'UPDATE':
      return {
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case 'DELETE':
      return { products: state.products.filter((p) => p.id !== action.payload) };

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
}

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error('useProductContext must be used within ProductProvider');
  }
  return ctx;
};
