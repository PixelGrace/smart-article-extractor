onst fs = require('fs');
const path = require('path');
const { parseArticle } = require('./extractors/article_parser');
const { saveJSON, saveCSV } = require('./outputs/exporters');
const settings = require('./config/settings.example.json');
const readline = require('readline');

async function main() {
try {
const inputPath = settings.inputFile || path.join(__dirname, '../../data/inputs.sample.txt');
const urls = fs.readFileSync(inputPath, 'utf-8').split('\n').filter(Boolean);
const results = [];

for (const url of urls) {
console.log(`Scraping ${url}...`);
const article = await parseArticle(url);
results.push(article);
}

const outputDir = path.join(__dirname, '../../data');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

await saveJSON(results, path.join(outputDir, 'output.json'));
await saveCSV(results, path.join(outputDir, 'output.csv'));

console.log('Scraping completed successfully.');
} catch (err) {
console.error('Error in runner:', err);
}
}

main();