// 1. Buscar todos los styles del documento
// 2. Sacar el nombre y el color
// 3. Crear una grid en el documento con todos los colores y su nombre
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const styles = figma.getLocalPaintStyles();
const styleNames = styles.map((style) => style.name);
const styleColor = styles.map((style) => style.paints);
const styleId = styles.map((style) => style.id);
// console.log(styleColor[0]);
// console.log(styleNames);
// Saber la cantidad de estilos que hay (mirando cuantos objetos hay en el array)
const numberOfStyles = styles.length;
// Lo que se genera en el canvas
const nodes = [];
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
function createTextLabel() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < numberOfStyles; i++) {
            const colorName = figma.createText();
            yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
            colorName.characters = styleNames[i];
            colorName.name = styleNames[i];
            colorName.y = i * 150 + 43;
            colorName.x = 150;
            colorName.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
            colorName.fontSize = 18;
            figma.currentPage.appendChild(colorName);
            nodes.push(colorName);
        }
    });
}
;
figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
createTextLabel().then(n => figma.closePlugin('Done!'));
