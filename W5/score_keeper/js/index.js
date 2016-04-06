function setResult (val) {
    $('#result').text(val.toString());
}

$(document).ready(function () {
    var result = 0;

    $('#zero').click(function () {
        result = 0;
        setResult(result);
    });
    $('#add5').click(function () {
        result += 5;
        setResult(result);
    });
    $('#add10').click(function () {
        result += 10;
        setResult(result);
    });
    $('#sub1').click(function () {
        result--;
        setResult(result);
    });
});
