const path = require("path");
const fs = require("fs");

/**
 * Prevent GitHub from not serving _next folder.
 * <https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages>
 */
function bypassJekyll() {
  fs.writeFileSync(path.join(__dirname, "docs/.nojekyll"), "");
}

bypassJekyll();
