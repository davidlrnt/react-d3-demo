'use strict';

var React = require('react');

var DataManager = React.createClass({
  render: function(){
    return(
      <span>
      <h1>Pick data</h1>
      <button value="data1" onClick={this.props.setData.bind(this, "data1")} ref="1"/>
      <button value="data2" onClick={this.props.setData.bind(this, "data2")} ref="2"/>
      <button value="data3" onClick={this.props.setData.bind(this, "data3")} ref="3"/>

      </span>
    );
  }
})

module.exports = DataManager;