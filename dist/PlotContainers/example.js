"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PlotContainers = require("../PlotContainers/PlotContainers");

var _BloodPressurePlot = require("../BloodPressurePlot/BloodPressurePlot");

var _BloodPressurePlot2 = _interopRequireDefault(_BloodPressurePlot);

var _BloodPressurePanel = require("../BloodPressurePlot/BloodPressurePanel");

var _BloodPressurePanel2 = _interopRequireDefault(_BloodPressurePanel);

var _BloodPressuresHorizontalSlabGrid = require("../BloodPressurePlot/BloodPressuresHorizontalSlabGrid");

var _BloodPressuresHorizontalSlabGrid2 = _interopRequireDefault(_BloodPressuresHorizontalSlabGrid);

var _DynamicDateYAxisTwoLevelPanel = require("../DateXAxis/DynamicDateYAxisTwoLevelPanel");

var _DynamicDateYAxisTwoLevelPanel2 = _interopRequireDefault(_DynamicDateYAxisTwoLevelPanel);

var _DateXAxis = require("../DateXAxis/DateXAxis");

var _DateXAxis2 = _interopRequireDefault(_DateXAxis);

var _DateVerticalGridLines = require("../DateXAxis/DateVerticalGridLines");

var _DateVerticalGridLines2 = _interopRequireDefault(_DateVerticalGridLines);

var _PlotInteractionBoxProvider = require("../Interaction/PlotInteractionBoxProvider");

var _PlotInteractionBoxProvider2 = _interopRequireDefault(_PlotInteractionBoxProvider);

var _VerticalCrosshair = require("../VerticalCrosshair/VerticalCrosshair");

var _VerticalCrosshair2 = _interopRequireDefault(_VerticalCrosshair);

var _VerticalCrosshairSelector = require("../VerticalCrosshair/VerticalCrosshairSelector");

var _VerticalCrosshairSelector2 = _interopRequireDefault(_VerticalCrosshairSelector);

var _GradientOverlay = require("../UtilityComponents/GradientOverlay");

var _GradientOverlay2 = _interopRequireDefault(_GradientOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Components
// Plot Containers


//

//

//

//


var minY = 0;
var maxY = 200;
var LEFT_WIDTH = 150;
var RIGHT_WIDTH = 0;
var TOP_HEIGHT = 30;
var BOTTOM_HEIGHT = 0;

var BloodPressurePlotBundle = function (_PureComponent) {
  _inherits(BloodPressurePlotBundle, _PureComponent);

  function BloodPressurePlotBundle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BloodPressurePlotBundle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BloodPressurePlotBundle.__proto__ || Object.getPrototypeOf(BloodPressurePlotBundle)).call.apply(_ref, [this].concat(args))), _this), _this.updateVerticalCrosshairX = function (VCX) {
      var changeHandler = _this.props.changeHandler;

      changeHandler({ verticalCrosshair_X: VCX });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BloodPressurePlotBundle, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          DBP = _props.DBP,
          MBP = _props.MBP,
          SBP = _props.SBP,
          width = _props.width,
          minX = _props.minX,
          maxX = _props.maxX,
          height = _props.height,
          verticalCrosshair_X = _props.verticalCrosshair_X;
      var changeHandler = this.props.changeHandler;

      var plotWidth = width - LEFT_WIDTH - RIGHT_WIDTH;
      var plotHeight = height - TOP_HEIGHT - BOTTOM_HEIGHT;

      return _react2.default.createElement(
        _PlotContainers.PlotContainer,
        { width: width, height: height,
          leftWidth: LEFT_WIDTH, plotWidth: plotWidth, rightWidth: RIGHT_WIDTH,
          topHeight: TOP_HEIGHT, plotHeight: plotHeight, bottomHeight: BOTTOM_HEIGHT },
        _react2.default.createElement(
          _PlotContainers.PlotSubContainer,
          null,
          _react2.default.createElement(_DynamicDateYAxisTwoLevelPanel2.default, { minX: minX, maxX: maxX, width: LEFT_WIDTH,
            height: TOP_HEIGHT
          })
        ),
        _react2.default.createElement(
          _PlotContainers.PlotSubContainer,
          null,
          _react2.default.createElement(_DateXAxis2.default, { minX: minX, maxX: maxX,
            height: TOP_HEIGHT, width: plotWidth,
            position: "x1"
          })
        ),
        _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
        _react2.default.createElement(
          _PlotContainers.PlotSubContainer,
          null,
          _react2.default.createElement(_BloodPressurePanel2.default, { height: plotHeight, width: LEFT_WIDTH })
        ),
        _react2.default.createElement(
          _PlotContainers.PlotSubContainer,
          null,
          _react2.default.createElement(_BloodPressuresHorizontalSlabGrid2.default, { height: plotHeight,
            width: plotWidth, minY: minY, maxY: maxY
          }),
          _react2.default.createElement(_DateVerticalGridLines2.default, { height: plotHeight,
            width: plotWidth, minX: minX, maxX: maxX
          }),
          _react2.default.createElement(_BloodPressurePlot2.default, { DBP: DBP,
            MBP: MBP,
            SBP: SBP,
            width: plotWidth, minX: minX, maxX: maxX,
            height: plotHeight, minY: minY, maxY: maxY
          }),
          _react2.default.createElement(_VerticalCrosshair2.default, { X: verticalCrosshair_X,
            minX: minX, maxX: maxX, width: plotWidth,
            height: plotHeight
          }),
          _react2.default.createElement(_PlotInteractionBoxProvider2.default, { width: plotWidth,
            height: plotHeight,
            render: function render(_ref2) {
              var hoveringPosition = _ref2.hoveringPosition,
                  clickPosition = _ref2.clickPosition,
                  doubleClickPosition = _ref2.doubleClickPosition,
                  selectingPositionStart = _ref2.selectingPositionStart,
                  selectingPositionEnd = _ref2.selectingPositionEnd,
                  selectedPositionStart = _ref2.selectedPositionStart,
                  selectedPositionEnd = _ref2.selectedPositionEnd,
                  panningPositionStart = _ref2.panningPositionStart,
                  panningPositionEnd = _ref2.panningPositionEnd,
                  pannedPositionStart = _ref2.pannedPositionStart,
                  pannedPositionEnd = _ref2.pannedPositionEnd;
              return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_VerticalCrosshairSelector2.default, { hoveringPosition: hoveringPosition,
                  selectHandler: _this2.updateVerticalCrosshairX,
                  minX: minX, maxX: maxX, width: plotWidth
                })
              );
            } })
        ),
        _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
        _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
        _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
        _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
        _react2.default.createElement(_GradientOverlay2.default, { style: { position: "absolute", width: 10, height: height, left: LEFT_WIDTH, top: 0 } })
      );
    }
  }]);

  return BloodPressurePlotBundle;
}(_react.PureComponent);

exports.default = BloodPressurePlotBundle;