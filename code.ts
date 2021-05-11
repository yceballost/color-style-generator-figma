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

  const width = rect.width;
  const height = rect.height;
  
  rect.name = styleNames[i];
  rect.fills = styleColor[i];
  rect.fillStyleId = styleId[i];
  
  rect.y = i * 150;
  
  rect.cornerRadius = 50;

  figma.currentPage.appendChild(rect);
  nodes.push(rect);
}

async function createTextLabel() {
  for (let i = 0; i < numberOfStyles; i++) {
    const colorName = figma.createText();
    
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" })

    colorName.characters = styleNames[i];
    colorName.name = styleNames[i];

    colorName.y = i * 150 + 43;
    colorName.x = 150;
    colorName.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    colorName.fontSize = 18;
    
    figma.currentPage.appendChild(colorName);
    nodes.push(colorName);
  }
};

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
createTextLabel().then(n => figma.closePlugin('Done!'))

