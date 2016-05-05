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
    statusMessage('<span style="color: green;">Connected</span>');
}

function onClose (e)
{
    statusMessage('<span style="color: green;">Disconnected</span>');
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
    statusMessage('<span style="color: red;">ERROR: ' + e.data + '</span>');
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
    setTimeout(function () {
        $('#output').scrollTop = $('#output').scrollHeight;
    }, 1);
}

function statusMessage (msg)
{
    $('#connectionMessage h2').html(msg);
    $('#connectionMessage h2').show().fadeOut(5000);
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
        username = $('#username').val();
        if (e.keyCode == RETURN && username !== '') {
            connect();
            $('#chatInit').hide();
            $('#chatOut').show();
        }
    });

    $('#chatEntry').keydown(function (e) {
        if (e.keyCode == RETURN) {
            var content = $('#chatEntry').val();
            if (content !== '') {
                sendMsg(username, content);
                $('#chatEntry').val('');
            }
            // Stop <RETURN> from making a new line
            return false;
        }
    });
});
