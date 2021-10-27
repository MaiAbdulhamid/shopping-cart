import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../Products/products.slice";
import { RootState } from "../store";

// interface CartProduct extends Product {
//   amount: number
// }

type CartProduct = Product & {
  amount: number
}

const CartSlice = createSlice({
  name: 'Cart',
  initialState: [] as CartProduct[],
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productIndex = state.findIndex(product => product.id === action.payload.id)
      if(productIndex === -1){
        state.push({...action.payload, amount: 1})
      }else{
        state[productIndex].amount += 1
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productIndex = state.findIndex(product => product.id === action.payload)

      if(state[productIndex].amount > 1){
        state[productIndex].amount -= 1
      }else{
        return state.filter(product => product.id !== action.payload)
      }
    }
  }
})

export const { addToCart, removeFromCart } = CartSlice.actions
export const getCartProductsSelector = (state: RootState) => state.Cart
export const getTotalPriceSelector = (state: RootState) => state.Cart.reduce((acc, next) => acc += (next.amount * next.price), 0)

export default CartSlice.reducer