var compare = function(p1, p2) {
    switch (p1) {
    case "rock":
        switch (p2) {
        case "scissors":
            return 1;
        case "paper":
            return -1;
        case "rock":
            return 0;
        default:
            console.log("Invalid input");
        }
    case "paper":
        switch (p2) {
        case "rock":
            return 1;
        case "scissors":
            return -1;
        case "paper":
            return 0;
        default:
            console.log("Invalid input");
        }
    case "scissors":
        switch (p2) {
        case "paper":
            return 1;
        case "rock":
            return -1;
        case "scissors":
            return 0;
        default:
            console.log("Invalid input");
        }
    default:
        console.log("Invalid input");
    }
    return null;
}

var playRound = function () {
    var p1 = prompt("Player 1: Enter your play");
    var p2 = prompt("Player 2: Enter your play");
    switch (compare(p1, p2)) {
    case 1:
        alert("Player 1 wins");
        return 0;
    case -1:
        alert("Player 2 wins");
        return 0;
    case 0:
        alert("Draw");
    }
    return 1;
}

while (playRound()) {}
