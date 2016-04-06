$(document).ready(function () {
    $('#submit').click(function () {
        var a = parseInt($('#a').val());
        var b = parseInt($('#b').val());

        if (a > b) {
            $('#error').text('');
            $('#comparison').text('>');
        }
        else if (a === b) {
            $('#error').text('');
            $('#comparison').text('=');
        }
        else if (a < b) {
            $('#error').text('');
            $('#comparison').text('<');
        }
        else {
            $('#error').text('You must enter numbers to compare');
        }
    });
});
