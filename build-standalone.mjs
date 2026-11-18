import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const cacheImagesDir = path.join(rootDir, '.build-cache', 'images');
const templateDir = path.join(rootDir, 'src', 'template');

const css = fs.readFileSync(path.join(templateDir, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(templateDir, 'app.js'), 'utf8');
let html = fs.readFileSync(path.join(templateDir, 'page.html'), 'utf8');

const imageFiles = fs
  .readdirSync(cacheImagesDir)
  .filter((file) => file.endsWith('.jpg'))
  .sort();

const imagesMap = {};
for (const file of imageFiles) {
  const key = file.replace(/\.jpg$/, '');
  const buffer = fs.readFileSync(path.join(cacheImagesDir, file));
  imagesMap[key] = `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

if (!imagesMap.hero_churrasco_brasa) {
  throw new Error('Missing hero_churrasco_brasa optimized image.');
}

const defaultConfig = {
  contact: {
    restaurantName: 'Fogo Nobre',
    whatsappDigits: '5511998423100',
    phoneDisplay: '(11) 3421-8890',
    address: 'Alameda Lorena, 1480 — Jardins, São Paulo - SP',
    hoursWeekdays: 'Terça a Sexta: 11h30 às 15h30 e 18h30 às 23h',
    hoursWeekends: 'Sábados, Domingos e Feriados: 11h30 às 23h',
    instagramUrl: 'https://instagram.com/fogonobrechurrascaria',
    facebookUrl: 'https://facebook.com/fogonobrechurrascaria',
    mapsQuery: 'Alameda Lorena, 1480, Jardins, Sao Paulo, SP',
  },
  prices: {},
};

const safeJson = (obj) =>
  JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

html = html
  .replace('/*__INLINE_CSS__*/', () => css)
  .replace('/*__INLINE_JS__*/', () => js)
  .replace('__HERO_IMAGE_DATA_URI__', () => imagesMap.hero_churrasco_brasa)
  .replace('__SITE_CONFIG_JSON__', () => safeJson(defaultConfig))
  .replace('__SITE_IMAGES_JSON__', () => safeJson(imagesMap));

const outPath = path.join(rootDir, 'index.html');
fs.writeFileSync(outPath, html, 'utf8');

const sizeMb = (Buffer.byteLength(html, 'utf8') / (1024 * 1024)).toFixed(2);
console.log(`Built standalone index.html with ${imageFiles.length} Base64 images (${sizeMb} MB).`);
