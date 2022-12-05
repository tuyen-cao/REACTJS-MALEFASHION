import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/productsReducer'
import paymentReducer from './reducers/paymentReducer'

import { useDispatch ,
  TypedUseSelectorHook, 
  useSelector 
} from "react-redux";

// Use `configureStore` function to create the store:
export const store = configureStore({
  reducer: {
    // Specify our reducer in the reducers object:
    products: productsReducer,
    payment: paymentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;