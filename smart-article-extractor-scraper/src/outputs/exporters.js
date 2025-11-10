onst fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

async function saveJSON(data, filePath) {
try {
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Saved JSON to ${filePath}`);
} catch (err) {
console.error('Failed to save JSON:', err);
}
}

async function saveCSV(data, filePath) {
try {
const parser = new Parser();
const csv = parser.parse(data);
fs.writeFileSync(filePath, csv, 'utf-8');
console.log(`Saved CSV to ${filePath}`);
} catch (err) {
console.error('Failed to save CSV:', err);
}
}

module.exports = { saveJSON, saveCSV };