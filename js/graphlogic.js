/**
 * Created by Max on 20.09.2016.
 */
/*
 TODO
 1.  [DONE]  convert text from textarea to graph
 2.  [DONE]  build springy graph
 2.1 [DONE] build directional or inderectional graph
 3.  make cool form with checked properties and so on
 3.1 [DONE] bug!!!! the edges are doubled
 3.2 [DONE] detach Node in good manner (when no edges connect with it)
 4. three ways of graph
 4.1 redraw graph


 5. localstorage
 5. make good form with submit
 6. make issues form pavlenko
 7. how to store information and variables
 8. strange bugs and appear of old version of graph
 9. mocha tests

 Final verison on the end of the week: nice design, fix any bugs, 3 ways, localstorqage
 */

// console.log(currentElement.source.id, currentElement.target.id);

$(document).ready(function () {
    function textTo2DArray() {
        var foundItem = $("textarea#graph-source").val().trim();
        foundItem = foundItem.split("\n");
        for (var i = 0; i < foundItem.length; i++) {
            foundItem[i] = foundItem[i].split(" ");
        }
        return (foundItem);
    }

    function findEdge(edges, from, to) {
        var foundEdge = false;
        for (let i = 0; i < edges.length; i++) {
            var currentElement = edges[i];
            if (currentElement.source.id == from && currentElement.target.id == to) {
                foundEdge = true;
                break;
            }
        }
        return foundEdge;
    }


    var drawingGraph;

    var buildGraph = function () {
        var graph = new Springy.Graph();
        //Springy.Renderer.drawEdge.arrowWidth  = 0;
       // Springy.Renderer.drawEdge.arrowHeight = 0;
        if($("input[type='radio'][name='edgeList']").is(":checked"))
            drawEdgeList()
        if($("input[type='radio'][name='edgeList']").is(":checked"))
            drawEdgeList()
        if($("input[type='radio'][name='edgeList']").is(":checked"))
            drawEdgeList()

        var isDirectional = $('#directional').is(':checked');
        var matrix = textTo2DArray();

        var vertices = matrix.length;
        var numeration = 1;
        //TODO rewrite in js way
        for (var i = numeration; i <= vertices; i++)
            graph.addNodes(i);

        var used = new Array(vertices);
        used.fill(0);
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    var array = graph.edges;

                    if (!findEdge(array, i + 1, j + 1)) {
                        graph.addEdges([i + 1, j + 1]);
                    }

                    if (isDirectional) {

                        if (!findEdge(array, j + 1, i + 1)) {
                            graph.addEdges([j + 1, i + 1]);
                        }

                    }
                }
            }

        }

        for (var i = 0; i < matrix.length; i++)
            for (var j = 0; j < matrix[i].length; j++)
                if (matrix[i][j] == 1) {
                    used[i] = 1;
                    used[j] = 1;
                }
        for(var i = 0; i < used.length; i++)
            if(used[i] == 0) graph.removeNode(graph.nodes[i]);
        return graph;
    };

    function graph_to_edge_list(graph){

    };

    $("#refresh").click(function () {
        var buildedGraph = buildGraph();
        if (buildedGraph !== undefined) {
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    });


});