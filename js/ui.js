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
        clean_errors();
        buildedGraph = buildGraph();
        $('#errors').show();
        if (buildedGraph !== undefined) {
            drawingGraph = $("#springydemo").springy({graph: buildedGraph});
        }
    });

    var textarea = document.getElementById('graph-source');
    var directionalInput = document.getElementById('directional');
    var ignoringFirstLine = document.getElementById('ignore-first-line');
    if(!sessionStorage.getItem('graph')){
        populateStorage();
    } else{
        setText();
    }

    function populateStorage() {

        sessionStorage.setItem('graph', $('#graph-source').val().trim());
        sessionStorage.setItem('directed', $('#directional').is(':checked'));
        sessionStorage.setItem('ignore-first-line', $('#ignore-first-line').is(':checked'));
        var method;
        $("input[type='radio']").each(function () {
            if ($(this).is(':checked')) {
                method =  this.value;
            }
        });
        sessionStorage.setItem('method', method);
    }
    function setText(){
        console.log("SETTING TEXT");
        var graphText = sessionStorage.getItem('graph');
        var directionalValue = sessionStorage.getItem('directed');
        var method = sessionStorage.getItem('method');
        var ignoringValue = sessionStorage.getItem('ignore-first-line');

        if(ignoringValue == "true")
            $('#ignore-first-line').prop('checked', true);
        else
            $('#ignore-first-line').prop('checked', false);

        if(directionalValue == "true")
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


    directionalInput.onchange  = populateStorage;
    textarea.onchange = populateStorage;
    ignoringFirstLine.onchange = populateStorage;

    $("input[type='radio']").change(function(){
        populateStorage();
    });


    // draw graph immediately when page is opened
    $("#refresh").click();
});