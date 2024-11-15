import React from 'react'
import Carrusel1 from '../../assets/carrusel1.jpg'
import Carrusel2 from '../../assets/Untitled-Project.jpg'
import '../main/init.css'
import Carousel from 'react-bootstrap/Carousel';
import CardProducts from '../card/CardProducts';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ContactInfo from '../contact/ContactInfo';

const Init = () => {



  return (

    <>
       <Carousel data-bs-theme="dark" controls={false} interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100 imagen-carrusel"
          src='https://i.pinimg.com/564x/c6/9c/74/c69c7470448af2ff35176f94721f9cd8.jpg'
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imagen-carrusel"
          src={Carrusel2}
          alt="Second slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imagen-carrusel"
          src={Carrusel1}
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <div className='inicio-categoria'>
      <div>
        <img className='imagen-sola' src='https://i.pinimg.com/564x/b0/b6/08/b0b608015cc2153eb5db6d872f44505a.jpg' alt="" />
      </div>
      <div className='inicio-categoria-dos'>
      <img className='imagen-dos' src='https://i.pinimg.com/564x/2e/64/b2/2e64b2ff5168ab2b3f77ad70b4733501.jpg' alt="" />
      <img className='imagen-dos' src='https://i.pinimg.com/564x/1d/52/ee/1d52ee895c198c8ad5a2473a1215691d.jpg' alt="" />
      </div>
    </div>

    <div className='texto-inicio'>
      <h1>Te ofrecemos los mejores productos de </h1>
      <h1>iluminación para tus ambientes</h1>
    </div>
    <CardProducts/>
    <div className='boton-ver-mas'>
  <Link to="/product">
    <Button variant="primary" className='boton-vermas'>
      Ver Mas
    </Button>
  </Link>
</div>
  
<ContactInfo/>

    </>
  )
}

export default Init