import Card from 'react-bootstrap/Card';
import fotoadmin from '../../assets/carrusel1.jpg';
import { useNavigate } from 'react-router-dom';
import '../admin/opcionsAdmin.css';

const OpcionsAdmin = () => {
  const navigate = useNavigate();

  // Definimos las rutas específicas para cada tarjeta
  const cardOptions = [
    { title: 'Productos', description: 'Descripción de la opción 1', route: '/ruta1' },
    { title: 'Usuarios', description: 'Descripción de la opción 2', route: '/ruta2' },
    { title: 'Stock', description: 'Descripción de la opción 3', route: '/ruta3' },
    { title: 'Ventas', description: 'Descripción de la opción 4', route: '/ruta4' },
    { title: 'Opción 5', description: 'Descripción de la opción 5', route: '/ruta5' },
    { title: 'Opción 6', description: 'Descripción de la opción 6', route: '/ruta6' },
  ];

  const handleCardClick = (route) => {
    navigate(route); // Redirige a la ruta específica de cada tarjeta
  };

  return (
    <div className="card-container">
      {cardOptions.map((option, index) => (
        <Card 
          key={index} 
          className="card-admin" 
          onClick={() => handleCardClick(option.route)}
          style={{ cursor: 'pointer' }} // Indica que es clickeable
        >
          <Card.Img src={fotoadmin} />
          <Card.Body>
            <Card.Title>{option.title}</Card.Title>
            <Card.Text>
              {option.description}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default OpcionsAdmin;