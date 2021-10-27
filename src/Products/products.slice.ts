import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import validateProduct from '../helpers/Api'
import { RootState } from '../store'

// Product Type
export type Product = {
  title: string
  price: number
  id: string
}

const initialProducts: Product[] = [
  {
    title: 'Bruch',
    price: 60,
    id: 'bh'
  },
  {
    title: 'Pencil',
    price: 20,
    id: 'pl'
  },
  {
    title: 'ruler',
    price: 30,
    id: 'rr'
  }
]
// initialState Type
/**
 * Enums allow a developer to define a set of named constants(Serialized Data).
 * Enum member must have initializer.
*/
export enum ValidationState {
  fulfilled,
  pending,
  rejected
}
type ProductSliceState = {
  products: Product[],
  validationState?: ValidationState,
  errorMessage?: string
}

const initialState: ProductSliceState = {
  products: initialProducts,
  validationState: undefined,
  errorMessage: undefined
}

// For Api Async Requests
/**
 * Thunk is a Function that returns another Function
 * It creates 3 actions, 1. fulfill, 2. pending, 3.rejected
 */
export const addProductAsync = createAsyncThunk('Products/addNewProduct', async (initialProduct: Product) => {
  const product = await validateProduct(initialProduct)
  return product
})

const ProductsSlice = createSlice({
  name: 'Products',
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // return [...state, action.payload]
      state.products.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => ({
        ...state,
       products: state.products.filter(product => product.id !== action.payload)
    })
  },
  extraReducers: (builder) => {
    // For Api Async Requests(Thunks)
    // Builder is an object that allows you to add different cases
    builder.addCase(addProductAsync.fulfilled, (state, action) =>({
      ...state,
      products: [...state.products, action.payload],
      validationState: ValidationState.fulfilled,
      errorMessage: undefined,
    }))
    builder.addCase(addProductAsync.pending, (state, action) =>({
      ...state,
      validationState: ValidationState.pending,
      errorMessage: undefined,
    }))
    builder.addCase(addProductAsync.rejected, (state, action) =>({
      ...state,
      validationState: ValidationState.rejected,
      errorMessage: action.error.message,
    }))
  }
})

export const { addProduct, removeProduct } = ProductsSlice.actions

export const getProductsSelector = (state: RootState) => state.Products.products
export const getErrorMessage = (state: RootState) => state.Products.errorMessage;

export default ProductsSlice.reducer