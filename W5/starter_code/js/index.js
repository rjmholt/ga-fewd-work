// Regexes for city names
var RE_SYD  = /^(SYD|[sS]yd(?:ney)?)$/;
var RE_NYC  = /^(?:NYC|nyc|[nN]ew [yY]ork ([cC]ity)?)$/;
var RE_SF   = /^(?:sf|[sS]an [fF]ran(?:cisco)?|[bB]ay [aA]rea)$/;
var RE_AUST = /^([aA]ustin|atx|ATX)$/;
var RE_LA   = /^(?:lax?|LAX?|[lL]os [aA]ngeles)$/;

// Change the background image to the
// city matching the class name
function changeCityImg (imgClass) {
    // Hide any error messages
    $('#error').hide();
    // Get rid of the old body class/background image
    $('body').removeClass();
    // Add the new class for the background image to display
    $('body').addClass(imgClass);
}

// When the page loads, take form input and change the
// background image accordingly
$(document).ready(function () {
    // When the form submits...
    $('form').submit(function (e) {
        // Get the text in the text input element
        var cityText = $('#city-type').val();

        // If the user enters a name for Sydney,
        // change the background image to Sydney
        if (RE_SYD.test(cityText)) {
            changeCityImg('sydney');
        }
        // Do the same for New York City
        else if (RE_NYC.test(cityText)) {
            changeCityImg('nyc');
        }
        // And for San Fran
        else if (RE_SF.test(cityText)) {
            changeCityImg('sf');
        }
        // And for Austin
        else if (RE_AUST.test(cityText)) {
            changeCityImg('austin');
        }
        // And for LA
        else if (RE_LA.test(cityText)) {
            changeCityImg('la');
        }
        // If the input doesn't match, let the user know we
        // have no idea what city they entered
        else {
            // Remove the old background
            $('body').removeClass();
            // Display the error message
            $('#error').text("Sorry -- your city isn't listed!");
            // Show the error
            $('#error').show();
        }

        // Stop the form from reloading the page
        // (or doing whatever it wants to do by default)
        e.preventDefault();
    });
});
