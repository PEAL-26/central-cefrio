import * as fs from 'node:fs';
import * as path from 'node:path';

export function convertImageToBase64(image: string) {
  // Caminho relativo para o arquivo de imagem
  const imagePath = path.join(__dirname, image);

  // Leia a imagem como buffer e converta para base64
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  const imageSplitted = image.split('.');
  const ext = imageSplitted[imageSplitted.length - 1];

  // Crie a URI com o prefixo adequado
  const mimeType = `image/${ext}`; // Altere para o tipo MIME correto (png, gif, etc.)
  const dataUri = `data:${mimeType};base64,${base64Image}`;

  return dataUri;
}
