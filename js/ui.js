$(document).ready(function () {


    //if($("input[type='radio'][value='matrix']").is(":checked"))
   //     graph = getAdjacencyMatrix(graphSource);

    function clean_errors(){
        $('#errors').hide();
        $('#errors').text('');
    }



    // draw graph immediately when page is opened
    $("#refresh").click();
});