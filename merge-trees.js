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

  printTree(nodes_for_tree_one, links_for_tree_one, 0, 0,[[0,1,3],[nodes_for_tree_two[0].y,nodes_for_tree_two[0].x]]); //[[source node],[target cord]]
  printTree(nodes_for_tree_two, links_for_tree_two, 500, 0,null);
  //printTree(nodes_for_tree_one,links_for_tree_one,600);
});

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
  
    printTree(nodes_for_tree_one, links_for_tree_one, 0, 500,[[0,1,3],[nodes_for_tree_two[0].y,nodes_for_tree_two[0].x]]); //[[source node],[target cord]]
    printTree(nodes_for_tree_two, links_for_tree_two, 500, 500,null);
    //printTree(nodes_for_tree_one,links_for_tree_one,600);
  });

var id = 0;

function printTree(nodes, links, deltaX, deltaY,merges) {
  // prints a tree
  if(merges != null){
    
    for (var i = 0; i < merges[0].length; i++) {
        console.log("test : " + merges[0].length);
        canvas
          .append("path")
          .attr("fill", "none")
          .attr("stroke", "#ADADAD")
          .attr(
            "d",
            d3.svg
              .diagonal()
              .source({ x: nodes[0].children[merges[0][i]].y, y: nodes[0].children[merges[0][i]].x })
              .target({ x: merges[1][0]+500, y: merges[1][1] })
          );
      }
  }
  var node = canvas
    .selectAll(".node" + id)
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + (deltaX + d.y) + "," + (deltaY + d.x) + ")";
    });
  node
    .append("circle")
    .attr("r", 5)
    .attr("fill", "steelblue");

  var diagonal = d3.svg.diagonal().projection(function(d) {
    return [deltaX + d.y, deltaY + d.x];
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
