// Creating the SVG container
var canvas = d3
  .select("body")
  .append("svg")
  .attr("width", 3000)
  .attr("height", 3000)
  .append("g")
  .attr("transform", "translate(50,50)");

// Create tree - 1 layout
var tree_one = d3.layout.tree().size([400, 400]);

// Create tree - 2 layout
var tree_two = d3.layout.tree().size([400, 400]);

// Load JSON
d3.json("mydata.json", function(data) {
  // Generate nodes for tree - 1
  var nodes_for_tree_one = tree_one.nodes(data);
  console.log(nodes_for_tree_one);

  // Generate links for tree - 1
  var links_for_tree_one = tree_one.links(nodes_for_tree_one);
  console.log(links_for_tree_one);

  // Generate nodes for tree - 2
  var nodes_for_tree_two = tree_two.nodes(data);
  console.log(nodes_for_tree_two);

  // Generate links for tree - 2
  var links_for_tree_two = tree_two.links(nodes_for_tree_two);
  console.log(links_for_tree_two);

  printTree(nodes_for_tree_one, links_for_tree_one, 0, 0);
  printTree(nodes_for_tree_two, links_for_tree_two, 500, 0);
  //printTree(nodes_for_tree_one,links_for_tree_one,600);
});

var id = 0;

function printTree(nodes, links, deltaX, deltaY) {
  // prints a tree
  var node = canvas
    .selectAll(".node" + id)
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + (delta + d.y) + "," + (deltaY + d.x) + ")";
    });
  node
    .append("circle")
    .attr("r", 5)
    .attr("fill", "steelblue");

  var diagonal = d3.svg.diagonal().projection(function(d) {
    return [delta + d.y, deltaY + d.x];
  });

  canvas
    .selectAll(".link" + id)
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#ADADAD")
    .attr("d", diagonal);

  id = id + 1;
}
