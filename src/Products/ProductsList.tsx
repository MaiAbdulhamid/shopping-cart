import { useSelector } from 'react-redux'
import { addToCart } from '../Cart/cart.slice'
import { useAppDispatch } from '../store.hooks'
import { getProductsSelector, Product, removeProduct } from './products.slice'


const ProductsList: React.FC = () => {
  // Get Products
  const products = useSelector(getProductsSelector)
  
  // Dispatch Remove Action
  const dispatch = useAppDispatch()

  // Add To Cart
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  const handleRemove = (id: string) => {
    dispatch(removeProduct(id))
  }

  return(
    <div>
      <h3>Games List</h3>
      <ul>
        {products.map(product => (
          <li key={product.id} >
            <span>Name: {product.title} </span>
            <span>Price: {product.price}</span>
            <button onClick={() => handleAddToCart(product)} >Add To Cart</button>
            <button onClick={() => handleRemove(product.id)} >X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsList