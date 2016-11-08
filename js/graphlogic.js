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
        for (var i = 0; i < edges.length; i++) {
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
        var graphSource= textTo2DArray();

        if($("input[type='radio'][value='matrix']").is(":checked"))
         graph = getAdjacencyMatrix(graphSource);
        else if($("input[type='radio'][value='edgeList']").is(":checked"))
         graph = getEdgeList(graphSource);
        else if($("input[type='radio'][value='AdjacencyList']").is(":checked"))
         graph = getAdjacencyList(graphSource);
        return graph;
    };


    function getAdjacencyMatrix(matrix){
        var isDirectional = $('#directional').is(':checked');
        var vertices = matrix.length;
        var numeration = 1;
        var graph = new Springy.Graph();

        for (var i = numeration; i <= vertices; i++)
            graph.addNodes(i);

        var used = new Array(vertices);
        used.fill(0);
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    var array = graph.edges;

                    if (!isDirectional && !findEdge(array, i + 1, j + 1) && !findEdge(array, j + 1, i + 1)) {
                        graph.addEdges([i + 1, j + 1, {directional: false}]);
                        matrix[j][i] = 1;
                    }

                    if (isDirectional) {
                        if (!findEdge(array, i + 1, j + 1)) {
                            graph.addEdges([i + 1, j + 1, {directional: true}]);
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
        for (var i = 0; i < used.length; i++)
            if (used[i] == 0) graph.removeNode(graph.nodes[i]);
        return graph;
    }

    function getEdgeList(graph) {
        var newGraph = new Springy.Graph();

        for (var i = 0; i < graph.length; i++)
            if (graph[i].length > 2) {
                $("#errors").text("Wrong input, check out edges!");
                $("#errors").css("color", "red");
                break;
            } else {
                newGraph.addNodes(graph[i][0], graph[i][1]);
                newGraph.addEdges([graph[i][0], graph[i][1], {directional: false}]);
            }
        return newGraph;
    }


    function getAdjacencyList(graph) {
        var newGraph = new Springy.Graph();
        for (var i = 0; i < graph.length; i++)
            if (graph[i][0] > graph[i].length - 1 || graph[i][0] < graph[i].length - 1) {
                $("#errors").text("Wrong input, check out number of edges!");
                $("#errors").css("color", "red");
                break;
            } else {
                newGraph.addNodes(i + 1);
                for(var j = 1; j < graph[i].length; j++) {

                    newGraph.addNodes(graph[i][j]);
                    newGraph.addEdges([i + 1, graph[i][j], {directional: false}]);
                }
            }
        return newGraph;
    }

    graphToEdgeList = function (graph) {
        var edgeList = [];
        for (var edgeIndex = 0; edgeIndex < graph.edges.length; edgeIndex++) {
            var edge = graph.edges[edgeIndex];
            edgeList.push(edge.source.id + " " + edge.target.id);
        }
        return edgeList;
    };


    graphToAdjacencyList = function (graph) {
        var adjanceyList = new Array(graph.nodes.length);


        for (var edgeIndex = 0; edgeIndex < graph.edges.length; edgeIndex++) {
            var edge = graph.edges[edgeIndex];
            if (adjanceyList[edge.source.id] == undefined)
                adjanceyList[edge.source.id] = new Array();
            adjanceyList[edge.source.id].push(edge.target.id);
        }
        var finalAdjanceyList = new Array();
        for (var i = 0; i < adjanceyList.length; i++) {
            var answerString = '';
            if (adjanceyList[i] != undefined) {
                answerString += adjanceyList[i].length + ' ';
                answerString += adjanceyList[i].join(' ');
            } else {
                answerString += '0';
            }
            finalAdjanceyList.push(answerString);
        }
        return finalAdjanceyList.join('\n');
    };

    $("#refresh").click(function () {
        var buildedGraph = buildGraph();
        if (buildedGraph !== undefined) {
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    });

    var today = new Date();
    var year = today.getFullYear();
    document.getElementById("year").innerHTML = year;
});