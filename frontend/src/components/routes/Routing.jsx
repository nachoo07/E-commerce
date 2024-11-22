import React from 'react'
import { Routes, Route} from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
import ProductDetail from '../productDetail/ProductDetail';
import AllProducts from '../../pages/products/AllProducts';
import FaqPage from '../../pages/FaqPage/FaqPage';
import PageInit from '../../pages/main/PageInit';
//import Login from '../login/Login';
import ProductsAdmin from '../products/admin/ProductsAdmin';
import UsersAdmin from '../usuariosAdmin/UsersAdmin';
//import UsersAdmin from '../usuariosAdmin/UsersAdmin';


const Routing = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<PageInit/>}/> 
            <Route path='/admin' element={<AdminPage/>}/> 
            <Route path='/faqpage' element={<FaqPage/>}/> 
            <Route path='/product/:id' element={<ProductDetail/>}/> 
            <Route path='/product' element={<AllProducts/>}/> 
            <Route path="/ruta1" element={<ProductsAdmin/>} />
           <Route path="/ruta2" element={<UsersAdmin/>} />
            <Route path="/ruta4" element={<ProductsAdmin/>} />
            <Route path="/ruta5" element={<ProductsAdmin/>} />
            <Route path="/ruta6" element={<ProductsAdmin/>} />
        </Routes>
    </>
  )
}

export default Routing