"use strict";

var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');

var App = require('./components/app.jsx');

ReactDom.render(<App />, document.getElementById('react-app') );
