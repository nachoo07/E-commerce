import React, { useState } from 'react';
import '../faqPage/faqPage.css';

const FAQPage = () => {
  const faqs = [
    {
      question: '¿Cómo comprar?',
      answer: 'Armá un carrito de compras seleccionando todos los productos que te interesan. Para incluir un producto a tu pedido, hacé click en el botón COMPRAR. También, podés contactarnos para hacer tu pedido por teléfono o email.'
    },
    {
      question: '¿Hacen factura A?',
      answer: 'Sí, ofrecemos factura A. Por favor, asegúrate de solicitarla al realizar tu compra.'
    },
    {
      question: '¿Cómo abono mi pedido?',
      answer: 'Aceptamos varios métodos de pago, incluyendo tarjeta de crédito, débito y transferencias bancarias.'
    },
    {
      question: '¿Hacen envíos al interior?',
      answer: 'Sí, realizamos envíos a todo el país.'
    },
    {
      question: '¿Cuál es el tiempo de entrega de mi pedido?',
      answer: 'El tiempo de entrega puede variar según la ubicación y disponibilidad de productos, generalmente entre 3 y 7 días hábiles.'
    },
    {
      question: '¿Cuál es la política de cambios y devoluciones?',
      answer: 'El producto debe estar en perfectas condiciones. Los cambios/devoluciones se realizan vía email o WhatsApp dentro de las 72h de recibida la mercadería. No realizamos devoluciones de dinero.'
    },
    {
      question: '¿Tengo que pagar por mi devolución?',
      answer: 'Sí, los gastos de envío de las devoluciones corren por cuenta del cliente.'
    },
    {
      question: '¿Dónde puedo recibir mi pedido?',
      answer: 'Recibimos la dirección de entrega al momento de la compra, puedes especificar cualquier dirección dentro de nuestra área de cobertura.'
    },
    {
      question: '¿Voy a recibir el mismo producto que veo en la foto?',
      answer: 'Hacemos todo lo posible para asegurar que los productos coincidan con las imágenes, pero puede haber variaciones menores.'
    },
    {
      question: '¿Tienen sucursales?',
      answer: 'Sí, contamos con varias sucursales. Puedes consultarnos para saber cuál está más cerca de tu ubicación.'
    },
  ];

  return (
    <div className="faq-page">
      <h2>Preguntas Frecuentes</h2>
      <p>¿Dudas sobre tu compra? Encontrá acá las respuestas</p>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? '▾' : '▸'}</span> {question}
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default FAQPage;