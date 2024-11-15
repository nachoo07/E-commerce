import '../navbar/Navigator.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useState, useEffect, useContext } from 'react';
import CardIcon from '../carrito/CardIcon/CardIcon';
import { BsFillPersonFill } from "react-icons/bs";
//import LoginDrawer from '../login/Login';


const Navigator = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);

  const titles = [
    "Consultar Stock - Hay productos que tienen tiempo de elaboración",
    "Ofertas de la semana - ¡Descuentos increíbles!",
    "¡Nuevas colecciones disponibles ahora!",
    "Envíos gratis en compras mayores a $2000"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const toggleLoginDrawer = () => {
    setIsLoginDrawerOpen(!isLoginDrawerOpen);
  };
  return (
    <>
      <div className="dynamic-text-bar">
        <div className="animated-text">
          <p>{titles[currentIndex]}</p>
        </div>
      </div>
      <Navbar expand="lg" className="bg-body-tertiary navegador">
        <div onClick={() => navigate("/")} className="logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Productos"
              className="dropdown"
              id="basic-nav-dropdown"
              onMouseEnter={(e) => e.currentTarget.classList.add('show')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('show')}
              onClick={(e) => {
                e.preventDefault();
                navigate('/product');
              }}
            >
              <NavDropdown.Item onClick={() => navigate("/products/colgantes")}>Colgantes</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products/exterior")}>Exterior</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products/lamparas")}>Lámparas</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products/mesa-escritorio")}>Mesa y Escritorio</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products/pared")}>Pared</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products/pie")}>Pie</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products/plafones")}>Plafones</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate("/faqpage")} className="menu-item">Preguntas Frecuentes</Nav.Link>
            <Nav.Link onClick={() => navigate("/admin")} className="menu-item">Admin Panel</Nav.Link>
            <Nav.Link onClick={() => navigate("/product")} className="menu-item">Promociones</Nav.Link>
            <Nav.Link onClick={() => navigate("/advisory")} className="menu-item">Asesoramiento</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")} className="menu-item">Contacto</Nav.Link>
          </Nav>
          <div className="navbar-search-cart">
            <div className="search-container">
              <input type="text" placeholder="Buscar productos..." className="search-input" />
              <i className="fas fa-search search-icon"></i>
            </div>
            <CardIcon />
            <BsFillPersonFill size={24} />
          </div>
        </Navbar.Collapse>
      </Navbar>
      {isLoginDrawerOpen && <LoginDrawer onClose={toggleLoginDrawer} />}
    </>
  );
};

export default Navigator;