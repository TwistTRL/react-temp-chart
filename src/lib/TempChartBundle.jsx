import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TempChart from './TempChart'
import TempChartLeftPanel from './TempChartLeftPanel'
import TempChartYAxis from './TempChartYAxis'
import TempChartRedLine from './TempChartRedLine'
import {
  PlotContainer,
  PlotSubContainer
} from './PlotContainers/PlotContainers'
import DynamicDateYAxisTwoLevelPanel from './DynamicDateYAxisTwoLevelPanel'
import { DateXAxis } from 'react-plot-axis'
import YAxis from './YAxis'
import './TempChart.css'

const minY = 0
const maxY = 200
const LEFT_WIDTH = 200
const RIGHT_WIDTH = 0
const TOP_HEIGHT = 40
const BOTTOM_HEIGHT = 0

class TempChartBundle extends PureComponent {
  filterDataToDtWindow (data) {
    let minX = this.props.dtWindow[0] / 1000
    let maxX = this.props.dtWindow[1] / 1000
    let filteredData = data

    if (data) {
      if (minX) {
        // filter out the data that is within the dtWindow range
        filteredData = filteredData.filter(function (o) {
          return o.time <= maxX && o.time >= minX
        })
      }
    }

    return filteredData
  }

  extractTimeFromData (data) {
    let timeArr = []
    let timeSet = new Set()

    data.map(d => {
      if (!timeSet.has(d['time'])) {
        timeArr.push(d['time'])
        timeSet.add(d['time'])
      }
    })

    return timeArr
  }

  tryToCombineData (filteredData, data) {
    if (filteredData.length >= 48) {
      if (filteredData.length >= 48 && filteredData.length < 96) {
        data = this.combineData(2, data)
      } else if (filteredData.length >= 96 && filteredData.length < 192) {
        data = this.combineData(4, data)
      } else if (filteredData.length >= 192 && filteredData.length < 384) {
        data = this.combineData(8, data)
      } else if (filteredData.length >= 384 && filteredData.length < 768) {
        data = this.combineData(16, data)
      } else if (filteredData.length >= 768 && filteredData.length < 1536) {
        data = this.combineData(32, data)
      } else if (filteredData.length >= 1536 && filteredData.length < 3072) {
        data = this.combineData(64, data)
      } else if (filteredData.length >= 3072 && filteredData.length < 6144) {
        data = this.combineData(128, data)
      } else if (filteredData.length >= 6144) {
        data = this.combineData(256, data)
      }
    }
    return data
  }

  combineData (combNum, data) {
    let combinedData = [],
      curCombinedObj,
      curCombNum = 0,
      curMinTemp = null,
      curMaxTemp = null

    data.map((d, i) => {
      if (curCombNum === 0) {
        curCombinedObj = { ...d }
      }

      if (!curMinTemp && !curMaxTemp) {
        curMinTemp = d['temp']
        curMaxTemp = d['temp']
      } else if (d['temp'] < curMinTemp) {
        curMinTemp = d['temp']
      } else if (d['temp'] > curMaxTemp) {
        curMaxTemp = d['temp']
      }

      curCombNum++

      if (curCombNum >= combNum || i === data.length - 1) {
        curCombNum = 0
        curCombinedObj['temp'] = [curMinTemp, curMaxTemp]
        combinedData.push(curCombinedObj)
        curCombinedObj = {}
        curMinTemp = null
        curMaxTemp = null
      }
    })

    return combinedData
  }

  // unix time in ms
  getDaysBetweenDates = (d0, d1) => {
    var msPerDay = 8.64e7

    // Copy dates so don't mess them up
    var x0 = new Date(d0)
    var x1 = new Date(d1)

    // Set to noon - avoid DST errors
    x0.setHours(12, 0, 0)
    x1.setHours(12, 0, 0)

    // Round to remove daylight saving errors
    return Math.round((x1 - x0) / msPerDay)
  }

  updateVisbleYRange = () => {}

  render () {
    let { dtWindow, width, height, data, isXAxisVisible } = this.props
    let filteredData
    let plotWidth = width - LEFT_WIDTH - RIGHT_WIDTH
    let plotHeight = isXAxisVisible
      ? height - TOP_HEIGHT - BOTTOM_HEIGHT
      : height
    let minX = dtWindow[0]
    let maxX = dtWindow[1]
    let minY = 18
    let maxY = 43
    let yAxisW = 50
    const styles = {
      leftPanelGradShadow: {
        position: 'absolute',
        top: 0,
        left: LEFT_WIDTH,
        height: height,
        width: 15,
        opacity: 1,
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,0.3), rgba(255,255,255,0))'
      },
      yAxisWrappingDiv: {
        position: 'absolute',
        // top: dateAxisH + "px",
        zIndex: 1,
        left: LEFT_WIDTH - yAxisW + 'px'
      }
    }

    filteredData = this.filterDataToDtWindow(data)
    // combine unfiltered data to prevent jumpy movement
    data = this.tryToCombineData(filteredData, data)
    data = this.filterDataToDtWindow(data)

    return (
      <PlotContainer
        width={width}
        height={height}
        leftWidth={LEFT_WIDTH}
        plotWidth={plotWidth}
        rightWidth={RIGHT_WIDTH}
        topHeight={isXAxisVisible ? TOP_HEIGHT : 0}
        plotHeight={plotHeight}
        bottomHeight={0}
      >
        {/*Row TOP*/}
        {/*Col LEFT*/}
        <PlotSubContainer>
          {isXAxisVisible ? (
            <DynamicDateYAxisTwoLevelPanel
              minX={dtWindow[0]}
              maxX={dtWindow[1]}
              height={TOP_HEIGHT}
              width={LEFT_WIDTH}
            />
          ) : null}
        </PlotSubContainer>
        {/*Col PLOT*/}
        <PlotSubContainer>
          {isXAxisVisible ? (
            <div>
              <div
                style={{
                  width: plotWidth,
                  height: TOP_HEIGHT,
                  backgroundColor: '#feddaa'
                }}
              ></div>
              <DateXAxis
                minX={minX}
                maxX={maxX}
                height={TOP_HEIGHT}
                width={plotWidth}
                tickPosition='bottom'
                fontSize={12}
                fontWeight={400}
                strokeStyle='rgba(0,0,0, 0.3)'
                lineWidth={2}
                isItalic={true}
              />
            </div>
          ) : null}
        </PlotSubContainer>
        {/*Col RIGHT*/}
        <PlotSubContainer></PlotSubContainer>
        {/*Row PLOT*/}
        {/*Col LEFT*/}
        <PlotSubContainer>
          <TempChartLeftPanel
            panelWidth={LEFT_WIDTH}
            panelHeight={plotHeight}
          />
          <div style={styles.yAxisWrappingDiv}>
            <YAxis
              canvasW={yAxisW}
              canvasH={plotHeight}
              minY={minY}
              maxY={maxY}
              updateVisbleYRange={this.updateVisbleYRange}
              configs={{
                axis: {
                  isDynamicYAxis: true, // dynamic y axis = scale y axis according to current visible dataSets points
                  isDynamicXAxis: true, // dynamic x axis = use x axis passed in by the plot user
                  yAxisLabelPadding: 20,
                  xAxisPadding: 0
                },
                plotStyling: {
                  dotSize: 10
                }
              }}
            />
          </div>
          {/* <TempChartYAxis canvasH={plotHeight} canvasW={LEFT_WIDTH} /> */}
        </PlotSubContainer>
        {/*Col PLOT*/}

        <PlotSubContainer>
          {/* Main plot area interaction */}
          <TempChart
            width={plotWidth}
            height={plotHeight}
            minX={dtWindow[0]}
            maxX={dtWindow[1]}
            minY={minY}
            maxY={maxY}
            data={data}
          />
          {/* <TempChartRedLine
            width={plotWidth}
            height={plotHeight}
            minX={dtWindow[0]}
            maxX={dtWindow[1]}
            time={1509562800}
          /> */}
        </PlotSubContainer>

        {/*Col RIGHT*/}
        <PlotSubContainer></PlotSubContainer>
        {/*Row BOTTOM*/}
        {/*Col LEFT*/}
        <PlotSubContainer></PlotSubContainer>
        {/*Col PLOT*/}
        <PlotSubContainer></PlotSubContainer>
        {/*Col RIGHT*/}
        <PlotSubContainer></PlotSubContainer>
        {/*Other stuffs that ignore grid layut*/}
        <div style={styles.leftPanelGradShadow}></div>
      </PlotContainer>
    )
  }
}

TempChartBundle.propTypes = {
  data: PropTypes.array.isRequired,
  dtWindow: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default TempChartBundle
