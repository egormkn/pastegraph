/**
 * Created by Max on 20.09.2016.
 */
/*
 TODO
 1. [DONE] convert text from textarea to graph
 2. build springy graph
 2.1 build directional or inderectional graph
 3. make cool form with checked properties and so on
 4. localstorage
 5. make convert versions
 6. make issues form pavlenko
 7. how to store information and variables
 */

$(document).ready(function () {
    function textTo2DArray() {
        var foundItem = $("textarea#graph-source").val().trim();
        foundItem = foundItem.split("\n");
        for (var i = 0; i < foundItem.length; i++) {
            foundItem[i] = foundItem[i].split(" ");
        }
        return (foundItem);
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
        // console.log(graph.nodes[0]);
        for (var i = 0; i < matrix.length; i++)
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    graph.addEdges([i + 1, j + 1]);
                    if (isDirectional) graph.addEdges([i + 1, j + 1]);
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