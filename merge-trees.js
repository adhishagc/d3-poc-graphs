//Creating the SVG container
var canvas = d3
  .select("body")
  .append("svg")
  .attr("width", 3000)
  .attr("height", 3000)
  .append("g")
  .attr("transform", "translate(50,50)");
