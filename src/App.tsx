import './App.css';
import Cart from './Cart/Cart';
import ProductForm from './Products/ProductForm';
import ProductsList from './Products/ProductsList';

function App() {
  return (
    <div className="App">
      <ProductsList />
      <ProductForm />
      <Cart />
    </div>
  );
}

export default App;
