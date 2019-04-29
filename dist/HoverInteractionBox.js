"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HoverInteractionBox = function (_PureComponent) {
    _inherits(HoverInteractionBox, _PureComponent);

    function HoverInteractionBox(props) {
        _classCallCheck(this, HoverInteractionBox);

        var _this = _possibleConstructorReturn(this, (HoverInteractionBox.__proto__ || Object.getPrototypeOf(HoverInteractionBox)).call(this, props));

        _this.fromDomYCoord_Linear = function (height, minY, maxY, domY) {
            return (height - domY) * ((maxY - minY) / height) + minY;
        };

        _this.fromDomXCoord_Linear = function (width, minX, maxX, domX) {
            return domX * ((maxX - minX) / width) + minX;
        };

        _this.handleMouseMove = function (ev) {
            var bounds = _this.ref.current.getBoundingClientRect();
            var domX = ev.clientX - bounds.left;
            var domY = ev.clientY - bounds.top;
            var timestamp = ev.timeStamp;
            _this.setState({ x: domX, y: domY, timestamp: timestamp, toolTipX: ev.clientX, toolTipY: ev.clientY, isMouseOver: true });
            // hoveringHandler({ domX, domY, timestamp });
        };

        _this.handleMouseOut = function (ev) {
            // let { mouseOutHandler } = this.props;
            // if (!mouseOutHandler) {
            //     return;
            // }
            // let bounds = this.ref.current.getBoundingClientRect();
            // let domX = ev.clientX - bounds.left;
            // let domY = ev.clientY - bounds.top;
            var timestamp = ev.timeStamp;
            // mouseOutHandler({ domX, domY, timestamp });
            _this.setState(_extends({}, _this.state, { timestamp: timestamp, isMouseOver: false }));
        };

        _this.ref = _react2.default.createRef();
        _this.state = {
            x: undefined,
            y: undefined,
            timestamp: undefined,
            toolTipX: undefined,
            toolTipY: undefined,
            isMouseOver: undefined
        };
        return _this;
    }

    _createClass(HoverInteractionBox, [{
        key: "render",
        value: function render() {
            var _state = this.state,
                x = _state.x,
                y = _state.y,
                timestamp = _state.timestamp,
                toolTipX = _state.toolTipX,
                toolTipY = _state.toolTipY,
                isMouseOver = _state.isMouseOver;

            return _react2.default.createElement(
                "div",
                {
                    className: "hovering-box",
                    ref: this.ref,
                    style: this.props.style,
                    onMouseDown: console.log,
                    onMouseMove: this.handleMouseMove,
                    onMouseOut: this.handleMouseOut
                },
                this.props.render({ x: x, y: y, timestamp: timestamp, toolTipX: toolTipX, toolTipY: toolTipY, isMouseOver: isMouseOver })
            );
        }
    }]);

    return HoverInteractionBox;
}(_react.PureComponent);

exports.default = HoverInteractionBox;