import { useSelector } from "react-redux"
import { useAppDispatch } from "../store.hooks"
import { getCartProductsSelector, getTotalPriceSelector, removeFromCart } from "./cart.slice"

const Cart = () => {
  const cartProducts = useSelector(getCartProductsSelector)
  const totalPrice = useSelector(getTotalPriceSelector)

  // dispatch RemoveCart action
  const dispatch = useAppDispatch()

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId))
  }
  return (
    <div className='cart'>
      <h2>Cart</h2>
      <ul>
        {cartProducts.map(product => (
          <li key={product.id}>
            <span>Product Name: {product.title} - </span>
            <span>Amount: {product.amount} </span>
            <button onClick={() => handleRemoveFromCart(product.id)} >Remove From Cart</button>
          </li>
        ))}
      </ul>
      <div className="total">Total Price is: {totalPrice}</div>
    </div>
  )
}

export default Cart