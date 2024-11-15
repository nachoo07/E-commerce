import '../footer/Footer.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
     <footer className="footer bg-light text-dark py-4">
      <Container>
        <Row className="mb-4">
          {/* Redes Sociales */}
          <Col xs={12} md={2} className="text-center mb-3">
            <a href="#"><i className="fab fa-instagram fa-2x me-3"></i></a>
            <a href="#"><i className="fab fa-facebook fa-2x"></i></a>
          </Col>

          {/* Sección Nosotros */}
          <Col xs={6} md={2}>
            <h5>Nosotros</h5>
            <ul className="list-unstyled">
              <li><a href="#">¿Quienes Somos?</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Mayoristas y Franquicias</a></li>
              <li><a href="#">Nuestras Sucursales</a></li>
            </ul>
          </Col>

          {/* Sección Ayuda */}
          <Col xs={6} md={2}>
            <h5>Ayuda</h5>
            <ul className="list-unstyled">
              <li><a href="#">Política de cambios y devoluciones</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">¿Cómo Comprar?</a></li>
              <li><a href="#">Términos de uso</a></li>
            </ul>
          </Col>

          {/* Sección Contáctanos */}
          <Col xs={12} md={3}>
            <h5>Contáctanos</h5>
            <ul className="list-unstyled">
              <li>5439814456879</li>
              <li>+5439814456879</li>
              <li><a href="mailto:ecommerce@laargentina.com">ecommerce@laargentina.com</a></li>
              <li>25 de Mayo 431 - San Miguel de Tucumán - Tucumán</li>
            </ul>
          </Col>

          {/* Sección de Newsletter */}
          <Col xs={12} md={3}>
            <h5>Suscribite al newsletter</h5>
            <Form className="d-flex">
              <Form.Control type="email" placeholder="Email" className="me-2" required />
              <Button variant="dark">+</Button>
            </Form>
          </Col>
        </Row>

        {/* Métodos de Pago */}
        <Row className="text-center mb-4">
          <Col>
            <img src="visa-logo.png" alt="Visa" className="payment-logo me-2" />
            <img src="mastercard-logo.png" alt="Mastercard" className="payment-logo me-2" />
            <img src="amex-logo.png" alt="American Express" className="payment-logo me-2" />
            <img src="paypal-logo.png" alt="PayPal" className="payment-logo" />
          </Col>
        </Row>

        {/* Información de Copyright */}
        <Row className="text-center">
          <Col>
            <p className="mb-0">
              Copyright La Argentina - 2024. Todos los derechos reservados. 
              Defensa de las y los consumidores. Para reclamos 
              <a href="#"> ingresá acá</a> / <a href="#">Botón de arrepentimiento</a>
            </p>
            <p className="mb-0">Creado con <a href="#">TiendaNube</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  )
}

export default Footer