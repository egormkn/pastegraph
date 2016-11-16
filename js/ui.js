$(document).ready(function () {
    function clean_errors() {
        $('#errors').hide();
        $('#errors').text('');
    }

    $("input[type='radio']").change(function () {
        clean_errors();
        var old_graph = buildedGraph;
        if ($("input[type='radio'][value='edgeList']").is(":checked")) {
            $("textarea#graph-source").val(graphToEdgeList(old_graph));
        }
        else if ($("input[type='radio'][value='adjacencyList']").is(":checked")) {
            $("textarea#graph-source").val(graphToAdjacencyList(old_graph));
        }
        else if ($("input[type='radio'][value='matrix']").is(":checked")) {
            $("textarea#graph-source").val(graphToMatrix(old_graph));
        }
    });

    $("input[type='checkbox']").change(function () {
        $("#links").text(update_link());
        $("#refresh").click();
    });

    $("#refresh").click(function () {
        clean_errors();
        buildedGraph = buildGraph();
        $("#links").text(update_link());
        parse_link();
        $('#errors').show();
        if (buildedGraph !== undefined) {
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    });

    var textarea = document.getElementById('graph-source');
    var directionalInput = document.getElementById('directional');

    if (!sessionStorage.getItem('graph')) {
        populateStorage();
    } else {
        setText();
    }

    function populateStorage() {

        sessionStorage.setItem('graph', $('#graph-source').val().trim());
        sessionStorage.setItem('directed', $('#directional').is(':checked'));
        var method;
        $("input[type='radio']").each(function () {
            if ($(this).is(':checked')) {
                method = this.value;
            }
        });
        sessionStorage.setItem('method', method);
    }

    function setText() {

        var graphText = sessionStorage.getItem('graph');
        var directionalValue = sessionStorage.getItem('directed');
        var method = sessionStorage.getItem('method');


        if (directionalValue == "true")
            $('#directional').prop('checked', true);
        else
            $('#directional').prop('checked', false);


        $('#directional').prop('checked', directionalValue);
        $("input[type='radio']").each(function () {
            if (this.value == method) {
                $(this).prop("checked", true);
            }
        });
        document.getElementById('graph-source').value = graphText;
        $('refresh').click();
    }


    directionalInput.onchange = populateStorage;
    textarea.onchange = populateStorage;

    $("input[type='radio']").change(function () {
        populateStorage();
    });


    // draw graph immediately when page is opened
    $("#refresh").click();

    function parse_link() {
        var currentLink = window.location.href;
        var qmark = currentLink.indexOf("?");
        if (qmark < 0)
            return "";
        currentLink = currentLink.slice(qmark);
        var args = decodeURI(currentLink);
        var arrayArgs = args.split("=");
        if (arrayArgs.length < 3)
            return "";
        var method = arrayArgs[2];
        var directed = false;

        if (arrayArgs[1].substr(0, 8) === "digraph{") {
            directed = true;
            arrayArgs[1] = arrayArgs[1].slice(8);
        } else if(arrayArgs[1].substr(0, 6) === "graph{"){
            directed = false;
            arrayArgs[1] = arrayArgs[1].slice(6);
        } else{
            return "";
        }
        arrayArgs[1] = arrayArgs[1].substr(0, arrayArgs[1].length - 8);
        var edges = arrayArgs[1].split(",");
        for(var i = 0; i < edges.length; i++)
            edges[i] = edges[i].replace("-", ' ');

        if (directed == "true")
            $('#directional').prop('checked', true);
        else
            $('#directional').prop('checked', false);

        var stringEdges = edges.join('\n');
        console.log(stringEdges);
        $("textarea#graph-source").val(stringEdges);
        var graph = getEdgeList(textTo2DArray(stringEdges));

        if (method == "edgeList"){
            $("input[type='radio'][value='edgeList']").prop("checked", true);
        } else if(method == "adjacencyList"){
            $("input[type='radio'][value='edgeList']").prop("checked", true);
        } else if(method == "matrix"){
            $("input[type='radio'][value='edgeList']").prop("checked", true);
        }


    }

    function update_link() {
        if (buildedGraph.edges.length == 0)
            return "";
        var result = [];
        var method;
        $("input[type='radio']").each(function () {
            if ($(this).is(':checked')) {
                method = this.value;
            }
        });
        for (var edgeIndex = 0; edgeIndex < buildedGraph.edges.length; edgeIndex++) {
            var edge = buildedGraph.edges[edgeIndex];
            result.push(edge.source.id + "-" + edge.target.id);
        }
        result.join(',');
        var finalLink = (isDirectional ? "digraph" : "graph") + "{" + result.join(",") + "}" + "&method=" + method;
        history.pushState({query: finalLink}, "graphpage", "?q=" + finalLink)
    }
});