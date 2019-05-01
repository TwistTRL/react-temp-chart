"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TempChart = require("./TempChart");

var _TempChart2 = _interopRequireDefault(_TempChart);

var _TempChartLeftPanel = require("./TempChartLeftPanel");

var _TempChartLeftPanel2 = _interopRequireDefault(_TempChartLeftPanel);

var _TempChartYAxis = require("./TempChartYAxis");

var _TempChartYAxis2 = _interopRequireDefault(_TempChartYAxis);

var _TempChartRedLine = require("./TempChartRedLine");

var _TempChartRedLine2 = _interopRequireDefault(_TempChartRedLine);

var _PlotContainers = require("./PlotContainers/PlotContainers");

var _HoverInteractionBox = require("./HoverInteractionBox");

var _HoverInteractionBox2 = _interopRequireDefault(_HoverInteractionBox);

var _DynamicDateYAxisTwoLevelPanel = require("./DynamicDateYAxisTwoLevelPanel");

var _DynamicDateYAxisTwoLevelPanel2 = _interopRequireDefault(_DynamicDateYAxisTwoLevelPanel);

var _reactPlotAxis = require("react-plot-axis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var minY = 0;
var maxY = 200;
var LEFT_WIDTH = 200;
var RIGHT_WIDTH = 0;
var TOP_HEIGHT = 30;
var BOTTOM_HEIGHT = 0;

var TempChartBundle = function (_PureComponent) {
    _inherits(TempChartBundle, _PureComponent);

    function TempChartBundle() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TempChartBundle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TempChartBundle.__proto__ || Object.getPrototypeOf(TempChartBundle)).call.apply(_ref, [this].concat(args))), _this), _this.getDaysBetweenDates = function (d0, d1) {
            var msPerDay = 8.64e7;

            // Copy dates so don't mess them up
            var x0 = new Date(d0);
            var x1 = new Date(d1);

            // Set to noon - avoid DST errors
            x0.setHours(12, 0, 0);
            x1.setHours(12, 0, 0);

            // Round to remove daylight saving errors
            return Math.round((x1 - x0) / msPerDay);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TempChartBundle, [{
        key: "filterDataToDtWindow",
        value: function filterDataToDtWindow(data) {
            var minX = this.props.dtWindow[0] / 1000;
            var maxX = this.props.dtWindow[1] / 1000;
            var filteredData = data;

            if (data) {
                if (minX) {
                    // filter out the data that is within the dtWindow range
                    filteredData = filteredData.filter(function (o) {
                        return o.time <= maxX && o.time >= minX;
                    });
                }
            }

            return filteredData;
        }
    }, {
        key: "extractTimeFromData",
        value: function extractTimeFromData(data) {
            var timeArr = [];
            var timeSet = new Set();

            data.map(function (d) {
                if (!timeSet.has(d["time"])) {
                    timeArr.push(d["time"]);
                    timeSet.add(d["time"]);
                }
            });

            return timeArr;
        }
    }, {
        key: "tryToCombineData",
        value: function tryToCombineData(filteredData, data) {
            if (filteredData.length >= 48) {
                if (filteredData.length >= 48 && filteredData.length < 96) {
                    data = this.combineData(2, data);
                } else if (filteredData.length >= 96 && filteredData.length < 192) {
                    data = this.combineData(4, data);
                } else if (filteredData.length >= 192 && filteredData.length < 384) {
                    data = this.combineData(8, data);
                } else if (filteredData.length >= 384 && filteredData.length < 768) {
                    data = this.combineData(16, data);
                } else if (filteredData.length >= 768 && filteredData.length < 1536) {
                    data = this.combineData(32, data);
                } else if (filteredData.length >= 1536 && filteredData.length < 3072) {
                    data = this.combineData(64, data);
                } else if (filteredData.length >= 3072 && filteredData.length < 6144) {
                    data = this.combineData(128, data);
                } else if (filteredData.length >= 6144) {
                    data = this.combineData(256, data);
                }
            }
            return data;
        }
    }, {
        key: "combineData",
        value: function combineData(combNum, data) {
            var combinedData = [],
                curCombinedObj = void 0,
                curCombNum = 0,
                curMinTemp = null,
                curMaxTemp = null;

            data.map(function (d, i) {
                if (curCombNum === 0) {
                    curCombinedObj = _extends({}, d);
                }

                if (!curMinTemp && !curMaxTemp) {
                    curMinTemp = d["temp"];
                    curMaxTemp = d["temp"];
                } else if (d["temp"] < curMinTemp) {
                    curMinTemp = d["temp"];
                } else if (d["temp"] > curMaxTemp) {
                    curMaxTemp = d["temp"];
                }

                curCombNum++;

                if (curCombNum >= combNum || i === data.length - 1) {
                    curCombNum = 0;
                    curCombinedObj["temp"] = [curMinTemp, curMaxTemp];
                    combinedData.push(curCombinedObj);
                    curCombinedObj = {};
                    curMinTemp = null;
                    curMaxTemp = null;
                }
            });

            return combinedData;
        }

        // unix time in ms

    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                dtWindow = _props.dtWindow,
                width = _props.width,
                height = _props.height,
                data = _props.data;

            var filteredData = void 0;
            var plotWidth = width - LEFT_WIDTH - RIGHT_WIDTH;
            var plotHeight = height - TOP_HEIGHT - BOTTOM_HEIGHT;
            var styles = {
                leftPanelGradShadow: {
                    position: "absolute",
                    top: 0,
                    left: LEFT_WIDTH,
                    height: height,
                    width: 15,
                    opacity: 1,
                    backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.3), rgba(255,255,255,0))"
                }
            };

            filteredData = this.filterDataToDtWindow(data);
            // combine unfiltered data to prevent jumpy movement
            data = this.tryToCombineData(filteredData, data);
            data = this.filterDataToDtWindow(data);

            return _react2.default.createElement(
                _PlotContainers.PlotContainer,
                { width: width, height: height,
                    leftWidth: LEFT_WIDTH, plotWidth: plotWidth, rightWidth: RIGHT_WIDTH,
                    topHeight: TOP_HEIGHT, plotHeight: plotHeight, bottomHeight: BOTTOM_HEIGHT },
                _react2.default.createElement(
                    _PlotContainers.PlotSubContainer,
                    null,
                    _react2.default.createElement(_DynamicDateYAxisTwoLevelPanel2.default, { minX: dtWindow[0], maxX: dtWindow[1], height: TOP_HEIGHT, width: LEFT_WIDTH })
                ),
                _react2.default.createElement(
                    _PlotContainers.PlotSubContainer,
                    null,
                    _react2.default.createElement(
                        "div",
                        { style: { backgroundColor: "#fedda7" } },
                        _react2.default.createElement(_reactPlotAxis.DateXAxis, {
                            minX: dtWindow[0],
                            maxX: dtWindow[1],
                            height: TOP_HEIGHT,
                            width: plotWidth,
                            tickPosition: "top" })
                    )
                ),
                _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
                _react2.default.createElement(
                    _PlotContainers.PlotSubContainer,
                    null,
                    _react2.default.createElement(_TempChartLeftPanel2.default, { panelWidth: LEFT_WIDTH, panelHeight: plotHeight }),
                    _react2.default.createElement(_TempChartYAxis2.default, { canvasH: plotHeight, canvasW: LEFT_WIDTH })
                ),
                _react2.default.createElement(
                    _PlotContainers.PlotSubContainer,
                    null,
                    _react2.default.createElement(_TempChart2.default, { width: plotWidth, height: plotHeight, minX: dtWindow[0], maxX: dtWindow[1], data: data }),
                    _react2.default.createElement(_TempChartRedLine2.default, { width: plotWidth, height: plotHeight, minX: dtWindow[0], maxX: dtWindow[1], time: 1509562800 })
                ),
                _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
                _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
                _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
                _react2.default.createElement(_PlotContainers.PlotSubContainer, null),
                _react2.default.createElement("div", { style: styles.leftPanelGradShadow })
            );
        }
    }]);

    return TempChartBundle;
}(_react.PureComponent);

TempChartBundle.propTypes = {
    data: _propTypes2.default.array.isRequired,
    dtWindow: _propTypes2.default.array.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired
};

exports.default = TempChartBundle;