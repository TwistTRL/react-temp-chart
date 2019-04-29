import React, { PureComponent } from "react";

class TempChartYAxis extends PureComponent {
    constructor(props) {
        super(props);
        this.canvasW = this.props.canvasW
        this.canvasH = this.props.canvasH
        this.minY = this.props.minY
        this.maxY = this.props.maxY
    }

    componentDidMount() {
        this.tempChartYAxisCanvas = this.refs.tempChartYAxisCanvas
        this.tempChartYAxisCtx = this.tempChartYAxisCanvas.getContext("2d")
        this.drawYAxis(this.tempChartYAxisCtx);
    }

    componentDidUpdate() {
        this.minY = this.props.minY
        this.maxY = this.props.maxY
        this.drawYAxis(this.tempChartYAxisCtx);
    }

    toDomYCoord_Linear = (height, minY, maxY, dataY) => {
        return height - (dataY - minY) / ((maxY - minY) / height);
    }

    drawYAxis = (ctx) => {
        let labels = [20, 30, 40]
        // clear canvas
        ctx.canvas.width = ctx.canvas.width

        // draw the y-axis line
        ctx.lineWidth = 3
        ctx.moveTo(this.canvasW, 5)
        ctx.lineTo(this.canvasW, this.canvasH - 5)
        ctx.stroke()

        // label styling
        ctx.font = "600 14px MuseoSans Sans";
        ctx.textBaseline = "middle";
        ctx.fillStyle = '#373c62'

        for (let i = 0; i < labels.length; i++) {
            let posDomY = this.toDomYCoord_Linear(this.canvasH, 18, 43, labels[i])
            // ctx.moveTo(this.canvasW - 10, posDomY)
            // ctx.lineTo(this.canvasW, posDomY)
            ctx.fillText(labels[i], this.canvasW - 25, posDomY)
        }
        ctx.stroke()
    }

    roundToNearestTenth(n) {
        return (parseInt(n / 10, 10) + 1) * 10;
    }

    render() {
        return (
            <canvas
                className="temp-chart-y-axis"
                ref="tempChartYAxisCanvas"
                style={{ position: "absolute" }}
                width={this.canvasW}
                height={this.canvasH}
            />

        )
    }
}

export default TempChartYAxis