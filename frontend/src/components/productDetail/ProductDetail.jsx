import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/productos/ProductsContext';
import { CartContext } from '../../context/carrito/CarritoContext';
import '../productDetail/productDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  console.log('ID recibido en ProductDetail:', id); // Verifica si el ID se recibe correctamente

   // Verificar si el ID es válido antes de hacer la solicitud
   if (!id) {
    console.error('El ID del producto no está disponible');
    return <p>Producto no encontrado</p>;
  }

  const [product, setProduct] = useState(null);  // Estado para el producto
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  // Estado para el acordeón de "Medios de envío"
  const [isPaymentInfoOpen, setPaymentInfoOpen] = useState(false);

  // Estado para el acordeón de "Información de Locales"
  const [isStoreInfoOpen, setStoreInfoOpen] = useState(false);
  const { getProductoById } = useContext(ProductsContext);  // Obtener la función para obtener el producto por ID
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getProductoById(id); // Asegúrate de que esta función maneja correctamente el `id`
          setProduct(fetchedProduct);
        } catch (error) {
          console.error('Error al obtener el producto:', error);
        }
      };
  
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Producto no encontrado o cargando...</p>;
  }

  // Función para manejar la imagen principal
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  // Funciones para manejar el incremento y decremento de la cantidad
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="product-detail-container">
      <div className="product-images">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => handleImageClick(product.image)}
          className="thumbnail"
        />
        <img
          src={product.image3}
          alt={product.name3}
          onClick={() => handleImageClick(product.image3)}
          className="thumbnail"
        />
        <img
          src={product.image4}
          alt={product.name4}
          onClick={() => handleImageClick(product.image4)}
          className="thumbnail"
        />
      </div>
      
      <div className="product-image">
        <img src={mainImage || product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <p className="product-description">{product.description}</p>
        <p className="installments">3 cuotas sin interés de ${(product.price / 3).toFixed(2)}</p>
        <p className="discount">10% de descuento pagando con Transferencia bancaria</p>

        <div className="quantity-selector">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Agregar al carrito
        </button>

        <div className="accordion-section">
          <button onClick={() => setPaymentInfoOpen(!isPaymentInfoOpen)} className="accordion-button">
            Medios de envío
          </button>
          {isPaymentInfoOpen && (
            <div className="accordion-content">
              <p>🚚 Envío a domicilio</p>
              <p>🏬 Retiro en nuestro local</p>
            </div>
          )}
        </div>

        <div className="accordion-section">
          <button onClick={() => setStoreInfoOpen(!isStoreInfoOpen)} className="accordion-button">
            Nuestro local
          </button>
          {isStoreInfoOpen && (
            <div className="accordion-content">
              <p>DIMM Iluminación - Darwin 1212, Chacarita, CABA.</p>
              <p>Showroom de lunes a viernes. Coordiná tu visita.</p>
              <p className="shipping-fee">Costo: Gratis</p>
            </div>
          )}
        </div>

        <div className="product-description">
          <h4>Descripción</h4>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;