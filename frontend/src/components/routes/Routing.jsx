import React from 'react'
import { Routes, Route} from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
import ProductDetail from '../productDetail/ProductDetail';
import AllProducts from '../../pages/products/AllProducts';
import FaqPage from '../../pages/FaqPage/FaqPage';
import PageInit from '../../pages/main/PageInit';
import ProductsAdmin from '../products/admin/ProductsAdmin';
import UsersAdmin from '../usuariosAdmin/UsersAdmin';
import Login from '../login/Login';
import Register from '../login/Register';
import PrivateRoute from './PrivateRoute';
const Routing = () => {
  return (
    <>
            <Routes>
        <Route path='/' element={<PageInit />} />
        <Route path='/faqpage' element={<FaqPage />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product' element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas privadas para administradores */}
        <Route path='/admin' element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="/ruta1" element={<PrivateRoute><ProductsAdmin /></PrivateRoute>} />
        <Route path="/ruta2" element={<PrivateRoute><UsersAdmin /></PrivateRoute>} />
        <Route path="/ruta4" element={<PrivateRoute><ProductsAdmin /></PrivateRoute>} />
        <Route path="/ruta5" element={<PrivateRoute><ProductsAdmin /></PrivateRoute>} />
        <Route path="/ruta6" element={<PrivateRoute><ProductsAdmin /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default Routing