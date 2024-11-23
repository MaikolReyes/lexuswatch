// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import { ProductList, Product, Category, Cart, Navbar, Footer } from './components'
// Provider
import { CartProvider } from './context/CartContext';
// Styles

const App = () => {

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <Footer />

    </>
  )
}

// Exportando el componente para que pueda ser usado por otros componentes
export default App;