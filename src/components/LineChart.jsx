'use strict';

var React = require('react');
var _ = require('lodash');
var d3 = require('d3');
var Ticks = require('./Ticks.jsx')

var LineChart = React.createClass({
  getDefaultProps: function() {
    // return {
    //   margin: {top: 20, right: 20, bottom: 30, left: 50},
    //   width: 960 - this.margin.left - this.margin.right,
    //   height: 500 - this.margin.top - this.margin.bottom
    // }

    return new function() {
      this.margin = {top: 20, right: 20, bottom: 30, left: 50},
      this.width = 960 - this.margin.left - this.margin.right,
      this.height = 500 - this.margin.top - this.margin.bottom
    };
  },

  render: function() {
    var data = this.props.data,
        size = { width: this.props.width, height: this.props.height };
    var max = _.chain(data.dataset1, data.dataset2, data.dataset3)
      .zip()
      .map(function(values) {
        return _.reduce(values, function(memo, value) { return Math.max(memo, value.y); }, 0);
      })
      .max()
      .value();

    var maxX = _.chain(data.dataset1, data.dataset2, data.dataset3)
      .zip()
      .map(function(values) {
        return _.reduce(values, function(memo, value) { return Math.max(memo, value.x); }, 0);
      })
      .max()
      .value();

    var xScale = d3.scale.linear()
      .domain([0, maxX])
      .range([0, this.props.width]);

    var yScale = d3.scale.linear()
      .domain([0, max])
      .range([this.props.height, 0]);

    var Lines = _.map(this.props.data, function (data){ return (
      <DataSeries data={data} size={size} xScale={xScale} yScale={yScale} ref="dataset1" color="cornflowerblue" />
    )})
    console.log("width",this.props.width )
    console.log("width + margin", this.props.width + this.props.margin.left + this.props.margin.right)
    // <Chart width={this.props.width + this.props.margin.left + this.props.margin.right} height={this.props.height}>

    return (
      <Chart dimensions={this.props}>
        {Lines}
        <XAxis xScale={xScale} height={this.props.height}/>
        <YAxis yScale={yScale} />
      </Chart>
    );
  }
});

module.exports = LineChart;

var XAxis = React.createClass({
  render: function() {
    var styles = {
      test: {
        transform: "translate(0px,"+this.props.height +"px)"
      }
    }
    var xScale = this.props.xScale;
    var tickValues = xScale.ticks(5)
    console.log(tickValues)
    return (
      <g>
        <g className="xAxis" style={styles.test} >
          <AxisLine scale={xScale} orient="bottom" />
          <Ticks scale={xScale} orient="left" tickValues={tickValues}/>
        </g>
      </g>
    );
  }
});

var YAxis = React.createClass({
  render: function() {
    var yScale = this.props.yScale;
    var tickValues = yScale.ticks(5)

    console.log("yvalues", tickValues)
    return (
      <g>
        <g className="yAxis" >
          <AxisLine scale={yScale} orient="left" />
          <Ticks scale={yScale} orient="left" tickValues={tickValues}/>
        </g>
      </g>
    );
  }
});

// var Ticks = React.createClass({
//   render: function(){
//     return(
//       <g className="ImaTick"/>
//     );
//   }
// })

var AxisLine =  React.createClass({
  render: function(){
    var scale = this.props.scale,
        orient = this.props.orient;

    function d3_scaleExtent(domain) {
      var start = domain[0], stop = domain[domain.length - 1];
      return start < stop ? [start, stop] : [stop, start];
    }

    function d3_scaleRange(scale) {
      return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
    }

    var range = d3_scaleRange(scale);
    var sign = -1;
    var outerTickSize = 6;

    var d;
    if (orient === "bottom" || orient === "top") {
      d = "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;
    } else {
      d = "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize;
    }

    return(
        <path
          className="react-stockcharts-axis-line"
          shapeRendering="crispEdges"
          d={d}
          fill="none"
          opacity="1"
          stroke="#000000"
          strokeWidth="1" >
        </path>
    );
  }
});

var Chart = React.createClass({
  render: function() {
    var dimensions = this.props.dimensions;
    var style = {
      transform: "translate("+dimensions.margin.left + "," + dimensions.margin.top +")"
    }
    return (
      <svg width={dimensions.width + dimensions.margin.left + dimensions.margin.right } height={dimensions.height + dimensions.margin.top + dimensions.margin.bottom }>
        <g transform={style.transform} className="groupInsideSvg">
          {this.props.children}
        </g>
      </svg>
    );
  }
});

var Line = React.createClass({
  getDefaultProps: function() {
    return {
      path: '',
      color: 'blue',
      width: 2
    }
  },

  render: function() {
    return (
      <path d={this.props.path} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
    );
  }
});

var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: [],
      interpolate: 'linear'
    }
  },

  render: function() {
    var self = this,
        props = this.props,
        yScale = props.yScale,
        xScale = props.xScale;
    
    var path = d3.svg.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.y); })
        .interpolate(this.props.interpolate);

    return (
      <Line path={path(this.props.data)} color={this.props.color} />
    )
  }
});
