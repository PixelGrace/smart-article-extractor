function extractLinks($) {
  const links = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) links.push(href);
  });
  return links;
}

function extractVideos($) {
  const videos = [];
  $('video, iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) videos.push(src);
  });
  return videos;
}

module.exports = { extractLinks, extractVideos };