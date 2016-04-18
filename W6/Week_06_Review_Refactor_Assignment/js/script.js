// City names
var NYC = 'NYC';
var SF  = 'SF';
var LA  = 'LA';
var ATX = 'ATX';
var SYD = 'SYD';

// Background setting functions for city names
function setNYC ()
{
    $('body').addClass('nyc');
}

function setSF ()
{
    $('body').addClass('sf');
}

function setLA ()
{
    $('body').addClass('la');
}

function setATX ()
{
    $('body').addClass('austin');
}

function setSYD ()
{
    $('body').addClass('sydney');
}

$(document).ready(function () {
    // Map background set functions to city input names
    var cityChange =
        {
            NYC: setNYC,
            SF:  setSF,
            LA:  setLA,
            ATX: setATX,
            SYD: setSYD
        };

    // Add the city input strings (keys in the mapping) to the
    // list of cities to select from
    Object.keys(cityChange).forEach(function (cityName, i, arr) {
        $('#city-type').append('<option>'+cityName+'</option>');
    });

    // When the user changes the selection
    $('#city-type').change(function () {
        // Get the selected value
        var citySelection = $('#city-type').val();
        // Remove classes on the body to reset the background
        $('body').removeClass();
        // Call the function corresponding to the city name
        // to change the class and set the background
        cityChange[citySelection]();
    });
});
