// 1. Buscar todos los styles del documento
// 2. Sacar el nombre y el color
// 3. Crear una grid en el documento con todos los colores y su nombre

const styles = figma.getLocalPaintStyles();
const styleNames = styles.map((style) => style.name);
const styleColor = styles.map((style) => style.paints);
const styleId = styles.map((style) => style.id);

// console.log(styleColor[0]);
// console.log(styleNames);

// Saber la cantidad de estilos que hay (mirando cuantos objetos hay en el array)
const numberOfStyles = styles.length;

// Lo que se genera en el canvas
const nodes: SceneNode[] = [];
for (let i = 0; i < numberOfStyles; i++) {
  const rect = figma.createRectangle();
  rect.name = styleNames[i];
  rect.y = i * 150;
  rect.fills = styleColor[i];
  rect.cornerRadius = 50;
  rect.fillStyleId = styleId[i];
  figma.currentPage.appendChild(rect);
  nodes.push(rect);
}

for (let i = 0; i < numberOfStyles; i++) {
  figma.loadFontAsync({ family: "Roboto", style: "Regular" })

  const colorName = figma.createText();
  
  // colorName.characters = styleNames[i];
  colorName.name = styleNames[i];
  colorName.y = i * 150 + 43;
  colorName.x = 150;
  colorName.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
  figma.currentPage.appendChild(colorName);
  nodes.push(colorName);
}

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin("Done!");

