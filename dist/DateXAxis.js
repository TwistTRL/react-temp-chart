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

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateXAxis = function (_PureComponent) {
  _inherits(DateXAxis, _PureComponent);

  function DateXAxis(props) {
    _classCallCheck(this, DateXAxis);

    var _this = _possibleConstructorReturn(this, (DateXAxis.__proto__ || Object.getPrototypeOf(DateXAxis)).call(this, props));

    _this.ref = _react2.default.createRef();
    return _this;
  }

  _createClass(DateXAxis, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          minX = _props.minX,
          maxX = _props.maxX,
          width = _props.width,
          height = _props.height,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ["minX", "maxX", "width", "height", "style"]);

      return _react2.default.createElement("canvas", _extends({ ref: this.ref, width: width, height: height,
        style: _extends({ backgroundColor: "#fff7e4" }, style)
      }, rest));
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
      var _this2 = this;

      var _props2 = this.props,
          minX = _props2.minX,
          maxX = _props2.maxX,
          width = _props2.width,
          height = _props2.height,
          rest = _objectWithoutProperties(_props2, ["minX", "maxX", "width", "height"]);

      this.draw_memo = this.draw_memo || { validFromDiffX: 0, validToDiffX: -1, rangeMinX: 0, rangeMaxX: -1 };
      var memo = this.draw_memo;
      var diffX = maxX - minX;
      // Generate grids, labels and bitmaps in cache
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
        var gridLabels = this.getGridLabels(minX, maxX, grids);
        memo.labelBitmaps = gridLabels.map(function (text) {
          return _this2.createTextBitmaps(text);
        });
      }
      // Filter
      var startIndex = Math.max(0, (0, _bisect.bisect_right)(memo.grids, minX));
      var endIndex = Math.min(memo.grids.length - 1, (0, _bisect.bisect_left)(memo.grids, maxX));

      var domXs = memo.grids.slice(startIndex, endIndex + 1).map(function (x) {
        return (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, x);
      });
      var labelBitmaps = memo.labelBitmaps.slice(startIndex, endIndex + 1);
      // Plot
      var canvas = this.ref.current;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);
      this.bitmapPlot(ctx, width, height, domXs, labelBitmaps);
      this.ticPlot(ctx, width, height, domXs);
    }
  }, {
    key: "getGridLabels",
    value: function getGridLabels(minX, maxX, grids) {
      var minT = new Date(minX);
      var maxT = new Date(maxX);
      var minT_Year = minT.getFullYear();
      var maxT_Year = maxT.getFullYear();
      if (minT_Year === maxT_Year) {
        var minT_Month = minT.getMonth();
        var maxT_Month = maxT.getMonth();
        if (minT_Month === maxT_Month) {
          var minT_Date = minT.getDate();
          var maxT_Date = maxT.getDate();
          if (minT_Date === maxT_Date) {
            var minT_Hour = minT.getHours();
            var maxT_Hour = maxT.getHours();
            if (minT_Hour === maxT_Hour) {
              var minT_Minute = minT.getMinutes();
              var maxT_Minute = maxT.getMinutes();
              if (minT_Minute === maxT_Minute) {
                var minT_Second = minT.getSeconds();
                var maxT_Second = maxT.getSeconds();
                if (minT_Second === maxT_Second) {
                  return grids.map(function (x) {
                    return (0, _dateFns.format)(x, "SSS");
                  });
                }
                if (maxT_Second - minT_Second < 2) {
                  return grids.map(function (x) {
                    return (0, _dateFns.format)(x, "ss.SSS");
                  });
                } else {
                  return grids.map(function (x) {
                    return (0, _dateFns.format)(x, "ss");
                  });
                }
              }
              if (maxT_Minute - minT_Minute < 2) {
                return grids.map(function (x) {
                  return (0, _dateFns.format)(x, "mm:ss");
                });
              } else {
                return grids.map(function (x) {
                  return (0, _dateFns.format)(x, "mm");
                });
              }
            }
            if (maxT_Hour - minT_Hour < 2) {
              return grids.map(function (x) {
                return (0, _dateFns.format)(x, "HH:mm");
              });
            } else {
              return grids.map(function (x) {
                return (0, _dateFns.format)(x, "HH");
              });
            }
          }
          if (maxT_Date - minT_Date < 2) {
            return grids.map(function (x) {
              return (0, _dateFns.format)(x, "DD HH");
            });
          } else {
            // show the month for the first date of the month
            var prevMonth = void 0;
            return grids.map(function (x) {
              if (prevMonth !== (0, _dateFns.format)(x, "MMM")) {
                prevMonth = (0, _dateFns.format)(x, "MMM");
                return (0, _dateFns.format)(x, "MMM/DD");
              } else {
                return (0, _dateFns.format)(x, "DD");
              }
            });
          }
        }
        if (maxT_Month - minT_Month < 2) {
          // show the month for the first date of the month
          var _prevMonth = void 0;
          return grids.map(function (x) {
            if (_prevMonth !== (0, _dateFns.format)(x, "MMM")) {
              _prevMonth = (0, _dateFns.format)(x, "MMM");
              return (0, _dateFns.format)(x, "MMM/DD");
            } else {
              return (0, _dateFns.format)(x, "DD");
            }
          });
        } else {
          // show the month for the first date of the month
          var _prevMonth2 = void 0;
          return grids.map(function (x) {
            if (_prevMonth2 !== (0, _dateFns.format)(x, "MMM")) {
              _prevMonth2 = (0, _dateFns.format)(x, "MMM");
              return (0, _dateFns.format)(x, "MMM");
            } else {
              return (0, _dateFns.format)(x, "DD");
            }
          });
        }
      }
      if (maxT_Year - minT_Year < 2) {
        return grids.map(function (x) {
          return (0, _dateFns.format)(x, "YYYY/MMM");
        });
      } else {
        return grids.map(function (x) {
          return (0, _dateFns.format)(x, "YYYY");
        });
      }
    }
  }, {
    key: "createTextBitmaps",
    value: function createTextBitmaps(text) {
      var font = "300 12px MuseoSans";
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = font;
      var width = ctx.measureText(text).width;
      var height = 12;
      canvas.width = width;
      canvas.height = height;
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, width / 2, height / 2);
      return canvas;
    }
  }, {
    key: "bitmapPlot",
    value: function bitmapPlot(ctx, width, height, domXs, bitmaps) {
      for (var i = 0; i < domXs.length; i++) {
        var bitmap = bitmaps[i];
        var x = Math.round(domXs[i] - bitmap.width / 2);
        var y = Math.round(height / 2 - bitmap.height / 2);
        ctx.drawImage(bitmap, x, y);
      }
    }
  }, {
    key: "ticPlot",
    value: function ticPlot(ctx, width, height, domXs) {
      ctx.fillStyle = "#777777";
      ctx.beginPath();
      var y = Math.round(height);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = domXs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var x = _step.value;

          ctx.moveTo(Math.round(x), y * 0.8);
          ctx.lineTo(Math.round(x), y);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      ctx.stroke();
    }
  }]);

  return DateXAxis;
}(_react.PureComponent);

exports.default = DateXAxis;