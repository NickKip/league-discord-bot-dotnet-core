// Write your Javascript code.

var socket;
var scheme = document.location.protocol == "https:" ? "wss" : "ws";
var port = document.location.port ? (":" + document.location.port) : "";
var connectionUrl = scheme + "://" + document.location.hostname + port + "/ws";

setTimeout(() => {

    socket = new WebSocket(connectionUrl);

    socket.onopen = function (event) {
        console.log("Websocket connection established: ", event);
    };

    socket.onclose = function (event) {
        console.log("Websocket connection closed: ", event);
    };

    socket.onmessage = function (event) {
        console.log("Websocket message received: ", event);
    }
}, 2000);