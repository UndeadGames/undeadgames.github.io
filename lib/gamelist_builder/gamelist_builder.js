import { readFileSync } from 'fs';
import { generateGameListHTML } from  './webtoys.js';

const gameList = JSON.parse(readFileSync('../../undeadgames.json'));
const style = readFileSync('style_light.css');
console.log(generateGameListHTML(gameList, style));
