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
    if(!localStorage.getItem('graph')){
        populateStorage();
    } else{
        setText();
    }
    function populateStorage() {
        console.log("POPEULATE STORAGE");
        localStorage.setItem('graph', $('#graph-source').val().trim());
        localStorage.setItem('directed', $('#directional').is(':checked'));
        localStorage.setItem('ignore-first-line', $('#ignore-first-line').is(':checked'));
        var method;
        $("input[type='radio']").each(function () {
            if ($(this).is(':checked')) {
                method =  this.value;
            }
        });
        localStorage.setItem('method', method);
        //setText();
    }
    function setText(){
        console.log("SETTING TEXT");
        var graphText = localStorage.getItem('graph');
        var directionalValue = localStorage.getItem('directed');
        var method = localStorage.getItem('method');
        var ignoringValue = localStorage.getItem('ignore-first-line');

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