const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Filtro de fecha con Luxon
  eleventyConfig.addFilter("date", function(dateObj, format) {
    const fmt = format || "dd/MM/yyyy";
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat(fmt);
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
