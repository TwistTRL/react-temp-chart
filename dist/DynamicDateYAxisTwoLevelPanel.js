"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynamicDateYAxisTwoLevelPanel = function (_PureComponent) {
  _inherits(DynamicDateYAxisTwoLevelPanel, _PureComponent);

  function DynamicDateYAxisTwoLevelPanel() {
    _classCallCheck(this, DynamicDateYAxisTwoLevelPanel);

    return _possibleConstructorReturn(this, (DynamicDateYAxisTwoLevelPanel.__proto__ || Object.getPrototypeOf(DynamicDateYAxisTwoLevelPanel)).apply(this, arguments));
  }

  _createClass(DynamicDateYAxisTwoLevelPanel, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          minX = _props.minX,
          maxX = _props.maxX,
          height = _props.height,
          width = _props.width,
          rest = _objectWithoutProperties(_props, ["minX", "maxX", "height", "width"]);

      var label = this.createLabel(minX, maxX);
      return _react2.default.createElement(Panel, _extends({ label: label,
        width: width, height: height }, rest));
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
                  return (0, _dateFns.format)(minT, "YYYY/MMM/DD HH:mm:ss");
                }
                return (0, _dateFns.format)(minT, "YYYY/MMM/DD HH:mm");
              }
              return (0, _dateFns.format)(minT, "YYYY/MMM/DD HH");
            }
            return (0, _dateFns.format)(minT, "YYYY/MMM/DD");
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

var PARIMARY_CATEGORY_WIDTH = 30;
var PRIMARY_CATEGORY_COLOR = "#61605F";
var SECONDARY_CATEGORY_COLOR = "#fedda7";

var Panel = function (_PureComponent2) {
  _inherits(Panel, _PureComponent2);

  function Panel(props) {
    _classCallCheck(this, Panel);

    var _this2 = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this2.ref = _react2.default.createRef();
    return _this2;
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var _props2 = this.props,
          label = _props2.label,
          height = _props2.height,
          width = _props2.width,
          rest = _objectWithoutProperties(_props2, ["label", "height", "width"]);

      return _react2.default.createElement("canvas", _extends({ ref: this.ref, width: width, height: height }, rest));
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
      var _props3 = this.props,
          label = _props3.label,
          width = _props3.width,
          height = _props3.height;

      var canvas = this.ref.current;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      //
      ctx.fillStyle = PRIMARY_CATEGORY_COLOR;
      ctx.fillRect(0, 0, PARIMARY_CATEGORY_WIDTH, height);
      //
      ctx.fillStyle = SECONDARY_CATEGORY_COLOR;
      ctx.fillRect(PARIMARY_CATEGORY_WIDTH, 0, width - PARIMARY_CATEGORY_WIDTH, height);
      //
      ctx.fillStyle = "black";
      ctx.font = "italic 700 12px MuseoSans";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillText(label, width - PARIMARY_CATEGORY_WIDTH * 2 - 10, height / 2);
    }
  }]);

  return Panel;
}(_react.PureComponent);

exports.default = DynamicDateYAxisTwoLevelPanel;