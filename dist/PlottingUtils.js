"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toDomYCoord_Linear = toDomYCoord_Linear;
exports.fromDomYCoord_Linear = fromDomYCoord_Linear;
exports.toDomXCoord_Linear = toDomXCoord_Linear;
exports.fromDomXCoord_Linear = fromDomXCoord_Linear;
//height: canvas px
// minY: lowest value
// maxY: highest value
// dataY: value
function toDomYCoord_Linear(height, minY, maxY, dataY) {
    return height - (dataY - minY) / ((maxY - minY) / height);
}

function fromDomYCoord_Linear(height, minY, maxY, domY) {
    return (height - domY) * ((maxY - minY) / height) + minY;
}

function toDomXCoord_Linear(width, minX, maxX, dataX) {
    return (dataX - minX) / ((maxX - minX) / width);
}

function fromDomXCoord_Linear(width, minX, maxX, domX) {
    return domX * ((maxX - minX) / width) + minX;
}