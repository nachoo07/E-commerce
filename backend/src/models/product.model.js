import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
      maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
      match: [/^[A-Za-z0-9\s]+$/, 'El nombre solo puede contener letras, números y espacios'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
      maxlength: [200, 'La descripción no puede exceder los 200 caracteres'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: ['Bebidas', 'Golosinas', 'Limpieza', 'Lácteos', 'Otros'],
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser menor que 0'],
      max: [1000000, 'El precio no puede exceder $1,000,000'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser menor que 0'],
      max: [500, 'El stock no puede exceder 500 unidades'],
    },
    image: {
      type: String,
      required: [true, 'La imagen principal es obligatoria'],
      match: [
        /^(http|https):\/\/.*\.(jpg|jpeg|png|gif|bmp)$/,
        'La URL de la imagen debe ser válida y terminar en .jpg, .jpeg, .png, .gif o .bmp',
      ],
    },
    image2: {
      type: String,
      match: [
        /^(http|https):\/\/.*\.(jpg|jpeg|png|gif|bmp)$/,
        'La URL de la imagen debe ser válida y terminar en .jpg, .jpeg, .png, .gif o .bmp',
      ],
    },
    image3: {
      type: String,
      match: [
        /^(http|https):\/\/.*\.(jpg|jpeg|png|gif|bmp)$/,
        'La URL de la imagen debe ser válida y terminar en .jpg, .jpeg, .png, .gif o .bmp',
      ],
    },
    image4: {
      type: String,
      match: [
        /^(http|https):\/\/.*\.(jpg|jpeg|png|gif|bmp)$/,
        'La URL de la imagen debe ser válida y terminar en .jpg, .jpeg, .png, .gif o .bmp',
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Product', productSchema);