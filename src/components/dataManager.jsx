'use strict';

var React = require('react');

var DataManager = React.createClass({
  render: function(){
    return(
      <span>
      <h1>Pick data</h1>
      <button value="dataset1" onClick={this.props.setData.bind(this, "dataset1")} ref="1"/>
      <button value="dataset2" onClick={this.props.setData.bind(this, "dataset2")} ref="2"/>
      <button value="dataset3" onClick={this.props.setData.bind(this, "dataset3")} ref="3"/>

      </span>
    );
  }
})

module.exports = DataManager;