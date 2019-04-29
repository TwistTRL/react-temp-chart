import React, { PureComponent } from 'react';

class HoverInteractionBox extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            x: undefined,
            y: undefined,
            timestamp: undefined,
            toolTipX: undefined,
            toolTipY: undefined,
            isMouseOver: undefined
        };
    }

    render() {
        let { x, y, timestamp, toolTipX, toolTipY, isMouseOver } = this.state;
        return (

            <div
                className={"hovering-box"}
                ref={this.ref}
                style={this.props.style}
                onMouseDown={console.log}
                onMouseMove={this.handleMouseMove}
                onMouseOut={this.handleMouseOut}
            >
                {this.props.render({ x, y, timestamp, toolTipX, toolTipY, isMouseOver })}
            </div>
        );
    }

    fromDomYCoord_Linear = (height, minY, maxY, domY) => {
        return (height - domY) * ((maxY - minY) / height) + minY;
    }

    fromDomXCoord_Linear = (width, minX, maxX, domX) => {
        return domX * ((maxX - minX) / width) + minX;
    }

    handleMouseMove = (ev) => {
        let bounds = this.ref.current.getBoundingClientRect();
        let domX = ev.clientX - bounds.left;
        let domY = ev.clientY - bounds.top;
        let timestamp = ev.timeStamp;
        this.setState({ x: domX, y: domY, timestamp: timestamp, toolTipX: ev.clientX, toolTipY: ev.clientY, isMouseOver: true });
        // hoveringHandler({ domX, domY, timestamp });
    }

    handleMouseOut = (ev) => {
        // let { mouseOutHandler } = this.props;
        // if (!mouseOutHandler) {
        //     return;
        // }
        // let bounds = this.ref.current.getBoundingClientRect();
        // let domX = ev.clientX - bounds.left;
        // let domY = ev.clientY - bounds.top;
        let timestamp = ev.timeStamp;
        // mouseOutHandler({ domX, domY, timestamp });
        this.setState({ ...this.state, timestamp: timestamp, isMouseOver: false });
    }
}

export default HoverInteractionBox;