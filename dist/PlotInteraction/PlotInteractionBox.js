"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERACTION_MODEL_BARE = exports.INTERACTION_MODEL_PANNING = exports.INTERACTION_MODEL_SELECTING = exports.INTERACTION_MODEL_DEFAULT = exports.ACTION_TIMEOUT = exports.ACTION_MOUSEUP = exports.ACTION_MOUSEMOVE = exports.ACTION_MOUSEDOWN = exports.MODE_PANNING = exports.MODE_SELECTING = exports.MODE_AUTOSELECTING = exports.MODE_CLICKING = exports.MODE_HOVERING = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MODE_CLICKING, _MODE_AUTOSELECTING, _INTERACTION_MODEL_DE, _MODE_CLICKING2, _INTERACTION_MODEL_SE, _MODE_CLICKING3, _INTERACTION_MODEL_PA, _INTERACTION_MODEL_BA;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DragOverlay = require("./DragOverlay");

var _DragOverlay2 = _interopRequireDefault(_DragOverlay);

var _CountDown = require("./CountDown");

var _CountDown2 = _interopRequireDefault(_CountDown);

require("./PlotInteractionBox.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// Components


// CSS


var MODE_HOVERING = exports.MODE_HOVERING = "hovering";
var MODE_CLICKING = exports.MODE_CLICKING = "clicking";
var MODE_AUTOSELECTING = exports.MODE_AUTOSELECTING = "autoSelecting";
var MODE_SELECTING = exports.MODE_SELECTING = "selecting";
var MODE_PANNING = exports.MODE_PANNING = "panning";

var ACTION_MOUSEDOWN = exports.ACTION_MOUSEDOWN = "mouseDown";
var ACTION_MOUSEMOVE = exports.ACTION_MOUSEMOVE = "mouseMove";
var ACTION_MOUSEUP = exports.ACTION_MOUSEUP = "mouseUp";
var ACTION_TIMEOUT = exports.ACTION_TIMEOUT = "timeout";

var INTERACTION_MODEL_DEFAULT = exports.INTERACTION_MODEL_DEFAULT = (_INTERACTION_MODEL_DE = {}, _defineProperty(_INTERACTION_MODEL_DE, MODE_HOVERING, _defineProperty({}, ACTION_MOUSEDOWN, MODE_CLICKING)), _defineProperty(_INTERACTION_MODEL_DE, MODE_CLICKING, (_MODE_CLICKING = {}, _defineProperty(_MODE_CLICKING, ACTION_TIMEOUT, MODE_AUTOSELECTING), _defineProperty(_MODE_CLICKING, ACTION_MOUSEMOVE, MODE_SELECTING), _defineProperty(_MODE_CLICKING, ACTION_MOUSEUP, MODE_HOVERING), _MODE_CLICKING)), _defineProperty(_INTERACTION_MODEL_DE, MODE_AUTOSELECTING, (_MODE_AUTOSELECTING = {}, _defineProperty(_MODE_AUTOSELECTING, ACTION_TIMEOUT, MODE_PANNING), _defineProperty(_MODE_AUTOSELECTING, ACTION_MOUSEMOVE, MODE_SELECTING), _MODE_AUTOSELECTING)), _defineProperty(_INTERACTION_MODEL_DE, MODE_SELECTING, _defineProperty({}, ACTION_MOUSEUP, MODE_HOVERING)), _defineProperty(_INTERACTION_MODEL_DE, MODE_PANNING, _defineProperty({}, ACTION_MOUSEUP, MODE_HOVERING)), _INTERACTION_MODEL_DE);

var INTERACTION_MODEL_SELECTING = exports.INTERACTION_MODEL_SELECTING = (_INTERACTION_MODEL_SE = {}, _defineProperty(_INTERACTION_MODEL_SE, MODE_HOVERING, _defineProperty({}, ACTION_MOUSEDOWN, MODE_CLICKING)), _defineProperty(_INTERACTION_MODEL_SE, MODE_CLICKING, (_MODE_CLICKING2 = {}, _defineProperty(_MODE_CLICKING2, ACTION_TIMEOUT, MODE_SELECTING), _defineProperty(_MODE_CLICKING2, ACTION_MOUSEMOVE, MODE_SELECTING), _defineProperty(_MODE_CLICKING2, ACTION_MOUSEUP, MODE_HOVERING), _MODE_CLICKING2)), _defineProperty(_INTERACTION_MODEL_SE, MODE_SELECTING, _defineProperty({}, ACTION_MOUSEUP, MODE_HOVERING)), _INTERACTION_MODEL_SE);

var INTERACTION_MODEL_PANNING = exports.INTERACTION_MODEL_PANNING = (_INTERACTION_MODEL_PA = {}, _defineProperty(_INTERACTION_MODEL_PA, MODE_HOVERING, _defineProperty({}, ACTION_MOUSEDOWN, MODE_CLICKING)), _defineProperty(_INTERACTION_MODEL_PA, MODE_CLICKING, (_MODE_CLICKING3 = {}, _defineProperty(_MODE_CLICKING3, ACTION_TIMEOUT, MODE_PANNING), _defineProperty(_MODE_CLICKING3, ACTION_MOUSEMOVE, MODE_PANNING), _defineProperty(_MODE_CLICKING3, ACTION_MOUSEUP, MODE_HOVERING), _MODE_CLICKING3)), _defineProperty(_INTERACTION_MODEL_PA, MODE_PANNING, _defineProperty({}, ACTION_MOUSEUP, MODE_HOVERING)), _INTERACTION_MODEL_PA);

var INTERACTION_MODEL_BARE = exports.INTERACTION_MODEL_BARE = (_INTERACTION_MODEL_BA = {}, _defineProperty(_INTERACTION_MODEL_BA, MODE_HOVERING, _defineProperty({}, ACTION_MOUSEDOWN, MODE_CLICKING)), _defineProperty(_INTERACTION_MODEL_BA, MODE_CLICKING, _defineProperty({}, ACTION_MOUSEUP, MODE_HOVERING)), _INTERACTION_MODEL_BA);

var PlotInteractionBox = function (_PureComponent) {
  _inherits(PlotInteractionBox, _PureComponent);

  function PlotInteractionBox(props) {
    _classCallCheck(this, PlotInteractionBox);

    var _this = _possibleConstructorReturn(this, (PlotInteractionBox.__proto__ || Object.getPrototypeOf(PlotInteractionBox)).call(this, props));

    _this.handleMouseMove_Hovering = function (ev) {
      var hoveringHandler = _this.props.hoveringHandler;

      var myEV = _this.getCustomEventObject(ev);
      hoveringHandler(myEV);
    };

    _this.handleMouseOut_Hovering = function (ev) {
      var hoverEndHandler = _this.props.hoverEndHandler;

      hoverEndHandler();
    };

    _this.handleMouseDown_Hovering = function (ev) {
      var hoverEndHandler = _this.props.hoverEndHandler;

      ev.preventDefault();
      var myEV = _this.getCustomEventObject(ev);
      _this.initialMouseDownPosition = myEV;
      hoverEndHandler();
      _this.transition(ACTION_MOUSEDOWN);
    };

    _this.clickTimeout = function () {
      _this.transition(ACTION_TIMEOUT);
    };

    _this.autoSelectingTimeout = function () {
      _this.transition(ACTION_TIMEOUT);
    };

    _this.handleMouseMove_Clicking = function (ev) {
      var selectingHandler = _this.props.selectingHandler;
      var initialMouseDownPosition = _this.initialMouseDownPosition;

      var myEV = _this.getCustomEventObject(ev);
      if (Math.abs(myEV.domX - initialMouseDownPosition.domX) < 10 || Math.abs(myEV.domY - initialMouseDownPosition.domX) < 10) {
        return;
      } else {
        _this.transition(ACTION_MOUSEMOVE);
      }
    };

    _this.handleMouseUp_Clicking = function (ev) {
      var _this$props = _this.props,
          clickHandler = _this$props.clickHandler,
          doubleClickHandler = _this$props.doubleClickHandler;
      var prevClickTimeStamp = _this.prevClickTimeStamp;

      var myEV = ev;
      if (prevClickTimeStamp === null || prevClickTimeStamp + 200 < ev.timeStamp) {
        _this.prevClickTimeStamp = ev.timeStamp;
        clickHandler(myEV);
      } else {
        _this.prevClickTimeStamp = null;
        doubleClickHandler(myEV);
      }
      _this.transition(ACTION_MOUSEUP);
    };

    _this.handleMouseMove_AutoSelecting = function (ev) {
      var selectingHandler = _this.props.selectingHandler;
      var initialMouseDownPosition = _this.initialMouseDownPosition;

      var myEV = _this.getCustomEventObject(ev);
      if (Math.abs(myEV.domX - initialMouseDownPosition.domX) < 10 || Math.abs(myEV.domY - initialMouseDownPosition.domX) < 10) {
        return;
      } else {
        selectingHandler({ start: initialMouseDownPosition, end: myEV });
        _this.transition(ACTION_MOUSEMOVE);
      }
    };

    _this.handleMouseUp_AutoSelecting = function (ev) {
      _this.transition(ACTION_MOUSEUP);
    };

    _this.handleMouseMove_Selecting = function (ev) {
      var selectingHandler = _this.props.selectingHandler;
      var initialMouseDownPosition = _this.initialMouseDownPosition;

      var myEV = _this.getCustomEventObject(ev);
      selectingHandler({ start: initialMouseDownPosition, end: myEV });
    };

    _this.handleMouseUp_Selecting = function (ev) {
      var selectedHandler = _this.props.selectedHandler;
      var initialMouseDownPosition = _this.initialMouseDownPosition;

      var myEV = _this.getCustomEventObject(ev);
      selectedHandler({ start: initialMouseDownPosition, end: myEV });
      _this.transition(ACTION_MOUSEUP);
    };

    _this.state = { mode: MODE_HOVERING };
    _this.ref = _react2.default.createRef();
    _this.initialMouseDownPosition = null;
    _this.prevClickTimeStamp = null;
    _this.handleMouseMove_Panning = _this.handleMouseMove_Panning.bind(_this);
    _this.handleMouseUp_Panning = _this.handleMouseUp_Panning.bind(_this);
    return _this;
  }

  _createClass(PlotInteractionBox, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          children = _props.children;

      var style = { width: width, height: height };

      switch (this.state.mode) {
        case MODE_HOVERING:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              {
                ref: this.ref,
                style: style,
                onMouseMove: this.handleMouseMove_Hovering,
                onMouseOut: this.handleMouseOut_Hovering,
                onMouseDown: this.handleMouseDown_Hovering
              },
              children
            )
          );
        case MODE_CLICKING:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { ref: this.ref, style: style },
              children
            ),
            _react2.default.createElement(_DragOverlay2.default, {
              mouseMoveHandler: this.handleMouseMove_Clicking,
              mouseUpHandler: this.handleMouseUp_Clicking,
              cursor: "point"
            }),
            _react2.default.createElement(_CountDown2.default, { timeout: 200, callback: this.clickTimeout })
          );
        case MODE_AUTOSELECTING:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { ref: this.ref, style: style },
              children
            ),
            _react2.default.createElement(_DragOverlay2.default, {
              mouseMoveHandler: this.handleMouseMove_AutoSelecting,
              mouseUpHandler: this.handleMouseUp_AutoSelecting,
              cursor: "nesw-resize"
            }),
            _react2.default.createElement(_CountDown2.default, { timeout: 500, callback: this.autoSelectingTimeout })
          );
        case MODE_SELECTING:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { ref: this.ref, style: style },
              children
            ),
            _react2.default.createElement(_DragOverlay2.default, {
              mouseMoveHandler: this.handleMouseMove_Selecting,
              mouseUpHandler: this.handleMouseUp_Selecting,
              cursor: "nesw-resize"
            })
          );
        case MODE_PANNING:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { ref: this.ref, style: style },
              children
            ),
            _react2.default.createElement(_DragOverlay2.default, {
              mouseMoveHandler: this.handleMouseMove_Panning,
              mouseUpHandler: this.handleMouseUp_Panning,
              cursor: "grabbing"
            })
          );
        default:
          return _react2.default.createElement(
            "p",
            null,
            this.state.mode
          );
        //throw new Error("ProgrammerTooDumbError");
      }
    }
  }, {
    key: "transition",
    value: function transition(action) {
      var transitionGraph = this.props.transitionGraph;
      var mode = this.state.mode;

      var nextMode = transitionGraph[mode][action];
      if (nextMode) {
        this.setState({ mode: nextMode });
      }
    }
  }, {
    key: "getCustomEventObject",
    value: function getCustomEventObject(ev) {
      var _ref$current$getBound = this.ref.current.getBoundingClientRect(),
          left = _ref$current$getBound.left,
          top = _ref$current$getBound.top;

      var clientX = ev.clientX,
          clientY = ev.clientY;

      var domX = clientX - left;
      var domY = clientY - top;
      return { domX: domX, domY: domY, clientX: clientX, clientY: clientY };
    }
  }, {
    key: "handleMouseMove_Panning",
    value: function handleMouseMove_Panning(ev) {
      var panningHandler = this.props.panningHandler;
      var initialMouseDownPosition = this.initialMouseDownPosition;

      var myEV = this.getCustomEventObject(ev);
      panningHandler({ start: initialMouseDownPosition, end: myEV });
    }
  }, {
    key: "handleMouseUp_Panning",
    value: function handleMouseUp_Panning(ev) {
      var pannedHandler = this.props.pannedHandler;
      var initialMouseDownPosition = this.initialMouseDownPosition;

      var myEV = this.getCustomEventObject(ev);
      pannedHandler({ start: initialMouseDownPosition, end: myEV });
      this.transition(ACTION_MOUSEUP);
    }
  }]);

  return PlotInteractionBox;
}(_react.PureComponent);

exports.default = PlotInteractionBox;