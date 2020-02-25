'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PlotInteractionBoxProvider = require('./PlotInteraction/PlotInteractionBoxProvider');

var _PlotInteractionBoxProvider2 = _interopRequireDefault(_PlotInteractionBoxProvider);

var _PlottingUtils = require('./PlottingUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function round5(x) {
  return Math.round(Math.ceil(x / 5) * 5);
}

var YAXIS_FONT_STYLE = {
  size: 12,
  color: 'black',
  fontFamily: 'MuseoSans, sans-serif'
};

var YAxis = function (_PureComponent) {
  _inherits(YAxis, _PureComponent);

  function YAxis(props) {
    _classCallCheck(this, YAxis);

    var _this = _possibleConstructorReturn(this, (YAxis.__proto__ || Object.getPrototypeOf(YAxis)).call(this, props));

    _this.canvasW = _this.props.canvasW;
    _this.canvasH = _this.props.canvasH;
    _this.minY = _this.props.minY;
    _this.maxY = _this.props.maxY;
    _this.yAxisSkipInterval = 50;
    _this.yAxisLabelTextCanvasCache = {};
    _this.handlePan = _this.handlePan.bind(_this);
    _this.handlePanned = _this.handlePanned.bind(_this);
    _this.prevPanDist = 0;
    _this.dynamicMaxY = 0;
    _this.initMaxY = _this.props.maxY;
    return _this;
  }

  _createClass(YAxis, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
      this.yAxisLabels = this.generateYAxisLabels(this.maxY * 100);
      this.yAxisCanvas = this.refs.yAxisCanvas;
      this.yAxisCtx = this.yAxisCanvas.getContext('2d');
      this.setUpCtx(this.yAxisCtx);
      this.drawYAxis(this.yAxisCtx, this.getYAxisLabelSkipInterval(this.minY, this.maxY, this.canvasH, this.yAxisLabelPadding, 20));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding;
      this.minY = this.props.minY;
      this.maxY = this.props.maxY;
      this.drawYAxis(this.yAxisCtx, this.getYAxisLabelSkipInterval(this.minY, this.maxY, this.canvasH, this.yAxisLabelPadding, 20));
    }
  }, {
    key: 'toDomYCoord_Linear',
    value: function toDomYCoord_Linear(height, minY, maxY, dataY) {
      return height - (dataY - minY) / ((maxY - minY) / height);
    }
  }, {
    key: 'getYAxisLabelSkipInterval',
    value: function getYAxisLabelSkipInterval(minY, maxY, height) {
      var labelPadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
      var labelTextHeight = arguments[4];

      var numOfLabelsCanFit = Math.round(height / (labelTextHeight + labelPadding));

      return round5((maxY - minY) / numOfLabelsCanFit);
    }
  }, {
    key: 'generateYAxisLabels',
    value: function generateYAxisLabels(maxY) {
      var yAxisLabels = [];
      var yAxisLabelInterval = 1;

      for (var curYAxisLabel = 0; curYAxisLabel < round5(maxY); curYAxisLabel += yAxisLabelInterval) {
        yAxisLabels.push(curYAxisLabel);
      }

      return yAxisLabels;
    }
  }, {
    key: 'setUpCtx',
    value: function setUpCtx(ctx) {
      // y-axis vertical line styling
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2.5;
      // text styling
      ctx.font = '500 ' + YAXIS_FONT_STYLE.size + 'px ' + YAXIS_FONT_STYLE.fontFamily;
      ctx.lineWidth = 0.6;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'gray';
      this.textHeight = ctx.measureText('M').width;
    }
  }, {
    key: 'drawYAxis',
    value: function drawYAxis(ctx, yAxisLabelInterval) {
      var yAxisHorizontalLineWidth = 5;

      // clear canvas
      ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      ctx.beginPath();

      // draw the y-axis vertical line
      ctx.moveTo(this.canvasW, 5);
      ctx.lineTo(this.canvasW, this.canvasH - 5);

      // draw the positive labels and horizontal lines
      for (var i = 0; i < this.maxY; i += yAxisLabelInterval) {
        var domY = Math.floor(this.toDomYCoord_Linear(this.canvasH, this.minY, this.maxY, this.yAxisLabels[i]));
        ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, domY);
        ctx.lineTo(this.canvasW, domY);
        ctx.drawImage(this.getTextCanvas(this.yAxisLabels[i]), 0, domY - this.textHeight / 2);
      }

      if (this.minY < 0) {
        for (var _i = yAxisLabelInterval; _i < this.maxY; _i += yAxisLabelInterval) {
          var _domY = Math.floor(this.toDomYCoord_Linear(this.canvasH, this.minY, this.maxY, -this.yAxisLabels[_i]));
          ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, _domY);
          ctx.lineTo(this.canvasW, _domY);
          ctx.drawImage(this.getTextCanvas(-this.yAxisLabels[_i]), 0, _domY - this.textHeight / 2);
        }
      }

      ctx.stroke();
    }
  }, {
    key: 'getTextCanvas',
    value: function getTextCanvas(txt) {
      var cachedLabelTextCanvas = this.yAxisLabelTextCanvasCache[txt];

      if (cachedLabelTextCanvas === undefined) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = this.canvasW;
        canvas.height = this.textHeight * 2;

        // text styling
        ctx.font = YAXIS_FONT_STYLE.size + 'px ' + YAXIS_FONT_STYLE.fontFamily;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'right';
        ctx.fillStyle = YAXIS_FONT_STYLE.color;
        ctx.fillText(txt, this.canvasW - 7, 0);
        cachedLabelTextCanvas = canvas;
        this.yAxisLabelTextCanvasCache[txt] = canvas;
      }

      return cachedLabelTextCanvas;
    }
  }, {
    key: 'handlePan',
    value: function handlePan(e) {
      // if (this.maxY + (e.end.domY - e.start.domY - this.prevPanDist) <= this.initMaxY) {
      var newMaxY = this.maxY + (e.end.domY - e.start.domY - this.prevPanDist);
      // update min/max y callback
      this.props.updateVisbleYRange([-newMaxY, newMaxY]);
      this.prevPanDist = e.end.domY - e.start.domY;
      // }
    }
  }, {
    key: 'handlePanned',
    value: function handlePanned() {
      this.prevPanDist = 0;
    }
  }, {
    key: 'render',
    value: function render() {
      // width, height, data from props
      // reserve className for parent
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute'
            }
          },
          _react2.default.createElement('canvas', {
            className: 'plot-y-axis',
            ref: 'yAxisCanvas',
            width: this.canvasW,
            height: this.canvasH
          }),
          ' '
        ),
        ' ',
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              cursor: 'ns-resize'
            }
          },
          _react2.default.createElement(_PlotInteractionBoxProvider2.default, {
            width: this.canvasW,
            height: this.canvasH,
            handlePan: this.handlePan,
            handlePanned: this.handlePanned,
            render: function render() {}
          }),
          ' '
        ),
        ' '
      );
    }
  }]);

  return YAxis;
}(_react.PureComponent);

exports.default = YAxis;