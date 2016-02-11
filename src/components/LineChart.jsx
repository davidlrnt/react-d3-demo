'use strict';

var React = require('react');
var _ = require('lodash');
var d3 = require('d3');

var LineChart = React.createClass({
  getDefaultProps: function() {
    return {
      width: 600,
      height: 300
    }
  },

  render: function() {
    var data = this.props.data,
        size = { width: this.props.width, height: this.props.height };
      console.log(data)
    var max = _.chain(data.dataset1, data.dataset2, data.dataset3)
      .zip()
      .map(function(values) {
        return _.reduce(values, function(memo, value) { return Math.max(memo, value.y); }, 0);
      })
      .max()
      .value();

    var xScale = d3.scale.linear()
      .domain([0, 6])
      .range([0, this.props.width]);

    var yScale = d3.scale.linear()
      .domain([0, max])
      .range([this.props.height, 0]);

    var Lines = _.map(this.props.data, function (data){ return (
      <DataSeries data={data} size={size} xScale={xScale} yScale={yScale} ref="dataset1" color="cornflowerblue" />
    )})

    return (
      <Chart width={this.props.width} height={this.props.height}>
        {Lines}
        <XAxis />
        <YAxis />
      </Chart>
    );
  }
});

module.exports = LineChart;

var XAxis = React.createClass({
  render: function() {
    return (
      <g className="xAxis"/>
    );
  }
});

var YAxis = React.createClass({
  render: function() {
    return (
      <g className="yAxis"/>
    );
  }
});




var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
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
