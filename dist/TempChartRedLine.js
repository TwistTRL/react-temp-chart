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

var TempChartRedLine = function (_PureComponent) {
    _inherits(TempChartRedLine, _PureComponent);

    function TempChartRedLine(props) {
        _classCallCheck(this, TempChartRedLine);

        var _this = _possibleConstructorReturn(this, (TempChartRedLine.__proto__ || Object.getPrototypeOf(TempChartRedLine)).call(this, props));

        _this.drawRedLine = function (ctx) {
            // clear canvas
            ctx.canvas.width = ctx.canvas.width;

            var _this$props = _this.props,
                time = _this$props.time,
                minX = _this$props.minX,
                maxX = _this$props.maxX;

            var domX = (0, _PlottingUtils.toDomXCoord_Linear)(_this.canvasW, minX / 1000, maxX / 1000, time);
            ctx.strokeStyle = 'red';
            // draw the red line
            ctx.lineWidth = 5;
            ctx.moveTo(domX, 5);
            ctx.lineTo(domX, _this.canvasH - 5);
            ctx.stroke();
        };

        _this.canvasW = _this.props.width;
        _this.canvasH = _this.props.height;
        return _this;
    }

    _createClass(TempChartRedLine, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.redLineCanvas = this.refs.redLineCanvas;
            this.redLineCtx = this.redLineCanvas.getContext("2d");
            this.drawRedLine(this.redLineCtx);
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.drawRedLine(this.redLineCtx);
        }
    }, {
        key: "render",
        value: function render() {
            // let minXInSecs = minX / 1000, maxXInSecs = maxX / 1000
            return _react2.default.createElement("canvas", {
                className: "redline-canvas",
                ref: "redLineCanvas",
                width: this.canvasW,
                height: this.canvasH
            });
        }
    }]);

    return TempChartRedLine;
}(_react.PureComponent);

exports.default = TempChartRedLine;