import React from 'react'
import ProductDetail from '../../components/productDetail/ProductDetail'

const DetailProduct = () => {

    const exampleProduct = {
        id: 1,
        name: "VERNE :: VELADOR",
        price: 190183,
        description: "Velador con base de madera torneada...",
        image: "https://res.cloudinary.com/tunombredeusuario/image/upload/v1/lampara-de-mesa.jpg"
      };
  return (
    <>
       <ProductDetail product={exampleProduct} />
    </>
  )
}

export default DetailProduct