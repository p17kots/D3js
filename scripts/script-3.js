
var Accio_gitrepo="Github Repo: https://github.com/colorfest/d3js";
var data = [{
  "name": "Asia",
  "population": 4545,
  
}, {
  "name": "Africa",
  "population": 1287,
}, {
  "name": "Europe",
  "population": 742,
}, {
  "name": "Latin America",
  "population": 652,
}, {
  "name": "Northern America",
  "population": 363,
}, {
  "name": "Oceania",
  "population": 41,
}];

var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 60
  },
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,
  x = d3.scaleBand().rangeRound([15, width]).paddingInner(0.5),
  y = d3.scaleLinear().range([height, 0]);

//draw axis
var xAxis = d3.axisBottom().scale(x).ticks(6);

var yAxis = d3.axisLeft().scale(y).ticks(10).tickSizeInner(-width).tickSizeOuter(0).tickPadding(10);

var svg = d3.select("#barGraph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function(d) {
  return d.name;
}));

y.domain([0, d3.max(data, function(d) {
  return d.population;
})]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-0.5em")
  .attr("dy", "-.55em")
  .attr("y", 30)
  .attr("transform", "rotate(-45)");

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 5)
  .attr("dy", "0.8em")
  .attr("text-anchor", "end")
  

svg.selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
  .style("fill", "red")
  .attr("x", function(d) {
    return x(d.name);
  })
  .attr("width", x.bandwidth())
  .attr("y", function(d) {
    return y(d.population);
  })
  .attr("height", function(d) {
    return height - y(d.population);
  })
  .on("mouseover", function() {
    tooltip.style("display", null);
  })
  .on("mouseout", function() {
    tooltip.style("display", "none");
  })

.on("mousemove", function(d) {

  tooltip.transition().duration(200)
    .style("opacity", 0.9);
  tooltip.select("div").html("Name: <strong>" + d.name + "</strong><br/>Population: <strong>" + d.population + "</strong>")
    .style("position", "fixed")
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px");

});

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0.5);

tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "red")
  .style("opacity", 0.5);

tooltip.append("div")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "1.5em")
  .attr("font-weight", "bold");
  
