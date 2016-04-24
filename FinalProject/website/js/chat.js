// Numeric encoding of a return key press
var RETURN = 13;

// The websocket reference, which must be passed around
var webSocket;

function connect (username)
{
    var wsHost = 'ws://' + window.location.host + '/websocket';
    webSocket  = new WebSocket(wsHost);

    webSocket.onopen    = function (e) { onOpen(e); };
    webSocket.onclose   = function (e) { onClose(e); };
    webSocket.onmessage = function (e) { onMessage(e); };
    webSocket.onerror   = function (e) { onError(e); };
}

function onOpen (e)
{
    printMessage('<span style="color: green";>CONNECTED</span>');
}

function onClose (e)
{
    printMessage('<span style="color: green;">DISCONNECTED</span>');
}

function onMessage (e)
{
    var msg = JSON.parse(e.data);

    switch (msg.type) {
        case 'message':
            printMessage(msg.identity + ': ' + msg.message);
            break;
    }
}

function onError (e)
{
    printMessage('<span style="color: red;">ERROR: ' + e.data + '</span>');
}

function sendMsg (username, text)
{
    if (webSocket.readyState == webSocket.OPEN) {
        var msg = { 'type': 'message', 'identity': username, 'message': text };
        webSocket.send(JSON.stringify(msg));
    }
    else {
        printMessage('Web Socket not connected');
    }
    
}

function printMessage (text)
{
    $('#output').append(text + '<br/>');
}

function utf8Encode (data)
{
    return unescape(encodeURIComponent(data));
}

function utf8Decode (data)
{
    return decodeURIComponent(escape(data));
}

$(document).ready(function () {
    var username;

    $('#username').keydown(function (e) {
        if (e.keyCode == RETURN) {
            username = $('#username').val();
            connect();
            $('#username').hide();
            $('#chatEntry').show();
        }
    });

    $('#chatEntry').keydown(function (e) {
        if (e.keyCode == RETURN) {
            sendMsg(username, $('#chatEntry').val());
            $('#chatEntry').val('');
        }
    });
});
