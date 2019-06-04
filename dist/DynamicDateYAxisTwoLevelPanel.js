"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dateFns = require("date-fns");

var _YAxisTwoLevelPanelPlotters = require("./Modules/YAxisTwoLevelPanelPlotters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PRIMARY_CATEGORY_COLOR = "#61605F";
var SECONDARY_CATEGORY_COLOR = "#fedda7";

var DynamicDateYAxisTwoLevelPanel = function (_PureComponent) {
  _inherits(DynamicDateYAxisTwoLevelPanel, _PureComponent);

  function DynamicDateYAxisTwoLevelPanel(props) {
    _classCallCheck(this, DynamicDateYAxisTwoLevelPanel);

    var _this = _possibleConstructorReturn(this, (DynamicDateYAxisTwoLevelPanel.__proto__ || Object.getPrototypeOf(DynamicDateYAxisTwoLevelPanel)).call(this, props));

    _this.ref = _react2.default.createRef();
    _this.secondaryBitmap = document.createElement("canvas");
    _this.primaryBitmap = (0, _YAxisTwoLevelPanelPlotters.createPrimaryCategoryBitmap)("");
    return _this;
  }

  _createClass(DynamicDateYAxisTwoLevelPanel, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width;

      return _react2.default.createElement("canvas", { ref: this.ref, width: width, height: height, style: { display: "block", height: height, width: width } });
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
          height = _props2.height,
          width = _props2.width;

      var canvas = this.ref.current;
      var secondaryBitmap = this.secondaryBitmap,
          primaryBitmap = this.primaryBitmap;
      // Label

      var label = this.createLabel(minX, maxX);
      secondaryBitmap = (0, _YAxisTwoLevelPanelPlotters.createSecondaryCategoryBitmap)(label, secondaryBitmap);
      // Plot
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      (0, _YAxisTwoLevelPanelPlotters.drawPrimaryCategory)(ctx, width, height, primaryBitmap, PRIMARY_CATEGORY_COLOR, 0, height);
      (0, _YAxisTwoLevelPanelPlotters.drawSecondaryCategory)(ctx, width, height, secondaryBitmap, SECONDARY_CATEGORY_COLOR, 0, height);
    }
  }, {
    key: "createLabel",
    value: function createLabel(minX, maxX) {
      var minT = new Date(minX);
      var maxT = new Date(maxX);
      if (minT.getFullYear() === maxT.getFullYear()) {
        if (minT.getMonth() === maxT.getMonth()) {
          if (minT.getDate() === maxT.getDate()) {
            if (minT.getHours() === maxT.getHours()) {
              if (minT.getMinutes() === maxT.getMinutes()) {
                if (minT.getSeconds() === maxT.getSeconds()) {
                  return (0, _dateFns.format)(minT, "YYYY/MMM/Do HH:mm:ss");
                }
                return (0, _dateFns.format)(minT, "YYYY/MMM/Do HH:mm");
              }
              return (0, _dateFns.format)(minT, "YYYY/MMM/Do HH");
            }
            return (0, _dateFns.format)(minT, "YYYY/MMM/Do");
          }
          return (0, _dateFns.format)(minT, "YYYY/MMM");
        }
        return (0, _dateFns.format)(minT, "YYYY");
      }
      return "Time";
    }
  }]);

  return DynamicDateYAxisTwoLevelPanel;
}(_react.PureComponent);

exports.default = DynamicDateYAxisTwoLevelPanel;