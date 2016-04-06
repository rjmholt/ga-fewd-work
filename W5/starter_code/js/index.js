var RE_SYD  = /^[sS]yd(?:ney)?$/;
var RE_NYC  = /^(?:NYC|nyc|[nN]ew [yY]ork [cC]ity)$/;
var RE_SF   = /^(?:sf|[sS]an [fF]ran(?:cisco)?)$/;
var RE_AUST = /^[aA]ustin$/;
var RE_LA   = /^(?:la|LA|[lL]os [aA]ngeles)$/;

$(document).ready(function () {
    $('form').submit(function (e) {
        var cityText = $('#city-type').val();

        var imgSrcPath;
        if (RE_SYD.test(cityText)) {
            $('body').removeClass();
            $('body').addClass('sydney');
        }
        else if (RE_NYC.test(cityText)) {
            $('body').removeClass();
            $('body').addClass('nyc');
        }
        else if (RE_SF.test(cityText)) {
            $('body').removeClass();
            $('body').addClass('sf');
        }
        else if (RE_AUST.test(cityText)) {
            $('body').removeClass();
            $('body').addClass('austin');
        }
        else if (RE_LA.test(cityText)) {
            $('body').removeClass();
            $('body').addClass('la');
        }
        else {
            console.log("Error -- unmatched city");
            return;
        }

        e.preventDefault();
    });
});
