'use strict';

var React = require('react');
var d3 = require('d3');

// module.exports = 
React.createClass({

  // displayName: 'AxisTick',

  propTypes: {
  //   scale: React.PropTypes.func.isRequired,
  //   orient: React.PropTypes.oneOf(['top','bottom','left','right']).isRequired,
  //   orient2nd: React.PropTypes.oneOf(['top','bottom','left','right']),
  //   height: React.PropTypes.number.isRequired,
  //   width: React.PropTypes.number.isRequired,
  //   horizontal: React.PropTypes.bool,
  //   tickArguments : React.PropTypes.array,
  //   tickValues: React.PropTypes.array,
  //   innerTickSize: React.PropTypes.number,
  //   outerTickSize: React.PropTypes.number,
  //   tickPadding: React.PropTypes.number,
    tickFormat: React.PropTypes.func,
  //   tickStroke: React.PropTypes.string,
  //   gridHorizontal: React.PropTypes.bool,
  //   gridVertical: React.PropTypes.bool,
  //   gridHorizontalStroke: React.PropTypes.string,
  //   gridVerticalStroke: React.PropTypes.string,
  //   gridHorizontalStrokeWidth: React.PropTypes.number,
  //   gridVerticalStrokeWidth: React.PropTypes.number,
  //   gridHorizontalStrokeDash: React.PropTypes.string,
  //   gridVerticalStrokeDash: React.PropTypes.string
  },
  // getDefaultProps() {
  //   return {
  //     innerTickSize: 6,
  //     outerTickSize: 6,
  //     tickStroke: '#000',
  //     tickPadding: 3,
  //     tickArguments: [10],
  //     tickValues: null,
  //     gridHorizontal: false,
  //     gridVertical: false,
  //     gridHorizontalStroke: '#D8D7D7',
  //     gridVerticalStroke: '#D8D7D7',
  //     gridHorizontalStrokeWidth: 1,
  //     gridVerticalStrokeWidth: 1,
  //     gridHorizontalStrokeDash: '5, 5',
  //     gridVerticalStrokeDash: '5, 5'
  //   };
  // },

  render() {
    var props = this.props;

    var tr,
        ticks,
        scale,
        adjustedScale,
        orient,
        textAnchor,
        textTransform,
        tickFormat,
        y0, y1, y2, dy, x0, x1, x2, dx;

    var gridStrokeWidth,
        gridStroke,
        gridStrokeDashArray,
        x2grid,
        y2grid;
    var gridOn = false;

    var sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1;
    var tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding;

    scale = props.scale;

    if (props.tickValues) {
      ticks = props.tickValues;
    } else if (scale.ticks) {
      ticks = scale.ticks.apply(scale, props.tickArguments);
    } else {
      ticks = scale.domain();
    }

    if (props.tickFormatting) {
        tickFormat = props.tickFormatting;
    } else if (scale.tickFormat) {
        tickFormat = scale.tickFormat.apply(scale, props.tickArguments);
    } else {
        tickFormat = (d)=> d;
    }

    adjustedScale = scale.rangeBand ? (d) => { return scale(d) + scale.rangeBand() / 2; } : scale;


    // Still working on this
    // Ticks and lines are not fully aligned
    // in some orientations
    switch (props.orient) {
      case 'top':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = "middle";
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy =  sign < 0 ? "0em" : ".71em";
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'bottom':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = "middle";
        y2 = props.innerTickSize * sign;
        y1 = tickSpacing * sign;
        dy =  sign < 0 ? "0em" : ".71em";
        x2grid = 0;
        y2grid = -props.height;
        break;
      case 'left':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "end";
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = ".32em";
        x2grid = props.width;
        y2grid = 0;
        break;
      case 'right':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "start";
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = ".32em";
        x2grid = -props.width;
        y2grid = 0;
        break;
    }

  //   if (props.horizontalChart) {
  //     textTransform = "rotate(-90)";
  //     [y1, x1] = [x1, -y1 || 0];

  //     switch (props.orient) {
  //       case 'top':
  //         textAnchor = "start";
  //         dy = ".32em";
  //         break;
  //       case 'bottom':
  //         textAnchor = "end";
  //         dy = ".32em";
  //         break;
  //       case 'left':
  //         textAnchor = 'middle';
  //         dy = sign < 0 ? ".71em" : "0em";
  //         break;
  //       case 'right':
  //         textAnchor = 'middle';
  //         dy = sign < 0 ? ".71em" : "0em";
  //         break;
  //     }
  //   }

  //   if (props.gridHorizontal) {
  //     gridOn = true;
  //     gridStrokeWidth = props.gridHorizontalStrokeWidth;
  //     gridStroke = props.gridHorizontalStroke;
  //     gridStrokeDashArray = props.gridHorizontalStrokeDash;
  //   }
  //   else if (props.gridVertical) {
  //     gridOn = true;
  //     gridStrokeWidth = props.gridVerticalStrokeWidth;
  //     gridStroke = props.gridVerticalStroke;
  //     gridStrokeDashArray = props.gridVerticalStrokeDash;
  //   }

  //   // return grid line if grid is enabled and grid line is not on at same position as other axis.
    var gridLine = function(pos) {
      if (gridOn
        && !(props.orient2nd == 'left' && pos == 0)
        && !(props.orient2nd == 'right' && pos == props.width)
        && !((props.orient == 'left' || props.orient == 'right') && pos == props.height)
      ) {
        return (
          <line style={{
            strokeWidth: gridStrokeWidth,
            shapeRendering: 'crispEdges',
            stroke: gridStroke,
            strokeDasharray: gridStrokeDashArray
            }} x2={x2grid} y2={y2grid}></line>
        )
      }
    }

    var optionalTextProps = textTransform ? {
      transform: textTransform
    } : {};
    var allTicks = ticks.map( (tick, idx) => {
          return (
            <g key={idx} className="tick" transform={tr(tick)} >
              {gridLine(adjustedScale(tick))}
              <line style={{shapeRendering:'crispEdges',opacity:'1',stroke:props.tickStroke}} x2={x2} y2={y2} >
              </line>
              <text
                strokeWidth="0.01"
                dy={dy} x={x1} y={y1}
                style={{stroke:props.tickTextStroke, fill:props.tickTextStroke}}
                textAnchor={textAnchor}
                {...optionalTextProps}
              >
                {tickFormat(tick)}
              </text>
            </g>
          );
          })
    return (
      <g>
        {allTicks}
      </g>
    );
  }

});





// module.exports = React.createClass({
  React.createClass({
      _d3_scaleExtent: function _d3_scaleExtent(domain) {
        var start = domain[0],
            stop = domain[domain.length - 1];
        return start < stop ? [start, stop] : [stop, start];
    },

    _d3_scaleRange: function _d3_scaleRange(scale) {
        return scale.rangeExtent ? scale.rangeExtent() : this._d3_scaleExtent(scale.range());
    },
  render: function(){


    // var _props = this.props;
    // var height = _props.height;
    // var width = _props.width;
    // var tickArguments = _props.tickArguments;
    // var tickValues = _props.tickValues;

    var innerTickSize = 5;
    var tickPadding = 5;
    var outerTickSize = 5;
    // var scale = _props.scale;
    // var orientation = _props.orientation;
    var className = "tick";
    // var zero = _props.zero;
    var label = "hello";


    var scale = this.props.scale
    var orientation = this.props.orient

    var tickFormat = scale.tickFormat.apply(scale, this.props.tickValues);


    var tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

    var sign = orientation === "top" || orientation === "left" ? -1 : 1;
    


    var range = this._d3_scaleRange(scale);


     var transform = undefined,
            x = undefined,
            y = undefined,
            x2 = undefined,
            y2 = undefined,
            dy = undefined,
            textAnchor = undefined,
            d = undefined,
            labelElement = undefined;
        if (orientation === "bottom" || orientation === "top") {
            transform = "translate({}, 0)";
            x = 0;
            y = sign * tickSpacing;
            x2 = 0;
            y2 = sign * innerTickSize;
            dy = sign < 0 ? "0em" : ".71em";
            textAnchor = "middle";
            d = "M" + range[0] + ", " + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;

            labelElement = React.createElement(
                "text",
                { className: "" + className + " label", textAnchor: "end", x: width, y: -6 },
                label
            );
        } else {
            transform = "translate(0, 0)";
            x = sign * tickSpacing;
            y = 0;
            x2 = sign * innerTickSize;
            y2 = 0;
            dy = ".32em";
            textAnchor = sign < 0 ? "end" : "start";
            d = "M" + sign * outerTickSize + ", " + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize;

            labelElement = React.createElement(
                "text",
                { className: "" + className + " label", textAnchor: "end", y: 6, dy: ".75em", transform: "rotate(-90)" },
                label
            );
        }

    var tickElements = this.props.tickValues.map(function (tick, index) {
            var position = scale(tick);
            console.log("position",position)
            var translate = transform.replace("{}", position);

            return React.createElement(
                "g",
                { key: "" + tick + "." + index, className: "tick", transform: translate },
                React.createElement("line", { x2: x2, y2: y2, stroke: "#aaa" }),
                React.createElement(
                    "text",
                    { x: x, y: y, dy: dy, textAnchor: textAnchor },
                    tickFormat(tick)
                )
            );
        });
    console.log("tickElements", tickElements)
    // innerHTML: "<g class="tick" transform="translate(10,0)" style="opacity: 1;"><line y2="6" x2="0" style="stroke: rgb(0, 0, 0);"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">20</text></g><g class="tick" transform="translate(45.84905660377358,0)" style="opacity: 1;"><line y2="6" x2="0" style="stroke: rgb(0, 0, 0);"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">30</text></g><g class="tick" transform="translate(81.69811320754717,0)" style="opacity: 1;"><line y2="6" x2="0" style="stroke: rgb(0, 0, 0);"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">40</text></g><g class="tick" transform="translate(117.54716981132076,0)" style="opacity: 1;"><line y2="6" x2="0" style="stroke: rgb(0, 0, 0);"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">50</text></g><g class="tick" transform="translate(153.39622641509433,0)" style="opacity: 1;"><line y2="6" x2="0" style="stroke: rgb(0, 0, 0);"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">60</text></g><g class="tick" transform="translate(189.24528301886792,0)" style="opacity: 1;"><line y2="6" x2="0" style="stroke: rgb(0, 0, 0);"></line><text y="9" x="0" dy=".71em" style="text-anchor: middle;">70</text></g><path class="domain" d="M10,6V0H200V6" style="fill: none; stroke: rgb(0, 0, 0);"></path>"

    return (
      <g>
        {tickElements}
      </g>
    );
  }
})


var Ticks = React.createClass({
  render: function(){
    var tickValues = this.props.tickValues;
    var scale = this.props.scale;
    // var position = scale(tick);
    // console.log("position",position)
    // var transform = "translate({}, 0)";
    // var translate = transform.replace("{}", position);

    var ticks = tickValues.map(function(tick, index){
      var transform = "translate({}, 0)";
      var position = scale(tick);
      var translate = transform.replace("{}", position);

      console.log("translate",translate)
      return (
      <g class="tick" transform={translate} style={{opacity: "1"}}>
        <line y2="6" x2="0" style={{stroke: "rgb(0, 0, 0)"}}></line>
        <text y="9" x="0" dy=".71em" style={{textAnchor: "middle"}}>{tick}</text>
      </g>
      );
    })
    return(
      <g>
        {ticks}
      </g>
    );
  }
})

module.exports = Ticks;


