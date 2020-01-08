
            var canvas = d3.select("body").append("svg")
                .attr("width",500)
                .attr("height",500)
                .append("g")
                .attr("transform","translate(50,50)");

            var diagonal = d3.svg.diagonal()
                .projection(function (d){return [d.y,d.x]});

            

            var tree = d3.layout.tree()
                .size([400,400]);
            
            d3.json("mydata.json",function(data){
                var nodes = tree.nodes(data);
                console.log(nodes);
                var links = tree.links(nodes);
                console.log(links);
                
                var node = canvas.selectAll(".node")
                    .data(nodes)
                    .enter()
                    .append("g")
                        .attr("class","node")
                        .attr("transform", function (d){return "translate(" + d.y + "," + d.x +")";})
                node.append("circle")
                    .attr("r",5)
                    .attr("fill","steelblue");
                
                node.append("text")
                    .text(function (d){return d.name;})

                canvas.selectAll(".link")
                    .data(links)
                    .enter()
                    .append("path")
                    .attr("class","link")
                    .attr("fill","none")
                    .attr("stroke","#ADADAD")
                    .attr("d",diagonal);
            })

