// Numeric encoding of a return key press
var RETURN = 13;

// The websocket reference, which must be passed around
var webSocket;

var clientState = { username: null, peers: [] };

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
}

function onClose (e)
{
    statusMessage('green', 'Disconnected');
}

function onMessage (e)
{
    var msg = JSON.parse(e.data);

    switch (msg.type) {
        case 'message':
            printMessage(msg.identity + ': ' + msg.message);
            break;
        case 'newid':
            if (clientState.username === msg.identity) {
                statusMessage('green', 'Connected'); 
            }
            else if (msg.former === '') {
                statusMessage('gray', 'New Connection: ' + msg.identity);
            }
            break;
        case 'peerlist':
            $('#peers').html('');
            msg.peers.forEach(function (peer, i, arr) {
                $('#peers').append(peer + '<br/>');
            });
            break;
    }
}

function onError (e)
{
    statusMessage('red', 'ERROR: ' + e.data);
}

function chatSend (msgObject)
{
    var chatSendTry = function(msgObject, tryNum) {
        if (tryNum > 10) {
            printMessage('Web Socket not ready to send');
            return;
        }

        setTimeout(function () {
            if (webSocket.readyState == webSocket.OPEN) {
            webSocket.send(JSON.stringify(msgObject));
            }
            else {
                chatSendTry(msgObject, tryNum+1);
            }
        }, 50);
    };

    chatSendTry(msgObject, 0);
}

function sendMsg (username, text)
{
    var msg = { type: 'message', identity: username, message: text };
    chatSend(msg);
}

function sendConnect (username)
{
    var msg = { type: 'changeid', newid: username, oldid: '' };
    chatSend(msg);
}

function printMessage (text)
{
    $('#output').append(text + '<br/>');
    setTimeout(function () {
        $('#output').scrollTop = $('#output').scrollHeight;
    }, 1);
}

function statusMessage (colour, msg)
{
    var text = '<span style="color: '+colour+';">'+msg+'</span>';
    $('#connectionMessage h2').html(text);
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
    $('#username').keydown(function (e) {
        clientState.username = $('#username').val();
        if (e.keyCode == RETURN && clientState.username !== '') {
            connect();
            $('#chatInit').hide();
            $('#chatOut').show();
            $('#peerBox').show();
            sendConnect(clientState.username);
        }
    });

    $('#chatEntry').keydown(function (e) {
        if (e.keyCode == RETURN) {
            var content = $('#chatEntry').val();
            if (content !== '') {
                sendMsg(clientState.username, content);
                $('#chatEntry').val('');
            }
            // Stop <RETURN> from making a new line
            return false;
        }
    });
});
