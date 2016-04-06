function httpGetAsync(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var btcInfo = JSON.parse(xmlHttp.responseText);
            callback(btcInfo["24h_avg"]);
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

$(document).ready(function () {
    var btcCallback = function (btcTxt) {
        $("#btc").text($("#btcCurrency").val() + " " + btcTxt + " / BTC");
    };

    $("#btcButton").click(function () {
        var url = "https://api.bitcoinaverage.com/ticker/global/" +
                    $("#btcCurrency").val() + "/";
        httpGetAsync(url, btcCallback);
    });
});
