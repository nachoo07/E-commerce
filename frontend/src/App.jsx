import Routing from './components/routes/Routing';
import './App.css';
import Footer from './components/footer/Footer';
import Navigator from './components/navbar/Navigator';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductosContext from './context/productos/ProductsContext';
import CarritoProvider from './context/carrito/CarritoContext';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import  UsersProvider  from './context/users/UsersContext';

function App() {
  return (
    <>
    <UsersProvider>
        <CarritoProvider>
          <ProductosContext>
            <Navigator />
            <Routing />
            <Footer />
            <ScrollToTop />
          </ProductosContext>
        </CarritoProvider>
     </UsersProvider>  
    </>
  );
}

export default App;