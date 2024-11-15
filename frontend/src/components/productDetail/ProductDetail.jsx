import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsProvider } from '../../context/productos/ProductsContext';
import { CartContext } from '../../context/carrito/CarritoContext';
import '../productDetail/productDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { productos } = useContext(ProductsProvider);
  const { addItem } = useContext(CartContext);

  // Encuentra el producto correspondiente por ID
  const product = productos.find((item) => item.id.toString() === id);

  // Estado para la imagen principal
  const [mainImage, setMainImage] = useState(null);

  // Configura la imagen principal cuando el producto esté disponible
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
    }
  }, [product]);

  // Estados para los acordeones
  const [isPaymentInfoOpen, setPaymentInfoOpen] = useState(false);
  const [isStoreInfoOpen, setStoreInfoOpen] = useState(false);

  // Si no encuentra el producto, muestra un mensaje de error o un estado de carga
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

    // Función para actualizar la imagen principal
    const handleImageClick = (image) => {
        setMainImage(image);
      };


// En tu componente ProductDetail
const handleAddToCart = () => {
    addItem(product, quantity); // Pasa la cantidad actual del contador
  };

  // Función para manejar el incremento del contador
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Función para manejar el decremento del contador
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-detail-container">
     
      <div className="product-images">
        {/* Miniaturas que cambian la imagen principal al hacer clic */}
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
      
      {/* Imagen principal */}
      <div className="product-image">
        <img src={mainImage} alt={product.name} />
      </div>



      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-price">${product.price.toLocaleString()}</p>
        <p className="product-description">{product.description}</p>
        <p className="installments">3 cuotas sin interés de ${(product.price / 3).toFixed(2)}</p>
        <p className="discount">10% de descuento pagando con Transferencia bancaria</p>

        {/* Contador de cantidad */}
        <div className="quantity-selector">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>

        {/* Botón de agregar al carrito */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Agregar al carrito
        </button>

        {/* Acordeón de Medios de envío */}
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

        {/* Acordeón de Información de Locales */}
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

        {/* Descripción del producto */}
        <div className="product-description">
          <h4>Descripción</h4>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;