"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TempChartYAxis = function (_PureComponent) {
    _inherits(TempChartYAxis, _PureComponent);

    function TempChartYAxis(props) {
        _classCallCheck(this, TempChartYAxis);

        var _this = _possibleConstructorReturn(this, (TempChartYAxis.__proto__ || Object.getPrototypeOf(TempChartYAxis)).call(this, props));

        _this.toDomYCoord_Linear = function (height, minY, maxY, dataY) {
            return height - (dataY - minY) / ((maxY - minY) / height);
        };

        _this.drawYAxis = function (ctx) {
            var labels = [20, 30, 40];
            // clear canvas
            ctx.canvas.width = ctx.canvas.width;

            // draw the y-axis line
            ctx.lineWidth = 3;
            ctx.moveTo(_this.canvasW, 5);
            ctx.lineTo(_this.canvasW, _this.canvasH - 5);
            ctx.stroke();

            // label styling
            ctx.font = "600 14px MuseoSans Sans";
            ctx.textBaseline = "middle";
            ctx.fillStyle = '#373c62';

            for (var i = 0; i < labels.length; i++) {
                var posDomY = _this.toDomYCoord_Linear(_this.canvasH, 18, 43, labels[i]);
                // ctx.moveTo(this.canvasW - 10, posDomY)
                // ctx.lineTo(this.canvasW, posDomY)
                ctx.fillText(labels[i], _this.canvasW - 25, posDomY);
            }
            ctx.stroke();
        };

        _this.canvasW = _this.props.canvasW;
        _this.canvasH = _this.props.canvasH;
        _this.minY = _this.props.minY;
        _this.maxY = _this.props.maxY;
        return _this;
    }

    _createClass(TempChartYAxis, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.tempChartYAxisCanvas = this.refs.tempChartYAxisCanvas;
            this.tempChartYAxisCtx = this.tempChartYAxisCanvas.getContext("2d");
            this.drawYAxis(this.tempChartYAxisCtx);
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.minY = this.props.minY;
            this.maxY = this.props.maxY;
            this.drawYAxis(this.tempChartYAxisCtx);
        }
    }, {
        key: "roundToNearestTenth",
        value: function roundToNearestTenth(n) {
            return (parseInt(n / 10, 10) + 1) * 10;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("canvas", {
                className: "temp-chart-y-axis",
                ref: "tempChartYAxisCanvas",
                style: { position: "absolute" },
                width: this.canvasW,
                height: this.canvasH
            });
        }
    }]);

    return TempChartYAxis;
}(_react.PureComponent);

exports.default = TempChartYAxis;