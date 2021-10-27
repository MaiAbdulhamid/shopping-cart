import { configureStore } from '@reduxjs/toolkit'
import Products from './Products/products.slice'
import Cart from "./Cart/cart.slice";

const store = configureStore({
  reducer: {
    Products,
    Cart
  }
})
// Get State
export type RootState = ReturnType<typeof store.getState>

// Dispatch Actions
export type AppDispatch = typeof store.dispatch

export default store