'use strict';

var React = require('react');

var GraphManager = require('./graphManager.jsx')
var DataManager = require('./dataManager.jsx')

var data = {
  dataset1:["d1"],
  dataset2:["d2"],
  dataset3:["d3"]
}

var App = React.createClass({
  getInitialState: function(){
    return {
      data: data.dataset1
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