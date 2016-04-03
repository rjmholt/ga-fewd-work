/* Author: Robert Holt
 * 2015-04-02
 */

$(document).ready(function () {
    $('.readmore a').click(function (e) {
        e.preventDefault();
        $('#show-this-on-click').slideDown();
        $('.readless').slideDown();
    });

    $('.readless a').click(function (e) {
        e.preventDefault();
        $('#show-this-on-click').slideUp();
        $('.readless').slideUp();
    });

    $('aside p a').click(function (e) {
        e.preventDefault();
        $('aside p a').hide();
        $('#learnmoretext').slideDown();
    });
});
