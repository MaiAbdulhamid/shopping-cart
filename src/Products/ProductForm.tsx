import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store.hooks'
import { addProduct, getErrorMessage, Product, addProductAsync } from './products.slice'

const ProductForm: React.FC = () => {
  // Dispatch Actions
  const dispatch = useAppDispatch()

  //Handle Redux Errors
  const errorMessage = useSelector(getErrorMessage);

  const initialState = {
    title: '',
    price: 0,
    id: ''
  }
  const [product, setProduct] = useState<Product>(initialState);
  const { title, price, id } = product;

  // HandleChange
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = event

    return setProduct((prevState) => {
      //Insurance
      (prevState as any)[name] = value
      //return state
      const currentState = {...prevState}
      return currentState
    })
  }

  // HandleSubmit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    //dispatch(addProduct(product))
    dispatch(addProductAsync(product))
  }

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={handleChange} type="text" placeholder="Product Title" name="title" />
        <input value={price} onChange={handleChange} type="number" placeholder="Price" name="price" />
        <input value={id} onChange={handleChange} type="text" placeholder="Id" name="id" />

        <button type='submit'>Add Product</button>
      </form>
      {errorMessage && <span>Error: {errorMessage}</span>}
    </div>
  )
}
export default ProductForm
