var dataset = [
    
    { name: 'China', percent: 18.54 },
    { name: 'India', percent: 17.74 },
    { name: 'U.S', percent: 4.28 },
    { name: 'Indonesia', percent: 3.50 },
    { name: 'Brazil', percent: 2.76 },
    { name: 'Pakistan', percent: 2.63},
    { name: 'Nigeria', percent: 2.57},
    { name: 'Bangladesh', percent: 2.18},
    { name: 'Russia', percent: 1.89},
    { name: 'Other', percent: 43.91}
];
 
var pie=d3.layout.pie()
  .value(function(d){return d.percent})
  .sort(null)
  .padAngle(.03);
 
var w=500,h=500;
 
var outerRadius=w/2;
var innerRadius=w/3;
 
var color = d3.scale.category10();
 
var arc=d3.svg.arc()
  .outerRadius(outerRadius)
  .innerRadius(innerRadius);
 
var svg=d3.select("#chart")
  .append("svg")
  .attr({
      width:w,
      height:h,
      class:'shadow'
  })
  
  .append('g')
  .attr({
      transform:'translate('+w/2+','+h/2+')'
  });


var defs = svg.append("defs");


var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");


filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 15)
    .attr("result", "blur");


filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx",100)
    .attr("dy", 100)
    .attr("result", "offsetBlur");


var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");


var path=svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr({
      d:arc,
      fill:function(d,i){
          return color(d.data.name);
      }
  });
 
path.transition()
  .duration(1000)
  .attrTween('d', function(d) {
      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
      return function(t) {
          return arc(interpolate(t));
      };
  });
 
 
var restOfTheData=function(){
    var text=svg.selectAll('text')
        .data(pie(dataset))
        .enter()
        .append("text")
        .transition()
        .duration(500)
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .text(function(d){
            return d.data.percent+"%";
        })
        .style({
            fill:'#fff',
            'font-size':'10px'
        });
 
    var legendRectSize=10;
    var legendSpacing=7;
    var legendHeight=legendRectSize+legendSpacing;
    
 
    var legend=svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr({
            class:'legend',
            transform:function(d,i){
                //Just a calculation for x & y position
                return 'translate(-35,' + ((i*legendHeight)-65) + ')';
            }
        });
    legend.append('rect')
        .attr({
            width:legendRectSize,
            height:legendRectSize,
            rx:20,
            ry:20
        })
        .style({
            fill:color,
            stroke:color        
        });
 
    legend.append('text')
        .attr({
            x:30,
            y:15
        })
        .text(function(d){
            return d;
        }).style({
            fill:'#929DAF',
            'font-size':'14px'
        });
};
 
setTimeout(restOfTheData,2000);
