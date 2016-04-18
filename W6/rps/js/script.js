var ROCK     = 1;
var PAPER    = 2;
var SCISSORS = 3;

function finishP1Turn(useAI, p1Move, p2Move, scores) {
    $('#p1').fadeOut('slow', function () {
        if (useAI) {
            playPrint(p1Move, p2Move, scores);
        }
        else {
            $('#p2').fadeIn('slow');
        }
    });
}

function finishP2Turn(p1Move, p2Move, scores) {
    $('#p2').fadeOut('slow', function () {
        playPrint(p1Move, p2Move, scores);
    });
}

function doRPS(p1Move, p2Move)
{
    switch (p1Move) {
    case ROCK:
        switch (p2Move) {
        case ROCK:
            return 0;
        case PAPER:
            return -1;
        case SCISSORS:
            return 1;
        }
        break;
    case PAPER:
        switch (p2Move) {
        case ROCK:
            return 1;
        case PAPER:
            return 0;
        case SCISSORS:
            return -1;
        }
        break;
    case SCISSORS:
        switch (p2Move) {
        case ROCK:
            return -1;
        case PAPER:
            return 1;
        case SCISSORS:
            return 0;
        }
        break;
    }
}

function playPrint(p1Move, p2Move, scores)
{
    switch (doRPS(p1Move, p2Move)) {
    case 1:
        $('#result').text('Player 1 wins!');
        scores.p1++;
        break;
    case -1:
        $('#result').text('Player 2 wins!');
        scores.p2++;
        break;
    case 0:
        $('#result').text('You drew!');
        break;
    }
    $('#scoreTable').append(
            '<tr><td>Player 1 :</td><td>'+scores.p1+'</td></tr>'+
            '<tr><td>Player 2 :</td><td>'+scores.p2+'</td></tr>');

    $('#result, #scoreTable').fadeIn('slow');

    queryReplay();
}

function queryReplay () {
    setTimeout(function () {
        $('#playAgain').fadeIn('slow', function() {});
        $('#replay').click(function (e) {
            resetPage(true);
        });
    }, 2000);
}
function resetPage(keepScores) {
    $('#p1').fadeOut('slow');
    $('#p2').fadeOut('slow');
    $('#result, #scoreTable, #playAgain').fadeOut('slow', function () {
        $('#tableBody').html('');
        $('#opponent').fadeIn('slow');
    });
}

$(document).ready(function () {
    var scores = { p1: 0, p2: 0 };

    // Do opponent selection
    var useAI = true;
    $('#human').click(function (e) {
        useAI = false;
        $('#opponent').fadeOut('slow', function () {
            $('#p1').fadeIn();
        });
    });
    $('#ai').click(function (e) {
        useAI = true;
        $('#opponent').fadeOut('slow', function () {
            $('#p1').show();
        });
    });

    // AI handling
    var p2Move;
    $('#ai').click(function (e) {
        p2Move = [ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)];
    });


    // Do player 1 handling
    var p1Move;
    $('#rock1').click(function (e) {
        p1Move = ROCK;
        finishP1Turn(useAI, p1Move, p2Move, scores);
    });
    $('#paper1').click(function (e) {
        p1Move = PAPER;
        finishP1Turn(useAI, p1Move, p2Move, scores);
    });
    $('#scissors1').click(function (e) {
        p1Move = SCISSORS;
        finishP1Turn(useAI, p1Move, p2Move, scores);
    });

    // Do player 2 handling
    $('#rock2').click(function (e) {
        p2Move = ROCK;
        finishP2Turn(p1Move, p2Move, scores);
    });

    $('#paper2').click(function (e) {
        p2Move = PAPER;
        finishP2Turn(p1Move, p2Move, scores);
    });

    $('#scissors2').click(function (e) {
        p2Move = SCISSORS;
        finishP2Turn(p1Move, p2Move, scores);
    });
});
