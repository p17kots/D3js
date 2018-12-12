

var lineChart = d3.select("#lineChart");
var WIDTH = 700;
var HEIGHT = 400;
var MARGINS = {top: 30,right:50, bottom:30, left:50};

var xScale = d3.scale.linear().range([MARGINS.left, WIDTH-MARGINS.right]).domain([1950,2020]);
var yScale = d3.scale.linear().range([HEIGHT-MARGINS.top, MARGINS.bottom]).domain([0,8000]);

var xAxes = d3.svg.axis().scale(xScale);
var yAxes = d3.svg.axis().scale(yScale).orient("left");

lineChart.append("g")
	.attr("transform", "translate(0," + (HEIGHT-MARGINS.bottom) + ")")
	.attr("class","x")
	.call(xAxes);

lineChart.append("g")
	.attr("transform", "translate(" + (MARGINS.left) + ",0)")
	.attr("class","y")
	.call(yAxes);

var line = d3.svg.line()
	.x(function(d){return xScale(d.date);})
	.y(function(d){return yScale(d.value);});

lineChart.append("path")
	.attr("d", line(data))
	.attr("stroke", "red")
	.attr("stroke-width", 2)
	.attr("fill", "none");

var points = lineChart.selectAll("dot")
	.data(data)
    .enter().append("circle")
	.attr("class","pionts")
    .attr("r", 5)
    .attr("cx", function(d) { return xScale(d.date); })
    .attr("cy", function(d) { return yScale(d.value); });

lineChart.on("mouseover", function(){points.style("display",null);});
lineChart.on("mouseout", function(){points.style("display","none");});

var pointsLineX = lineChart.append("line")
	.attr("stroke-width", 1)
	.attr("stroke", "black")
	.style("stroke-dasharray", ("3, 3"))
	.style("display", "none");

var pointsLineY = lineChart.append("line")
	.attr("stroke-width", 1)
	.attr("stroke", "black")
	.style("stroke-dasharray", ("3, 3"))
	.style("display", "none");

var textLineX = lineChart.append("text")
	.style("display", "none");

var textLineY = lineChart.append("text")
	.style("display", "none");

points.on("mouseover",function(d){
	
  pointsLineX.data(data)
	.attr("x1",xScale(d.date))
	.attr("x2",xScale(d.date))
	.attr("y1",yScale(d.value)-10)
	.attr("y2",HEIGHT-MARGINS.bottom)
	.style("display", null);
  
  pointsLineY.data(data)
	.attr("x1",0+MARGINS.left)
	.attr("x2",xScale(d.date)+10)
	.attr("y1",yScale(d.value))
	.attr("y2",yScale(d.value))
	.style("display", null);
  
   textLineX
	.attr("x",xScale(d.date)+10)
	.attr("y",(HEIGHT-MARGINS.top)-((HEIGHT-MARGINS.top-yScale(d.value))/2))
	.text(d.date)
	.style("display",null);
  
   textLineY
	.attr("x",(xScale(d.date)+MARGINS.left)/2)
	.attr("y",yScale(d.value)-10)
	.text(d.value)
	.style("display",null);
  
});

points.on("mouseout",function(){
  pointsLineX.style("display","none");
  pointsLineY.style("display","none");
  textLineY.style("display","none");
  textLineX.style("display","none");
});

var data = [{
    "value": "2536",
    "date": "1950"
}, {
    "value": "2772",
    "date": "1955"
}, {
    "value": "3033",
    "date": "1960"
}, {
    "value": "3339",
    "date": "1965"
}, {
    "value": "3700",
    "date": "1970"
}, {
    "value": "4079",
    "date": "1975"
}, {
    "value": "4458",
    "date": "1980"
}, {
    "value": "4873",
    "date": "1985"
}, {
    "value": "5330",
    "date": "1990"
}, {
    "value": "5751",
    "date": "1995"
}, {
    "value": "6145",
    "date": "2000"
}, {
    "value": "6542",
    "date": "2005"
}, {
    "value": "6958",
    "date": "2010"
}, {
    "value": "7383",
    "date": "2015"
}, {
    "value": "7669",
    "date": "2018"
}];
