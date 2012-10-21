//below is modeled after http://mbostock.github.com/d3/tutorial/bar-2.html

// {"time": 1297110663, "value": 56},
// {"time": 1297110664, "value": 53},
// {"time": 1297110665, "value": 58},
// {"time": 1297110666, "value": 58},

var t = 1297110663,
    v = 70,
    data = d3.range(33).map(next);

function next() {
  return {
    time: ++t,
    value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
  };
}

var w = 20,
    hite = 80;

var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, hite]);

var chart1 = d3.select(".content").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", hite);

chart1.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return hite - y(d.value) - .5; })
    .attr("width", w)
    .attr("height", function(d) { return y(d.value); });

chart1.append("line")
    .attr("x1", 0)
    .attr("x2", w * data.length)
    .attr("y1", hite - .5)
    .attr("y2", hite - .5)
    .style("stroke", "#000");

redraw1();

function redraw1() {

  chart1.selectAll("rect")
      .data(data)
    .transition()
      .duration(1000)
      .attr("y", function(d) { return hite - y(d.value) - .5; })
      .attr("height", function(d) { return y(d.value); });

}

setInterval(function() {
  data.shift();
  data.push(next());
  redraw1();
  
  
  d3.timer.flush(); // avoid memory leak when in background tab
}, 1500);

function d3_charts(left, left_inner, right, right_inner, ave_score, y_axis, user_time) {
    var a = d3.scale.linear().domain([0, d3.max(ave_score)]).range([0, 420]);
    var b = d3.scale.linear().domain([0, d3.max(user_time)]).range([0, 420]);
    var h = d3.scale.ordinal().domain(ave_score).rangeBands([0, 120]);
    var e = d3.scale.ordinal().domain(user_time).rangeBands([0, 120]);
    var g = d3.select(left).append("svg:svg").attr("class", "chart").attr("width", 440).attr("height", 140).append("svg:g").attr("transform", "translate(10,15)");
    var f = d3.select(left_inner).append("svg:svg").attr("class", "chart2").attr("width", 440).attr("height", 140).append("svg:g").attr("transform", "translate(10,15)");
    var d = d3.select(right).append("svg:svg").attr("class", "chart2").attr("width", 440).attr("height", 140).append("svg:g").attr("transform", "translate(10,15)");
    var c = d3.select(right_inner).append("svg:svg").attr("class", "chart2").attr("width", 440).attr("height", 140).append("svg:g").attr("transform", "translate(10,15)");
    g.selectAll("line").data(a.ticks(10)).enter().append("svg:line").attr("x1", a).attr("x2", a).attr("y1", 0).attr("y2", 120).attr("stroke", "#ccc");
    g.selectAll("text.rule").data(a.ticks(10)).enter().append("svg:text").attr("x", a).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle").text(String);
    g.selectAll("rect").data(ave_score).enter().append("svg:rect").attr("y", h).attr("width", a).attr("height", h.rangeBand());
    d.selectAll("line").data(b.ticks(10)).enter().append("svg:line").attr("x1", b).attr("x2", b).attr("y1", 0).attr("y2", 120).attr("stroke", "#ccc");
    d.selectAll("text.rule").data(b.ticks(10)).enter().append("svg:text").attr("x", b).attr("y", 0).attr("dy", -3).attr("text-anchor", "middle").text(String);
    d.selectAll("rect").data(user_time).enter().append("svg:rect").attr("y", e).attr("width", b).attr("height", e.rangeBand());
    g.selectAll("text.bar").data(ave_score).enter().append("svg:text").attr("class", "bar").attr("x", a).attr("y", function (i) {
        return h(i) + h.rangeBand() / 2;
    }).attr("dx", -3).attr("dy", ".35em").attr("font-size", "2.0em").attr("text-anchor", "end").text(String);
    f.selectAll("text.bar").data(y_axis).enter().append("svg:text").attr("class", "bar").attr("x", 0).attr("y", function (i) {
        return e(i) + e.rangeBand() / 2;
    }).attr("dx", -3).attr("dy", ".35em").attr("font-size", "1.5em").attr("text-anchor", "end").text(String);
    d.selectAll("text.bar").data(user_time).enter().append("svg:text").attr("class", "bar").attr("x", b).attr("y", function (i) {
        return e(i) + e.rangeBand() / 2;
    }).attr("dx", -3).attr("dy", ".35em").attr("font-size", "2.0em").attr("text-anchor", "end").text(String);
    c.selectAll("text.bar").data(y_axis).enter().append("svg:text").attr("class", "bar").attr("x", 0).attr("y", function (i) {
        return e(i) + e.rangeBand() / 2;
    }).attr("dx", -3).attr("dy", ".35em").attr("font-size", "1.5em").attr("text-anchor", "end").text(String);
    g.append("line").attr("y1", 0).attr("y2", 120).style("stroke", "#000");
    d.append("line").attr("y1", 0).attr("y2", 120).style("stroke", "#000");
}

//ave_data = [134, 80, 145]; //top left
// user_data = []; //top right
ave_attempts = [3, 4, 5]; // mid left
attempts = [3, 6, 2]; //mid right
ave_resets = [9, 7, 9];  //bottom left 
resets = [2, 2, 9]; //bottom right
// y_time_data = [1, 2, 3];
// y_reset_data = [1];
// y_attempt_data = [1];
// reset = 0;
// attempt = 0;


d3_charts('.puzzle_show_left','.user_y_axis', '.puzzle_show_right', '.prepcloud_y_axis', ave_data, y_time_data, user_data);
d3_charts('.puzzle_show_left2','.user_y_axis2', '.puzzle_show_right2', '.prepcloud_y_axis2', ave_attempts, y_attempt_data, attempts);
d3_charts('.puzzle_show_left3','.user_y_axis3', '.puzzle_show_right3', '.prepcloud_y_axis3', ave_resets, y_reset_data, resets);