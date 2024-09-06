import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts', // Verifica que esta ruta sea correcta
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist'), // Ruta de salida
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Coincide con archivos .ts y .tsx
        use: 'ts-loader', // Usa ts-loader para compilar TypeScript
        exclude: /node_modules/, // Excluye la carpeta node_modules
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Extensiones que Webpack debe resolver
  },
};
