'use strict';

var React = require('react');

var GraphManager = require('./graphManager.jsx')
var DataManager = require('./dataManager.jsx')

var data = {
  data1: {
        dataset1: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        dataset2: [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
        dataset3: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]          
  },
  data2: {
        dataset1: [ { x: 0, y: 0 }, { x: 1, y: 32 }, { x: 2, y: 10 }, { x: 3, y: 54 }, { x: 4, y: 8 }, { x: 5, y: 153 }, { x: 6, y: 120 } ],
        dataset2: [ { x: 0, y: 100 }, { x: 1, y: 32 }, { x: 2, y: 20 }, { x: 3, y: 142 }, { x: 4, y: 34 }, { x: 5, y: 62 }, { x: 6, y: 2 } ],
        dataset3: [ { x: 0, y: 82 }, { x: 1, y: 43 }, { x: 2, y: 8 }, { x: 3, y: 12 }, { x: 4, y: 56 }, { x: 5, y: 4 }, { x: 6, y: 23 } ]          
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
      data: data.data1
    }
  },
  setData: function(dataset){
    this.setState({data: data[dataset]})
  },
  render: function(){
    return(
      <span>
        <DataManager setData={this.setData} />
        <GraphManager data={this.state.data}/>
      </span>
    );
  }
});

module.exports = App;