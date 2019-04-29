"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PlottingUtils = require("./PlottingUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TempChart = function (_PureComponent) {
    _inherits(TempChart, _PureComponent);

    function TempChart(props) {
        _classCallCheck(this, TempChart);

        var _this = _possibleConstructorReturn(this, (TempChart.__proto__ || Object.getPrototypeOf(TempChart)).call(this, props));

        _this.drawTempChart = function (ctx) {
            var _this$props = _this.props,
                minX = _this$props.minX,
                maxX = _this$props.maxX,
                minY = _this$props.minY,
                maxY = _this$props.maxY,
                data = _this$props.data;

            var fromBackgroundFillData = 40;

            ctx.clearRect(0, 0, _this.canvasW, _this.canvasH);

            for (var i = 0; i < 5; i++) {
                var fillStyle = void 0;
                if (fromBackgroundFillData % 10 !== 0) {
                    fillStyle = 'white';
                } else {
                    fillStyle = '#fff3e4';
                }
                ctx.beginPath();
                ctx.fillStyle = fillStyle;
                var fromBackGroundDomY = (0, _PlottingUtils.toDomYCoord_Linear)(_this.canvasH, 18, 43, fromBackgroundFillData);
                var toBackGroundDomY = (0, _PlottingUtils.toDomYCoord_Linear)(_this.canvasH, 18, 43, fromBackgroundFillData - 5);
                ctx.rect(0, fromBackGroundDomY, _this.canvasW, toBackGroundDomY - fromBackGroundDomY);
                fromBackgroundFillData -= 5;
                ctx.fill();
            }

            data.map(function (d) {
                var domY = void 0,
                    domX = (0, _PlottingUtils.toDomXCoord_Linear)(_this.canvasW, minX / 1000, maxX / 1000, d["time"]);

                ctx.beginPath();

                var circle = void 0;
                if (d["temp"] instanceof Array) {
                    var minDomY = (0, _PlottingUtils.toDomYCoord_Linear)(_this.canvasH, 18, 43, d["temp"][0]);
                    var maxDomY = (0, _PlottingUtils.toDomYCoord_Linear)(_this.canvasH, 18, 43, d["temp"][1]);
                    var diff = Math.abs(maxDomY - minDomY);

                    if (diff < 9) {
                        _this.roundRect(ctx, domX - 4, maxDomY - 4, domX + 4, minDomY + 4, 20, _this.grd);
                    } else {
                        _this.roundRect(ctx, domX - 4, maxDomY, domX + 4, minDomY, 20, _this.grd);
                    }
                } else {
                    domY = (0, _PlottingUtils.toDomYCoord_Linear)(_this.canvasH, 18, 43, d["temp"]);

                    if (d["temp"] < 35) {
                        circle = _this.getCircle("black");
                    } else if (d["temp"] > 37) {
                        circle = _this.getCircle("red");
                    } else {
                        circle = _this.getCircle("green");
                    }

                    ctx.drawImage(circle, domX - circle.width / 2, domY - circle.height / 2);
                }
            });
        };

        _this.canvasW = _this.props.width;
        _this.canvasH = _this.props.height;
        return _this;
    }

    _createClass(TempChart, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.tempChartCanvas = this.refs.tempChartCanvas;
            this.tempChartCtx = this.tempChartCanvas.getContext("2d");
            this.drawTempChart(this.tempChartCtx);

            this.grd = this.tempChartCtx.createLinearGradient(0, 0, 0, this.canvasH);
            this.grd.addColorStop(0.168, 'rgba(255, 86, 86, 1.000)');
            this.grd.addColorStop(0.304, 'rgba(170, 255, 170, 1.000)');
            this.grd.addColorStop(0.452, 'rgba(86, 170, 255, 1.000)');
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.drawTempChart(this.tempChartCtx);
        }
    }, {
        key: "roundRect",
        value: function roundRect(ctx, x0, y0, x1, y1, r, color) {
            var w = x1 - x0;
            var h = y1 - y0;
            if (r > w / 2) r = w / 2;
            if (r > h / 2) r = h / 2;
            ctx.beginPath();
            ctx.moveTo(x1 - r, y0);
            ctx.quadraticCurveTo(x1, y0, x1, y0 + r);
            ctx.lineTo(x1, y1 - r);
            ctx.quadraticCurveTo(x1, y1, x1 - r, y1);
            ctx.lineTo(x0 + r, y1);
            ctx.quadraticCurveTo(x0, y1, x0, y1 - r);
            ctx.lineTo(x0, y0 + r);
            ctx.quadraticCurveTo(x0, y0, x0 + r, y0);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }
    }, {
        key: "getCircle",
        value: function getCircle(color) {
            if (color === "green") {
                if (!this.greenCircle) {
                    var canvas = document.createElement("canvas");
                    canvas.width = 6;
                    canvas.height = 6;
                    var ctx = canvas.getContext("2d");
                    ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                    ctx.fillStyle = '#4cb447';
                    ctx.fill();
                    this.greenCircle = canvas;
                }
                return this.greenCircle;
            } else if (color === "black") {
                if (!this.blackCircle) {
                    var _canvas = document.createElement("canvas");
                    _canvas.width = 6;
                    _canvas.height = 6;
                    var _ctx = _canvas.getContext("2d");
                    _ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                    _ctx.fillStyle = '#727272';
                    _ctx.fill();
                    this.blackCircle = _canvas;
                }
                return this.blackCircle;
            } else {
                if (!this.redCircle) {
                    var _canvas2 = document.createElement("canvas");
                    _canvas2.width = 6;
                    _canvas2.height = 6;
                    var _ctx2 = _canvas2.getContext("2d");
                    _ctx2.arc(3, 3, 2, 0, 2 * Math.PI);
                    _ctx2.fillStyle = '#cc7766';
                    _ctx2.fill();
                    this.redCircle = _canvas2;
                }
                return this.redCircle;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var styles = {
                tempChartCanvas: { zIndex: -1 }
            };
            return _react2.default.createElement("canvas", {
                className: "temp-chart-canvas",
                ref: "tempChartCanvas",
                width: this.canvasW,
                height: this.canvasH,
                style: styles.tempChartCanvas
            });
        }
    }]);

    return TempChart;
}(_react.PureComponent);

exports.default = TempChart;