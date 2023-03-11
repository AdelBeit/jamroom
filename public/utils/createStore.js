const fs = require("fs");
const path = require("path");

// format the file name for naming the symbols in the icon store so that you can later reference them
const formatFileName = (name) => {
  // edit the name as needed
  return name.replace(/.svg/g, "");
};

// Replace the 'svg' tag with a 'symbol' tag and modify the attributes
const replaceSvgWithSymbol = (svgString, fileName) => {
  // Remove the 'xmlns' attribute
  svgString = svgString.replace(/ xmlns=".+?"/g, "");

  // Add an 'id' attribute with the name of the file, and replace spaces with underscores
  fileName = formatFileName(fileName);
  svgString = svgString.replace(/<svg/, `<symbol id="${fileName}"`);

  // Remove 'width' and 'height' from <symbol> elements but no other element
  svgString = svgString.replace(
    /<symbol(.+?)(width=".+?")(.+?)(height=".+?")(.+?)>/g,
    "<symbol$1$3$5>"
  );
  // get rid of extra white space
  svgString = svgString.replace(/ +/g, " ");

  // get rid of fill and stroke
  svgString = svgString.replace(/ fill="(?!none)[^"]+"/g, "");
  svgString = svgString.replace(/ stroke="(?!none)[^"]+"/g, "");

  return svgString.replace(/<\/svg>/g, "</symbol>");
};

const createStore = (storePath, folderPath) => {
  // Read all the SVG files in the specified folder
  let svgFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".svg"));

  // Create a new SVG file with all the symbols
  let symbolsSvg = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n`;
  svgFiles.forEach((svgFile) => {
    const svgString = fs.readFileSync(path.join(folderPath, svgFile), "utf8");
    symbolsSvg += replaceSvgWithSymbol(svgString, svgFile) + "\n";
  });
  symbolsSvg += "</svg>";

  // Write the new SVG file
  fs.writeFileSync(path.join("./", storePath), symbolsSvg);
};

createStore("/svgs/stores/icons.svg", "./svgs/static/");
