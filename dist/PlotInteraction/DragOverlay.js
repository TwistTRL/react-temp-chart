"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./DragOverlay.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// CSS


var DragOverlay = function (_PureComponent) {
  _inherits(DragOverlay, _PureComponent);

  function DragOverlay(props) {
    _classCallCheck(this, DragOverlay);

    var _this = _possibleConstructorReturn(this, (DragOverlay.__proto__ || Object.getPrototypeOf(DragOverlay)).call(this, props));

    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    return _this;
  }

  _createClass(DragOverlay, [{
    key: "render",
    value: function render() {
      var cursor = this.props.cursor;

      return _react2.default.createElement("div", { className: "fullscreen", style: { cursor: cursor } });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("mousemove", this.handleMouseMove, true);
      document.addEventListener("mouseup", this.handleMouseUp, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousemove", this.handleMouseMove, true);
      document.removeEventListener("mouseup", this.handleMouseUp, true);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(ev) {
      ev.stopPropagation();
      var mouseMoveHandler = this.props.mouseMoveHandler;

      mouseMoveHandler(ev);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(ev) {
      ev.stopPropagation();
      var mouseUpHandler = this.props.mouseUpHandler;

      mouseUpHandler(ev);
    }
  }]);

  return DragOverlay;
}(_react.PureComponent);

DragOverlay.propTypes = {
  cursor: _propTypes2.default.string.isRequired,
  mouseMoveHandler: _propTypes2.default.func.isRequired,
  mouseUpHandler: _propTypes2.default.func.isRequired
};

exports.default = DragOverlay;