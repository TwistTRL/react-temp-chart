"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _bisect = require("bisect");

var _plotUtils = require("plot-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateVerticalGridLines = function (_PureComponent) {
  _inherits(DateVerticalGridLines, _PureComponent);

  function DateVerticalGridLines(props) {
    _classCallCheck(this, DateVerticalGridLines);

    var _this = _possibleConstructorReturn(this, (DateVerticalGridLines.__proto__ || Object.getPrototypeOf(DateVerticalGridLines)).call(this, props));

    _this.ref = _react2.default.createRef();
    return _this;
  }

  _createClass(DateVerticalGridLines, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          width = _props.width,
          minX = _props.minX,
          maxX = _props.maxX,
          rest = _objectWithoutProperties(_props, ["width", "minX", "maxX"]);

      return _react2.default.createElement("canvas", _extends({ ref: this.ref, width: width, height: 400 }, rest));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.draw();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _props2 = this.props,
          minX = _props2.minX,
          maxX = _props2.maxX,
          width = _props2.width;

      var diffX = maxX - minX;
      // Generate grid if needed
      this.draw_memo = this.draw_memo || { validFromDiffX: 0, validToDiffX: -1, rangeMinX: 0, rangeMaxX: -1 };
      var memo = this.draw_memo;
      if (memo.validFromDiffX > diffX || diffX > memo.validToDiffX || memo.rangeMinX > minX || maxX > memo.rangeMaxX) {
        memo.rangeMinX = minX - 10 * diffX;
        memo.rangeMaxX = maxX + 10 * diffX;

        var _generateDateGrids = (0, _plotUtils.generateDateGrids)(minX, maxX, memo.rangeMinX, memo.rangeMaxX),
            grids = _generateDateGrids.grids,
            validFromDiffX = _generateDateGrids.validFromDiffX,
            validToDiffX = _generateDateGrids.validToDiffX;

        memo.validFromDiffX = validFromDiffX;
        memo.validToDiffX = validToDiffX;
        memo.grids = grids;
      }
      // Filter
      var startIndex = Math.max(0, (0, _bisect.bisect_right)(memo.grids, minX));
      var endIndex = Math.min(memo.grids.length - 1, (0, _bisect.bisect_left)(memo.grids, maxX));
      var domXs = memo.grids.slice(startIndex, endIndex + 1).map(function (x) {
        return (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, x);
      });
      // Draw
      var canvas = this.ref.current;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, 400);
      ctx.globalAlpha = 0.1;
      this.verticalLinePlot(ctx, width, 400, domXs);
    }
  }, {
    key: "verticalLinePlot",
    value: function verticalLinePlot(ctx, width, height, domXs) {
      var x = null;
      var c = null;
      ctx.beginPath();
      for (var i = 0; i < domXs.length; i++) {
        x = Math.round(domXs[i]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();
    }
  }]);

  return DateVerticalGridLines;
}(_react.PureComponent);

exports.default = DateVerticalGridLines;