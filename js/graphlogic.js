/**
 * Created by Max on 20.09.2016.
 */
/*
 TODO
 1.  [DONE]  convert text from textarea to graph
 2.  [DONE]  build springy graph
 2.1 [DONE] build directional or inderectional graph
 3. make cool form with checked properties and so on
 3.1 [fixed] bug!!!! the edges are doubled
 3.1 three ways of graph
 4. localstorage
 5. make good form with submit
 5. make convert versions
 6. make issues form pavlenko
 1. detach Node in good manner(when no edges connect with it)
 7. how to store information and variables

 Final verison on the end of the week: nice design, fix any bugs, 3 ways, localstorqage
 mocha tests
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

        var isDirectional = $('#directional').is(':checked');
        var matrix = textTo2DArray();

        var vertices = matrix.length;
        var numeration = 1;
        //TODO rewrite in js way
        for (var i = numeration; i <= vertices; i++)
            graph.addNodes(i);

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    var array = graph.edges;

                     if (!findEdge(array, i + 1, j + 1)) graph.addEdges([i + 1, j + 1]);


                    if (isDirectional) {

                        if (!findEdge(array, j + 1, i + 1)) graph.addEdges([j + 1, i + 1]);

                    }
                }
            }

        }

        return graph;
    };


    $("#refresh").click(function () {
        var buildedGraph = buildGraph();
        if (buildedGraph !== undefined) {
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    });


});