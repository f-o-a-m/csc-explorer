import React, { Component } from 'react'

import { AreaClosed, Line, Bar, LinePath } from '@vx/shape'
import { appleStock } from '@vx/mock-data'
import { curveMonotoneX } from '@vx/curve'
import { LinearGradient } from '@vx/gradient'
import { GridRows, GridColumns } from '@vx/grid'
import { scaleTime, scaleLinear } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { localPoint } from '@vx/event'
import { Point } from '@vx/point'
import { extent, max, bisector } from 'd3-array'
import { timeFormat } from 'd3-time-format'

const stock = appleStock.slice(800)
const formatDate = timeFormat("%b %d, '%y")

// accessors
const xPrice = d => new Date(d.date)
const yPrice = d => d.close
const bisectDate = bisector( d => new Date(d.date) ).left

class LineGraph extends Component {
  constructor(props) {
    super(props)
    this.handleTooltip = this.handleTooltip.bind(this)
  }

  handleTooltip({ event, data, xPrice, xScale, yScale }) {
    const { showTooltip } = this.props
    const { x } = localPoint(event)
    const x0 = xScale.invert(x)
    const index = bisectDate(data, x0, 1)
    const d0 = data[index - 1]
    const d1 = data[index]
    let d = d0
    if (d1 && d1.date) {
      d = x0 - xPrice(d0.date) > xPrice(d1.date) - x0 ? d1 : d0
    }

    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.close),
    })
  }

  render() {
    const {
      width,
      height,
      margin,
      showTooltip,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      events,
    } = this.props
    if (width < 10) return null

    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(stock, xPrice),
    })
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(stock, yPrice) + yMax / 3],
      nice: true,
    })

    return (
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={'transparent'} />
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FFFFFF"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="#FFFFFF"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <LinePath
            data={stock}
            xScale={xScale}
            yScale={yScale}
            x={xPrice}
            y={yPrice}
            stroke={'#ffffff'}
            strokeWidth={1}
            curve={curveMonotoneX}
          />
          <Line
            from={new Point({x:0, y:12})}
            to={new Point({x:width, y:12})}
            stroke={'#ffffff'}
            opacity={0.5}
            strokeWidth={1}
          />
          <Line
            from={new Point({x:0, y:height-1})}
            to={new Point({x:width, y:height-1})}
            stroke={'#ffffff'}
            opacity={0.5}
            strokeWidth={1}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill={'rgba(0,0,0,0.0)'}
            rx={14}
            data={stock}
            onTouchStart={data => event =>
              this.handleTooltip({
                event,
                data,
                xPrice,
                xScale,
                yScale,
              })}
            onTouchMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xPrice,
                xScale,
                yScale,
              })}
            onMouseMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xPrice,
                xScale,
                yScale,
              })}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke="#2F80ED"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{
                  pointerEvents: 'none',
                }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="#2F80ED"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={0}
              left={tooltipLeft}
              style={{
                backgroundColor: '#2F80ED',
                color: 'white',
                transform: 'translateX(-50%)',
                borderRadius: 999,
              }}
            >
              {`$${yPrice(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 14}
              left={tooltipLeft}
              style={{
                backgroundColor: '#242424',
                border: "1px solid #2F80ED",
                color: 'white',
                transform: 'translateX(-50%)',
                borderRadius: 999,
                whiteSpace: 'nowrap',
              }}
            >
              {formatDate(xPrice(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
}

export default withTooltip(LineGraph)
