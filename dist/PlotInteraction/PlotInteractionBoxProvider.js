"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PlotInteractionBox = require("./PlotInteractionBox");

var _PlotInteractionBox2 = _interopRequireDefault(_PlotInteractionBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotInteractionBoxProvider = function (_Component) {
  _inherits(PlotInteractionBoxProvider, _Component);

  function PlotInteractionBoxProvider(props) {
    _classCallCheck(this, PlotInteractionBoxProvider);

    var _this = _possibleConstructorReturn(this, (PlotInteractionBoxProvider.__proto__ || Object.getPrototypeOf(PlotInteractionBoxProvider)).call(this, props));

    _this.handleHovering = function (hoveringPosition) {
      _this.setState(_extends({}, _this.state, { hoveringPosition: hoveringPosition }));
      if (_this.props.handleHoverPosChange) {
        _this.props.handleHoverPosChange(hoveringPosition);
      }
    };

    _this.handleHoverEnd = function () {
      _this.setState(_extends({}, _this.state, { hoveringPosition: null }));
      if (_this.props.handleHoverPosChange) {
        _this.props.handleHoverPosChange(null);
      }
    };

    _this.handleClick = function (clickPosition) {
      _this.setState(_extends({}, _this.state, {
        clickPosition: clickPosition
      }));
      if (_this.props.handleClick) {
        _this.props.handleClick(clickPosition);
      }
    };

    _this.handleDoubleClick = function (doubleClickPosition) {
      _this.setState(_extends({}, _this.state, { doubleClickPosition: doubleClickPosition }));
    };

    _this.handleSelecting = function (selectingPositions) {
      _this.setState(_extends({}, _this.state, { selectingPositions: selectingPositions }));
    };

    _this.handleSelected = function (selectedPositions) {
      _this.setState(_extends({}, _this.state, {
        selectedPositions: selectedPositions,
        selectingPositions: null
      }));
    };

    _this.state = {
      hoveringPosition: null,
      clickPosition: null,
      doubleClickPosition: null,
      selectingPositions: null,
      selectedPositions: null,
      panningPositions: null,
      pannedPositions: null
    };
    _this.handlePanning = _this.handlePanning.bind(_this);
    _this.handlePanned = _this.handlePanned.bind(_this);
    return _this;
  }

  _createClass(PlotInteractionBoxProvider, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          render = _props.render,
          width = _props.width,
          height = _props.height;

      return _react2.default.createElement(
        _PlotInteractionBox2.default,
        {
          width: width,
          height: height,
          transitionGraph: _PlotInteractionBox.INTERACTION_MODEL_PANNING,
          hoveringHandler: this.handleHovering,
          hoverEndHandler: this.handleHoverEnd,
          clickHandler: this.handleClick,
          doubleClickHandler: this.handleDoubleClick,
          selectingHandler: this.handleSelecting,
          selectedHandler: this.handleSelected,
          panningHandler: this.handlePanning,
          pannedHandler: this.handlePanned
        },
        render(this.state)
      );
    }
  }, {
    key: "handlePanning",
    value: function handlePanning(panningPositions) {
      this.setState(_extends({}, this.state, { panningPositions: panningPositions }));
      if (this.props.handlePan) {
        this.props.handlePan(panningPositions);
      }
    }
  }, {
    key: "handlePanned",
    value: function handlePanned(pannedPositions) {
      this.setState(_extends({}, this.state, { pannedPositions: pannedPositions, panningPositions: null }));
      if (this.props.handlePanned) {
        this.props.handlePanned(pannedPositions);
      }
    }
  }]);

  return PlotInteractionBoxProvider;
}(_react.Component);

exports.default = PlotInteractionBoxProvider;