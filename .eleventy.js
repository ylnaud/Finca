module.exports = function(eleventyConfig) {

  // Filtro de fecha (soluciona el error)
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    if (format === 'yyyy-MM-dd') return `${yyyy}-${mm}-${dd}`;
    if (format === 'dd/MM/yyyy') return `${dd}/${mm}/${yyyy}`;
    if (format === 'yyyy') return `${yyyy}`;
    return `${dd}/${mm}/${yyyy}`;
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
