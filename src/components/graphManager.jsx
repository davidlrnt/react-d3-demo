'use strict';

var React = require('react');

var GraphManager = React.createClass({
  getInitialState: function(){
    return {
      graph: "line"
    }
  },
  render: function(){
    return(
      <span> 
        <h1>{this.state.graph}</h1>
        <h1>{this.props.data}</h1>
      </span>
    );
  }
})

module.exports = GraphManager;