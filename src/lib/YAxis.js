import React, { PureComponent } from 'react'
import PlotInteractionBoxProvider from './PlotInteraction/PlotInteractionBoxProvider'
import { toDomYCoord_Linear, toDomXCoord_Linear } from './PlottingUtils'

function round5 (x) {
  return Math.round(Math.ceil(x / 5) * 5)
}

const YAXIS_FONT_STYLE = {
  size: 12,
  color: 'black',
  fontFamily: 'MuseoSans, sans-serif'
}

class YAxis extends PureComponent {
  constructor (props) {
    super(props)
    this.canvasW = this.props.canvasW
    this.canvasH = this.props.canvasH
    this.minY = this.props.minY
    this.maxY = this.props.maxY
    this.yAxisSkipInterval = 50
    this.yAxisLabelTextCanvasCache = {}
    this.handlePan = this.handlePan.bind(this)
    this.handlePanned = this.handlePanned.bind(this)
    this.prevPanDist = 0
    this.dynamicMaxY = 0
    this.initMaxY = this.props.maxY
  }

  componentDidMount () {
    this.yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding
    this.yAxisLabels = this.generateYAxisLabels(this.maxY * 100)
    this.yAxisCanvas = this.refs.yAxisCanvas
    this.yAxisCtx = this.yAxisCanvas.getContext('2d')
    this.setUpCtx(this.yAxisCtx)
    this.drawYAxis(
      this.yAxisCtx,
      this.getYAxisLabelSkipInterval(
        this.minY,
        this.maxY,
        this.canvasH,
        this.yAxisLabelPadding,
        20
      )
    )
  }

  componentDidUpdate () {
    this.yAxisLabelPadding = this.props.configs.axis.yAxisLabelPadding
    this.minY = this.props.minY
    this.maxY = this.props.maxY
    this.drawYAxis(
      this.yAxisCtx,
      this.getYAxisLabelSkipInterval(
        this.minY,
        this.maxY,
        this.canvasH,
        this.yAxisLabelPadding,
        20
      )
    )
  }

  toDomYCoord_Linear (height, minY, maxY, dataY) {
    return height - (dataY - minY) / ((maxY - minY) / height)
  }

  getYAxisLabelSkipInterval (
    minY,
    maxY,
    height,
    labelPadding = 20,
    labelTextHeight
  ) {
    let numOfLabelsCanFit = Math.round(
      height / (labelTextHeight + labelPadding)
    )

    return round5((maxY - minY) / numOfLabelsCanFit)
  }

  generateYAxisLabels (maxY) {
    let yAxisLabels = []
    let yAxisLabelInterval = 1

    for (
      let curYAxisLabel = 0;
      curYAxisLabel < round5(maxY);
      curYAxisLabel += yAxisLabelInterval
    ) {
      yAxisLabels.push(curYAxisLabel)
    }

    return yAxisLabels
  }

  setUpCtx (ctx) {
    // y-axis vertical line styling
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2.5
    // text styling
    ctx.font =
      '500 ' + YAXIS_FONT_STYLE.size + 'px ' + YAXIS_FONT_STYLE.fontFamily
    ctx.lineWidth = 0.6
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    ctx.fillStyle = 'gray'
    this.textHeight = ctx.measureText('M').width
  }

  drawYAxis (ctx, yAxisLabelInterval) {
    let yAxisHorizontalLineWidth = 5

    // clear canvas
    ctx.clearRect(0, 0, this.canvasW, this.canvasH)
    ctx.beginPath()

    // draw the y-axis vertical line
    ctx.moveTo(this.canvasW, 5)
    ctx.lineTo(this.canvasW, this.canvasH - 5)

    // draw the positive labels and horizontal lines
    for (let i = 0; i < this.maxY; i += yAxisLabelInterval) {
      let domY = Math.floor(
        this.toDomYCoord_Linear(
          this.canvasH,
          this.minY,
          this.maxY,
          this.yAxisLabels[i]
        )
      )
      ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, domY)
      ctx.lineTo(this.canvasW, domY)
      ctx.drawImage(
        this.getTextCanvas(this.yAxisLabels[i]),
        0,
        domY - this.textHeight / 2
      )
    }

    if (this.minY < 0) {
      for (let i = yAxisLabelInterval; i < this.maxY; i += yAxisLabelInterval) {
        let domY = Math.floor(
          this.toDomYCoord_Linear(
            this.canvasH,
            this.minY,
            this.maxY,
            -this.yAxisLabels[i]
          )
        )
        ctx.moveTo(this.canvasW - yAxisHorizontalLineWidth, domY)
        ctx.lineTo(this.canvasW, domY)
        ctx.drawImage(
          this.getTextCanvas(-this.yAxisLabels[i]),
          0,
          domY - this.textHeight / 2
        )
      }
    }

    ctx.stroke()
  }

  getTextCanvas (txt) {
    let cachedLabelTextCanvas = this.yAxisLabelTextCanvasCache[txt]

    if (cachedLabelTextCanvas === undefined) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = this.canvasW
      canvas.height = this.textHeight * 2

      // text styling
      ctx.font = YAXIS_FONT_STYLE.size + 'px ' + YAXIS_FONT_STYLE.fontFamily
      ctx.textBaseline = 'top'
      ctx.textAlign = 'right'
      ctx.fillStyle = YAXIS_FONT_STYLE.color
      ctx.fillText(txt, this.canvasW - 7, 0)
      cachedLabelTextCanvas = canvas
      this.yAxisLabelTextCanvasCache[txt] = canvas
    }

    return cachedLabelTextCanvas
  }

  handlePan (e) {
    // if (this.maxY + (e.end.domY - e.start.domY - this.prevPanDist) <= this.initMaxY) {
    let newMaxY = this.maxY + (e.end.domY - e.start.domY - this.prevPanDist)
    // update min/max y callback
    this.props.updateVisbleYRange([-newMaxY, newMaxY])
    this.prevPanDist = e.end.domY - e.start.domY
    // }
  }

  handlePanned () {
    this.prevPanDist = 0
  }

  render () {
    // width, height, data from props
    // reserve className for parent
    return (
      <div>
        <div
          style={{
            position: 'absolute'
          }}
        >
          <canvas
            className='plot-y-axis'
            ref='yAxisCanvas'
            width={this.canvasW}
            height={this.canvasH}
          />{' '}
        </div>{' '}
        <div
          style={{
            position: 'absolute',
            cursor: 'ns-resize'
          }}
        >
          <PlotInteractionBoxProvider
            width={this.canvasW}
            height={this.canvasH}
            handlePan={this.handlePan}
            handlePanned={this.handlePanned}
            render={() => {}}
          />{' '}
        </div>{' '}
      </div>
    )
  }
}

export default YAxis
