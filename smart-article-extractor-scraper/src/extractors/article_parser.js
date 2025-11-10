onst puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { extractLinks, extractVideos } = require('./utils');

async function parseArticle(url) {
let browser;
try {
browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

const html = await page.content();
const $ = cheerio.load(html);

const title = $('meta[property="og:title"]').attr('content') || $('title').text().trim();
const description = $('meta[name="description"]').attr('content') || '';
const author = $('meta[name="author"]').attr('content') ? [$('meta[name="author"]').attr('content')] : [];
const date = $('meta[property="article:published_time"]').attr('content') || new Date().toISOString();
const canonicalLink = $('link[rel="canonical"]').attr('href') || url;
const image = $('meta[property="og:image"]').attr('content') || '';
const lang = $('html').attr('lang') || 'en';
const links = extractLinks($);
const videos = extractVideos($);
const text = $('article').text() || $('body').text();

return {
url,
loadedUrl: page.url(),
title,
softTitle: title,
date,
originalDate: date,
author,
publisher: null,
copyright: '',
favicon: $('link[rel="icon"]').attr('href') || '',
description,
lang,
canonicalLink,
tags: [],
image,
videos,
links,
text,
pageTitle: title
};
} catch (err) {
console.error(`Failed to parse article ${url}:`, err);
return { url, error: err.message };
} finally {
if (browser) await browser.close();
}
}

module.exports = { parseArticle };