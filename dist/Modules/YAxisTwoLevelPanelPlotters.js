"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPrimaryCategoryBitmap = createPrimaryCategoryBitmap;
exports.createSecondaryCategoryBitmap = createSecondaryCategoryBitmap;
exports.drawPrimaryCategory = drawPrimaryCategory;
exports.drawPrimaryCategories = drawPrimaryCategories;
exports.drawSecondaryCategory = drawSecondaryCategory;
exports.drawSecondaryCategories = drawSecondaryCategories;

var _plotUtils = require("plot-utils");

var PRIMARY_PANEL_WIDTH = 30;

function createPrimaryCategoryBitmap(text, canvas) {
  var font = "bold 18px Sans";
  var fillStyle = "white";
  var strokeStyle = "#878787";
  canvas = canvas || document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = font;
  var width = 18;
  var height = ctx.measureText(text).width;
  canvas.width = width;
  canvas.height = height;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.rotate(-Math.PI / 2);

  var _getRotatedAxisCoordi = (0, _plotUtils.getRotatedAxisCoordinate)(width / 2, height / 2, -Math.PI / 2),
      x = _getRotatedAxisCoordi.x,
      y = _getRotatedAxisCoordi.y;

  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
  return canvas;
}

function createSecondaryCategoryBitmap(text, canvas) {
  var font = "bold 12px Sans";
  var fillStyle = "black";
  canvas = canvas || document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = font;
  var width = ctx.measureText(text).width;
  var height = 14;
  canvas.width = width;
  canvas.height = height;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);
  return canvas;
}

function drawPrimaryCategory(ctx, width, height, labelBitmap, bgColor, startDomX, endDomX) {
  var plotWidth = PRIMARY_PANEL_WIDTH;
  var start = Math.round(startDomX);
  var end = Math.round(endDomX);
  var color = bgColor;
  var bitmap = labelBitmap;
  var plotHeight = end - start;
  ctx.fillStyle = color;
  ctx.fillRect(0, start, plotWidth, height);
  if (bitmap.width !== 0 && bitmap.height !== 0) {
    var srcx = Math.round(bitmap.width / 2 - plotWidth / 2);
    var srcy = Math.round(bitmap.height / 2 - plotHeight / 2);
    ctx.drawImage(bitmap, srcx, srcy, plotWidth, plotHeight, 0, start, plotWidth, plotHeight);
  }
}

function drawPrimaryCategories(ctx, width, height, labelBitmaps, bgColors, startDomXs, endDomXs) {
  var plotWidth = PRIMARY_PANEL_WIDTH;
  for (var i = 0; i < labelBitmaps.length; i++) {
    var start = Math.round(startDomXs[i]);
    var end = Math.round(endDomXs[i]);
    var color = bgColors[i];
    var bitmap = labelBitmaps[i];
    var plotHeight = end - start;
    ctx.fillStyle = color;
    ctx.fillRect(0, start, plotWidth, plotHeight);
    if (bitmap.width !== 0 && bitmap.height !== 0) {
      var srcx = Math.round(bitmap.width / 2 - plotWidth / 2);
      var srcy = Math.round(bitmap.height / 2 - plotHeight / 2);
      ctx.drawImage(bitmap, srcx, srcy, plotWidth, plotHeight, 0, start, plotWidth, plotHeight);
    }
  }
}

function drawSecondaryCategory(ctx, width, height, labelBitmap, bgColor, startDomX, endDomX) {
  if (labelBitmap.width === 0 || labelBitmap.height === 0 || labelBitmap.height > height) {
    return;
  }
  var plotWidth = width - PRIMARY_PANEL_WIDTH;
  var xOffset = PRIMARY_PANEL_WIDTH;
  var start = Math.round(startDomX);
  var end = Math.round(endDomX);
  var plotHeight = end - start;
  ctx.fillStyle = bgColor;
  ctx.fillRect(xOffset, start, plotWidth, plotHeight);
  var srcx = 0;
  var srcy = Math.round(labelBitmap.height / 2 - plotHeight / 2);
  ctx.drawImage(labelBitmap, srcx, srcy, plotWidth, plotHeight, xOffset + 5, start, plotWidth, plotHeight);
}

function drawSecondaryCategories(ctx, width, height, labelBitmaps, bgColors, startDomXs, endDomXs) {
  var plotWidth = width - PRIMARY_PANEL_WIDTH;
  var xOffset = PRIMARY_PANEL_WIDTH;
  for (var i = 0; i < labelBitmaps.length; i++) {
    var start = Math.round(startDomXs[i]);
    var end = Math.round(endDomXs[i]);
    var color = bgColors[i];
    var bitmap = labelBitmaps[i];
    var plotHeight = end - start;
    ctx.fillStyle = color;
    ctx.fillRect(xOffset, start, plotWidth, plotHeight);
    if (bitmap.width !== 0 && bitmap.height !== 0) {
      var srcx = 0;
      var srcy = Math.round(bitmap.height / 2 - plotHeight / 2);
      ctx.drawImage(bitmap, srcx, srcy, plotWidth, plotHeight, xOffset + 5, start, plotWidth, plotHeight);
    }
  }
}