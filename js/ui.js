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

    function update_link() {
        if (buildedGraph.edges.length == 0)
            return "";
        var result = [];
        var domainName = "https://misteraverin.github.io/pastegraph/?q=";
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

        return domainName + (isDirectional ? "digraph" : "graph") + "{" + result.join(",") + "}" + "&method=" + method;
    }
});