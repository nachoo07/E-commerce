import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';


const ProductsFormAdmin = ({ producto, setProducto, handleClose, onSubmit }) => {
    const [nuevoProducto, setNuevoProducto] = useState(producto || {
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: "",
        image2: "",
        image3: "",
        image4: ""
    });

    useEffect(() => {
        setNuevoProducto(producto || {
            name: "",
            description: "",
            category: "",
            price: "",
            stock: "",
            image: "",
            image2: "",
            image3: "",
            image4: ""
        });
    }, [producto]);

    const handleChange = (e) => {
        setNuevoProducto({
            ...nuevoProducto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", nuevoProducto);
        onSubmit(nuevoProducto);
        handleClose();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={nuevoProducto.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                        value={nuevoProducto.category}
                        onChange={handleChange}
                        name="category"
                        required
                        aria-label="Selecciona la categoría del producto">
                        <option value="">Selecciona una categoría</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Golosinas">Golosinas</option>
                        <option value="Limpieza">Limpieza</option>
                        <option value="Lacteos">Lácteos</option>
                        <option value="Otros">Otros</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text"
                        value={nuevoProducto.description}
                        onChange={handleChange}
                        required
                        name='description'
                        placeholder="Descripcion del Producto"
                        minLength={3}
                        maxLength={50}

                        pattern="[A-Za-z0-9_\s]+"
                        title="El nombre debe contener solo letras, números, guiones bajos (_) o guiones medios (-)."
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number"
                        value={nuevoProducto.stock}
                        onChange={handleChange}
                        name='stock'
                        required
                        min={0}
                        step={1}
                        max={500}
                        pattern="[0-9]*"
                        placeholder="Stock del Producto" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Precio</Form.Label>
                    <InputGroup>
                        <InputGroup.Text className='bg-warning'>$</InputGroup.Text>
                        <Form.Control type="number"
                            value={nuevoProducto.price}
                            onChange={handleChange}
                            name='price'
                            pattern="[0-9]*"
                            placeholder="Precio del Producto"
                            required
                            min={0}
                            step={1}
                        />
                    </InputGroup>
                    <Form.Text id="basic-addon4">
                        Precio máximo: $1.000.000
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-5" >
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text"
                        value={nuevoProducto.image}
                        onChange={handleChange}
                        name='image'
                        placeholder="Imagen del Producto" />
                    <Form.Text id="basic-addon4">
                        Debe ingresar un enlace válido a una imagen (formatos admitidos: jpg, jpeg, gif, png, bmp).
                    </Form.Text>
                </Form.Group>
               
                <Form.Group className="mb-5" >
                    <Form.Label>Imagen 3</Form.Label>
                    <Form.Control type="text"
                        value={nuevoProducto.image2}
                        onChange={handleChange}
                        name='image2'
                        placeholder="Imagen del Producto" />
                    <Form.Text id="basic-addon4">
                        Debe ingresar un enlace válido a una imagen (formatos admitidos: jpg, jpeg, gif, png, bmp).
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-5" >
                    <Form.Label>Imagen 4</Form.Label>
                    <Form.Control type="text"
                        value={nuevoProducto.image3}
                        onChange={handleChange}
                        name='image3'
                        placeholder="Imagen del Producto" />
                    <Form.Text id="basic-addon4">
                        Debe ingresar un enlace válido a una imagen (formatos admitidos: jpg, jpeg, gif, png, bmp).
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-5" >
    <Form.Label>Imagen 4</Form.Label>
    <Form.Control type="text"
        value={nuevoProducto.image4}
        onChange={handleChange}
        name='image4'
        placeholder="Imagen del Producto" />
    <Form.Text id="basic-addon4">
        Debe ingresar un enlace válido a una imagen (formatos admitidos: jpg, jpeg, gif, png, bmp).
    </Form.Text>
</Form.Group>
            <Button type="submit">
                {producto ? "Actualizar Producto" : "Agregar Producto"}
            </Button>
        </Form>
    );
};

export default ProductsFormAdmin;