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

    var textBlock = $("#examples");
    var matrix = textTo2DArray();
    var drawingGraph = window.spingy;

    var buildGraph = function () {
        var graph = new Springy.Graph();

        var node1 = graph.newNode({label: '1'});
        var node2 = graph.newNode({label: '2'});
        var node3 = graph.newNode({label: '3'});
        var node4 = graph.newNode({label: '4'});

        graph.newEdge(node1, node2, {label: "GGGG"});
        graph.newEdge(node1, node4, {label: "GGGG"});
        graph.newEdge(node2, node1, {color: '#CC333F'});
        graph.newEdge(node2, node3, {color: '#EB6841'});
        graph.newEdge(node2, node4, {color: '#EDC951'});
        graph.newEdge(node3, node2, {color: '#7DBE3C'});
        return graph;
    }


    $("#refresh").click(function () {
        var buildedGraph = buildGraph();
        if(buildedGraph !== undefined){
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    });


    /* print_matrix
     for (var i = 0; i < matrix.length; i++) {
     var line = "<p>";
     for (var j = 0; j < matrix[i].length; j++) {
     line += matrix[i][j] + " ";
     }
     line += "</p>";
     textBlock.append(line);
     }
     */
})