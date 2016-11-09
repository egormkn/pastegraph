$(document).ready(function () {

    function clean_errors(){
        $('#errors').hide();
        $('#errors').text('');
    }

    $("input[type='radio']").change(function() {
        clean_errors();
        var old_graph = buildedGraph;
        if($("input[type='radio'][value='edgeList']").is(":checked")){
            $("textarea#graph-source").val(graphToEdgeList(old_graph));
            $("#refresh").click();
        }
        else if($("input[type='radio'][value='adjacencyList']").is(":checked")){
            $("textarea#graph-source").val(graphToAdjacencyList(old_graph));
            $("#refresh").click();
        }
        else if($("input[type='radio'][value='matrix']").is(":checked")){
            $("textarea#graph-source").val(graphToMatrix(old_graph));
            $("#refresh").click();
        }
    });

    $("#refresh").click(function () {
        buildedGraph = buildGraph();
        $('#errors').show();
        if (buildedGraph !== undefined) {
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    });



    // draw graph immediately when page is opened
    $("#refresh").click();
});