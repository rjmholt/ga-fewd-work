var RE_SYD  = /^(SYD|[sS]yd(?:ney))?$/;
var RE_NYC  = /^(?:NYC|nyc|[nN]ew [yY]ork [cC]ity)$/;
var RE_SF   = /^(?:sf|[sS]an [fF]ran(?:cisco)?|[bB]ay [aA]rea)$/;
var RE_AUST = /^([aA]ustin|atx|ATX)$/;
var RE_LA   = /^(?:lax?|LAX?|[lL]os [aA]ngeles)$/;

function changeCityImg (imgClass) {
    $('#error').hide();
    $('body').removeClass();
    $('body').addClass(imgClass);
}

$(document).ready(function () {
    $('form').submit(function (e) {
        var cityText = $('#city-type').val();

        var imgSrcPath;
        if (RE_SYD.test(cityText)) {
            changeCityImg('sydney');
        }
        else if (RE_NYC.test(cityText)) {
            changeCityImg('nyc');
        }
        else if (RE_SF.test(cityText)) {
            changeCityImg('sf');
        }
        else if (RE_AUST.test(cityText)) {
            changeCityImg('austin');
        }
        else if (RE_LA.test(cityText)) {
            changeCityImg('la');
        }
        else {
            $('body').removeClass();
            $('#error').text("Sorry -- your city isn't listed!");
            $('#error').show();
        }

        e.preventDefault();
    });
});
