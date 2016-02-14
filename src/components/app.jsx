'use strict';

var React = require('react');
var d3 = require('d3');
var ReactD3 = require('react-d3-components');
var BarChart = ReactD3.BarChart;
var LineChart = ReactD3.LineChart;



var GraphManager = require('./graphManager.jsx')
var DataManager = require('./dataManager.jsx')

var data = {
  data1: {
        dataset1: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        dataset2: [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
        dataset3: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]          
  },
  data2: {
        dataset1: [ { x: 0, y: 0 }, { x: 1, y: 32 }, { x: 2, y: 10 }, { x: 3, y: 54 }, { x: 4, y: 8 }, { x: 5, y: 153 }, { x: 6, y: 120 },{ x: 7, y: 82 }, { x: 8, y: 43 }, { x: 9, y: 8 }, { x: 10, y: 12 }, { x: 11, y: 56 }, { x: 12, y: 4 }, { x: 13, y: 23 } ],
        dataset2: [ { x: 0, y: 100 }, { x: 1, y: 32 }, { x: 2, y: 20 }, { x: 3, y: 142 }, { x: 4, y: 34 }, { x: 5, y: 62 }, { x: 6, y: 2 }, { x: 7, y: 82 }, { x: 8, y: 143 }, { x: 9, y: 8 }, { x: 10, y: 122 }, { x: 11, y: 56 }, { x: 12, y: 4 }, { x: 13, y: 23 } ],
        dataset3: [ { x: 0, y: 82 }, { x: 1, y: 43 }, { x: 2, y: 8 }, { x: 3, y: 12 }, { x: 4, y: 56 }, { x: 5, y: 4 }, { x: 6, y: 23 }, { x: 7, y: 82 }, { x: 8, y: 143 }, { x: 9, y: 8 }, { x: 10, y: 122 }, { x: 11, y: 56 }, { x: 12, y: 4 }, { x: 13, y: 23 }  ]          
  },
  data3: {
        dataset1: [ { x: 0, y: 200 }, { x: 1, y: 300 }, { x: 2, y: 150 }, { x: 3, y: 53 }, { x: 4, y: 80 }, { x: 5, y: 150 }, { x: 6, y: 100 } ],
        dataset2: [ { x: 0, y: 48 }, { x: 1, y: 45 }, { x: 2, y: 120 }, { x: 3, y: 212 }, { x: 4, y: 44 }, { x: 5, y: 46 }, { x: 6, y: 42 } ],
        dataset3: [ { x: 0, y: 100 }, { x: 1, y: 105 }, { x: 2, y: 108 }, { x: 3, y: 102 }, { x: 4, y: 106 }, { x: 5, y: 98 }, { x: 6, y: 120 } ]          
  }
}

var App = React.createClass({
  getInitialState: function(){
    return {
      data: data.data1,
      data1: { 
                label: '', 
                values: [
                {x: new Date(2015, 2, 5), y: 1},
                {x: new Date(2015, 2, 6), y: 2},
                {x: new Date(2015, 2, 7), y: 0},
                {x: new Date(2015, 2, 8), y: 3},
                {x: new Date(2015, 2, 9), y: 2},
                {x: new Date(2015, 2, 10), y: 3},
                {x: new Date(2015, 2, 11), y: 4},
                {x: new Date(2015, 2, 12), y: 4},
                {x: new Date(2015, 2, 13), y: 1},
                {x: new Date(2015, 2, 14), y: 5},
                {x: new Date(2015, 2, 15), y: 0},
                {x: new Date(2015, 2, 16), y: 1},
                {x: new Date(2015, 2, 16), y: 1},
                {x: new Date(2015, 2, 18), y: 4},
                {x: new Date(2015, 2, 19), y: 4},
                {x: new Date(2015, 2, 20), y: 5},
                {x: new Date(2015, 2, 21), y: 5},
                {x: new Date(2015, 2, 22), y: 5},
                {x: new Date(2015, 2, 23), y: 1},
                {x: new Date(2015, 2, 24), y: 0},
                {x: new Date(2015, 2, 25), y: 1},
                {x: new Date(2015, 2, 26), y: 1}
                ]
              },
      xScale: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70]),

    }
  },
  setData: function(dataset){
    this.setState({data: data[dataset]})
  },
  render: function(){
    var data = [{
    label: 'somethingA',
    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    }];


    return(
      <span>
        <DataManager setData={this.setData} />
        <GraphManager data={this.state.data}/>
        <BarChart
        data={data}
        width={600}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
      <LineChart
       data={this.state.data1}
       width={600}
       height={400}
       margin={{top: 10, bottom: 50, left: 50, right: 20}}
       xScale={this.state.xScale}
       xAxis={{tickValues: this.state.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}}
                />
      </span>
    );
  }
});

module.exports = App;