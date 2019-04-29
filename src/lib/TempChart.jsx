import React, { PureComponent } from "react";
import {
    toDomYCoord_Linear,
    toDomXCoord_Linear,
    fromDomXCoord_Linear
} from "./PlottingUtils"

class TempChart extends PureComponent {
    constructor(props) {
        super(props);
        this.canvasW = this.props.width
        this.canvasH = this.props.height
    }

    componentDidMount() {
        this.tempChartCanvas = this.refs.tempChartCanvas
        this.tempChartCtx = this.tempChartCanvas.getContext("2d")
        this.drawTempChart(this.tempChartCtx)

        this.grd = this.tempChartCtx.createLinearGradient(0, 0, 0, this.canvasH);
        this.grd.addColorStop(0.168, 'rgba(255, 86, 86, 1.000)');
        this.grd.addColorStop(0.304, 'rgba(170, 255, 170, 1.000)');
        this.grd.addColorStop(0.452, 'rgba(86, 170, 255, 1.000)');
    }

    componentDidUpdate() {
        this.drawTempChart(this.tempChartCtx)
    }

    roundRect(ctx, x0, y0, x1, y1, r, color) {
        var w = x1 - x0;
        var h = y1 - y0;
        if (r > w / 2) r = w / 2;
        if (r > h / 2) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x1 - r, y0);
        ctx.quadraticCurveTo(x1, y0, x1, y0 + r);
        ctx.lineTo(x1, y1 - r);
        ctx.quadraticCurveTo(x1, y1, x1 - r, y1);
        ctx.lineTo(x0 + r, y1);
        ctx.quadraticCurveTo(x0, y1, x0, y1 - r);
        ctx.lineTo(x0, y0 + r);
        ctx.quadraticCurveTo(x0, y0, x0 + r, y0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    drawTempChart = (ctx) => {
        let { minX, maxX, minY, maxY, data } = this.props
        let fromBackgroundFillData = 40

        ctx.clearRect(0, 0, this.canvasW, this.canvasH)

        for (let i = 0; i < 5; i++) {
            let fillStyle
            if (fromBackgroundFillData % 10 !== 0) {
                fillStyle = 'white'
            } else {
                fillStyle = '#fff3e4'
            }
            ctx.beginPath()
            ctx.fillStyle = fillStyle
            let fromBackGroundDomY = toDomYCoord_Linear(this.canvasH, 18, 43, fromBackgroundFillData)
            let toBackGroundDomY = toDomYCoord_Linear(this.canvasH, 18, 43, fromBackgroundFillData - 5)
            ctx.rect(0, fromBackGroundDomY, this.canvasW, toBackGroundDomY - fromBackGroundDomY)
            fromBackgroundFillData -= 5
            ctx.fill()
        }

        data.map(d => {
            let domY, domX = toDomXCoord_Linear(this.canvasW, minX / 1000, maxX / 1000, d["time"])

            ctx.beginPath()

            let circle
            if (d["temp"] instanceof Array) {
                let minDomY = toDomYCoord_Linear(this.canvasH, 18, 43, d["temp"][0])
                let maxDomY = toDomYCoord_Linear(this.canvasH, 18, 43, d["temp"][1])
                let diff = Math.abs(maxDomY - minDomY)

                if (diff < 9) {
                    this.roundRect(ctx, domX - 4, maxDomY - 4, domX + 4, minDomY + 4, 20, this.grd)
                } else {
                    this.roundRect(ctx, domX - 4, maxDomY, domX + 4, minDomY, 20, this.grd)
                }

            } else {
                domY = toDomYCoord_Linear(this.canvasH, 18, 43, d["temp"])

                if (d["temp"] < 35) {
                    circle = this.getCircle("black");
                } else if (d["temp"] > 37) {
                    circle = this.getCircle("red");
                } else {
                    circle = this.getCircle("green");
                }

                ctx.drawImage(circle, domX - circle.width / 2, domY - circle.height / 2);
            }
        })
    }

    getCircle(color) {
        if (color === "green") {
            if (!this.greenCircle) {
                let canvas = document.createElement("canvas");
                canvas.width = 6;
                canvas.height = 6;
                let ctx = canvas.getContext("2d");
                ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                ctx.fillStyle = '#4cb447'
                ctx.fill();
                this.greenCircle = canvas;
            }
            return this.greenCircle;
        } else if (color === "black") {
            if (!this.blackCircle) {
                let canvas = document.createElement("canvas");
                canvas.width = 6;
                canvas.height = 6;
                let ctx = canvas.getContext("2d");
                ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                ctx.fillStyle = '#727272'
                ctx.fill();
                this.blackCircle = canvas;
            }
            return this.blackCircle;
        } else {
            if (!this.redCircle) {
                let canvas = document.createElement("canvas");
                canvas.width = 6;
                canvas.height = 6;
                let ctx = canvas.getContext("2d");
                ctx.arc(3, 3, 2, 0, 2 * Math.PI);
                ctx.fillStyle = '#cc7766'
                ctx.fill();
                this.redCircle = canvas;
            }
            return this.redCircle;
        }
    }

    render() {
        const styles = {
            tempChartCanvas: { zIndex: -1 }
        }
        return (
            <canvas
                className="temp-chart-canvas"
                ref="tempChartCanvas"
                width={this.canvasW}
                height={this.canvasH}
                style={styles.tempChartCanvas}
            />
        )
    }
}

export default TempChart