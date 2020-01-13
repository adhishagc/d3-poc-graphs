var canvas = d3
  .select("body")
  .append("svg")
  .attr("width", 3000)
  .attr("height", 3000)
  .append("g")
  .attr("transform", "translate(50,50)");

var diagonal = d3.svg.diagonal().projection(function(d) {
  return [d.y, d.x];
});

var tree = d3.layout.tree().size([400, 400]);

d3.json("mydata.json", function(data) {
  var nodes = tree.nodes(data);
  console.log(nodes);

  var links = tree.links(nodes);
  console.log(links);

  var test = nodes[0].children[0].y;
  console.log(test);

  var diagonal2 = d3.svg
    .diagonal()
    .source({ x: nodes[0].children[0].y, y: nodes[0].children[0].x })
    .target({ x: 550, y: 175 });

  var node = canvas
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.y + "," + d.x + ")";
    });
  node
    .append("circle")
    .attr("r", 5)
    .attr("fill", "steelblue");

  var node2 = canvas
    .selectAll(".node2")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node2")
    .attr("transform", function(d) {
      return "translate(" + (d.y + 600) + "," + d.x + ")";
    });
  node2
    .append("circle")
    .attr("r", 5)
    .attr("fill", "green");

  node.append("text").text(function(d) {
    return d.name;
  });

  canvas
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#ADADAD")
    .attr("d", diagonal);

  for (var i = 0; i < 4; i++) {
    canvas
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#ADADAD")
      .attr(
        "d",
        d3.svg
          .diagonal()
          .source({ x: nodes[0].y + 600, y: nodes[0].x })
          .target({
            x: nodes[0].children[i].y + 600,
            y: nodes[0].children[i].x
          })
      );
  }

  for (var i = 0; i < 4; i++) {
    canvas
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#ADADAD")
      .attr(
        "d",
        d3.svg
          .diagonal()
          .source({ x: nodes[0].children[i].y, y: nodes[0].children[i].x })
          .target({ x: nodes[0].y + 600, y: nodes[0].x })
      );
  }

  // canvas.append("circle")
  //     .attr("r",20)
  //     .attr("fill","red")
  //     .attr("transform",function (){return "translate("+550+","+175+")";});

  canvas
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "#ADADAD")
    .attr(
      "d",
      d3.svg
        .diagonal()
        .source({ x: nodes[0].children[0].y, y: nodes[0].children[0].x })
        .target({ x: nodes[0].y + 600, y: nodes[0].x })
    );
});
