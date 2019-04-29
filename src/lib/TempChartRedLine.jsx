import React, { PureComponent } from "react";
import {
    toDomYCoord_Linear,
    toDomXCoord_Linear,
    fromDomXCoord_Linear
} from "./PlottingUtils"

class TempChartRedLine extends PureComponent {
    constructor(props) {
        super(props);
        this.canvasW = this.props.width
        this.canvasH = this.props.height
    }

    componentDidMount() {
        this.redLineCanvas = this.refs.redLineCanvas
        this.redLineCtx = this.redLineCanvas.getContext("2d")
        this.drawRedLine(this.redLineCtx)
    }

    componentDidUpdate() {
        this.drawRedLine(this.redLineCtx)
    }

    drawRedLine = (ctx) => {
        // clear canvas
        ctx.canvas.width = ctx.canvas.width

        let { time, minX, maxX } = this.props
        let domX = toDomXCoord_Linear(this.canvasW, minX / 1000, maxX / 1000, time)
        ctx.strokeStyle = 'red'
        // draw the red line
        ctx.lineWidth = 5
        ctx.moveTo(domX, 5)
        ctx.lineTo(domX, this.canvasH - 5)
        ctx.stroke()
    }

    render() {
        // let minXInSecs = minX / 1000, maxXInSecs = maxX / 1000
        return (
            <canvas
                className="redline-canvas"
                ref="redLineCanvas"
                width={this.canvasW}
                height={this.canvasH}
            />
        )
    }
}

export default TempChartRedLine