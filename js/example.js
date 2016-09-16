var graph = new Springy.Graph();


var node1 = graph.newNode({label: '1'});
var node2 = graph.newNode({label: '2'});
var node3 = graph.newNode({label: '3'});
var node4 = graph.newNode({label: '4'});

graph.newEdge(node1, node2, {color: '#00A0B0'});
graph.newEdge(node1, node4, {color: '#6A4A3C'});
graph.newEdge(node2, node1, {color: '#CC333F'});
graph.newEdge(node2, node3, {color: '#EB6841'});
graph.newEdge(node2, node4, {color: '#EDC951'});
graph.newEdge(node3, node2, {color: '#7DBE3C'});


jQuery(function(){
var springy = window.springy = jQuery('#springydemo').springy({
  graph: graph,
  nodeSelected: function(node){
    console.log('Node selected: ' + JSON.stringify(node.data));
  }
});
});
