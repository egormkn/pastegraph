$(document).ready(function () {
    function drawGraph(){
        clean_errors();
        buildedGraph = buildGraph();
        $('.error').show();
        update_link();
        if (buildedGraph !== undefined) {
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    };

    $("#refresh").click(function () {
        drawGraph();
    });

    $('#graph-source').keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            drawGraph();
        }
    });
    /*
     algorithm: at first we try to parse link and then try to build
     graph from textarea
     */
    parse_link();
    $("#refresh").click();

    function clean_errors() {
        $('.error').hide();
        $('.error').text('');
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
        update_link();
    });

    $("input[type='checkbox']").change(function () {
        update_link();
        $("#refresh").click();
    });

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
        } else if (arrayArgs[1].substr(0, 6) === "graph{") {
            directed = false;
            arrayArgs[1] = arrayArgs[1].slice(6);
        } else {
            return "";
        }
        arrayArgs[1] = arrayArgs[1].substr(0, arrayArgs[1].length - 8);
        var edges = arrayArgs[1].split(",");
        for (var i = 0; i < edges.length; i++)
            edges[i] = edges[i].replace("-", '');

        if (directed == true) {
            $('#directional').prop('checked', true);
        }
        else
            $('#directional').prop('checked', false);
        isDirectional = $('#directional').is(':checked');

        var graph = getEdgeList(edges);
        if (method == "edgeList") {
            $("textarea#graph-source").val(graphToEdgeList(graph));
            $("input[type='radio'][value='edgeList']").prop("checked", true);
        } else if (method == "adjacencyList") {
            $("textarea#graph-source").val(graphToAdjacencyList(graph));
            $("input[type='radio'][value='adjacencyList']").prop("checked", true);
        } else if (method == "matrix") {
            $("textarea#graph-source").val(graphToMatrix(graph));
            $("input[type='radio'][value='matrix']").prop("checked", true);
        }
        return 1;

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
        isDirectional = $("#directional").is(":checked");
        var finalLink = (isDirectional ? "digraph" : "graph") + "{" + result.join(",") + "}" + "&method=" + method;
        history.pushState({query: finalLink}, "graphpage", "?q=" + finalLink)
    }

    $('#get_link').click(function () {
        var xhr = new XMLHttpRequest();
        var requestURL = "https://api-ssl.bitly.com/v3/shorten?access_token=e39789de6e564128360fef76d31b84f82b0865f9&longUrl=";
        var currentURL = encodeURIComponent(window.location.href) + "&format=txt";
        console.log(requestURL + currentURL);
        xhr.open("GET", requestURL + currentURL, true);
        xhr.send();
        xhr.onreadystatechange = processRequest;
        function processRequest(e) {
            var link;
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
                link = response;
            }
            $("#short-link").text(link);
            $("#short-link").attr("href", link);
        }
    });
});
