import Routing from './components/routes/Routing';
import './App.css';
import Footer from './components/footer/Footer';
import Navigator from './components/navbar/Navigator';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductosContext from './context/productos/ProductsContext';
import CarritoProvider from './context/carrito/CarritoContext';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import UsersContext from './context/users/UsersContext';
import { AuthProvider } from './context/login/LoginContext'; // Importa AuthProvider

function App() {
  return (
    <>
      <AuthProvider> {/* Envuelve toda la aplicación o las partes relevantes */}
        <UsersContext>
          <CarritoProvider>
            <ProductosContext>
              <Navigator />
              <Routing />
              <Footer />
              <ScrollToTop />
            </ProductosContext>
          </CarritoProvider>
        </UsersContext>
      </AuthProvider>
    </>
  );
}

export default App;