/**
 * Created by Max on 20.09.2016.
 */
/*
 TODO
 1. [DONE] convert text from textarea to graph
 2. build springy graph
 3. make cool form with checked properties and so on
 4. localstorage
 5. make convert versions
 6. make iisues form pavlenko
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