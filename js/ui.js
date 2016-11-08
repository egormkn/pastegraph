$(document).ready(function () {
    $("#refresh").click();

    if($("input[type='radio'][value='matrix']").is(":checked"))
        graph = getAdjacencyMatrix(graphSource);
});