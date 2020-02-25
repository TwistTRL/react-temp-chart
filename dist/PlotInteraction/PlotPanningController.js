"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _plotUtils = require("plot-utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotPanningController = function (_PureComponent) {
  _inherits(PlotPanningController, _PureComponent);

  function PlotPanningController(props) {
    _classCallCheck(this, PlotPanningController);

    var _this = _possibleConstructorReturn(this, (PlotPanningController.__proto__ || Object.getPrototypeOf(PlotPanningController)).call(this, props));

    _this.lastEvent = null;
    _this.snapshot = {};
    return _this;
  }

  _createClass(PlotPanningController, [{
    key: "render",
    value: function render() {
      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.pan();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.pan();
    }
  }, {
    key: "pan",
    value: function pan() {
      var _props = this.props,
          panningPositions = _props.panningPositions,
          panHandler = _props.panHandler,
          minX = _props.minX,
          maxX = _props.maxX,
          width = _props.width;
      var snapshot = this.snapshot;
      // Do not process stale panningPositions

      if (panningPositions === this.lastEvent) {
        return;
      }
      // Panning stops
      if (panningPositions === null) {
        this.lastEvent = null;
        return;
      }
      // Panning ongoing
      if (!this.lastEvent) {
        //Start of panning, store snapshot
        snapshot.minX = minX;
        snapshot.maxX = maxX;
        snapshot.width = width;
        snapshot.initialDataX = (0, _plotUtils.fromDomXCoord_Linear)(width, minX, maxX, panningPositions.start.domX);
      }
      var curDataX = (0, _plotUtils.fromDomXCoord_Linear)(snapshot.width, snapshot.minX, snapshot.maxX, panningPositions.end.domX);
      var deltaX = curDataX - snapshot.initialDataX;
      panHandler(snapshot.minX - deltaX, snapshot.maxX - deltaX);
      this.lastEvent = panningPositions;
    }
  }]);

  return PlotPanningController;
}(_react.PureComponent);

exports.default = PlotPanningController;