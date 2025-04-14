import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontUrl = 'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIA.woff2';
const fontPath = path.join(__dirname, '../public/fonts/Space_Grotesk_Regular.json');

// Create fonts directory if it doesn't exist
if (!fs.existsSync(path.dirname(fontPath))) {
  fs.mkdirSync(path.dirname(fontPath), { recursive: true });
}

// Download the font
https.get(fontUrl, (response) => {
  const file = fs.createWriteStream(fontPath);
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Font downloaded successfully');
  });
}).on('error', (err) => {
  console.error('Error downloading font:', err.message);
}); 