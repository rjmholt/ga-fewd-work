function currencyFormat (amount)
{
    return '$' + amount.toFixed(2);
}

function total ()
{
    var total = 0;

    var addTotal = function (itemName, amount) {
        $('#entries').append('<tr><td>' +
                itemName +
                '</td><td>' +
                currencyFormat(amount) +
                '</td></tr>');
        total += amount;
        $('#total').text(currencyFormat(total));
    };

    return addTotal;
}

function rebukeUser(message)
{
    $('#newEntry').val(message);
}

$(document).ready(function () {
    var addTotal = total();

    $('#entry').submit(function (e) {
        var formContent = $('#newEntry').val().split(/\s/);
        if (formContent.length === 2) {
            var itemName = formContent[0].trim();
            var amount = parseFloat(formContent[1]);
            addTotal(itemName, amount);
            e.preventDefault();
            $('#newEntry').val('');
        }
        else {
            rebukeUser('Invalid Entry');
            e.preventDefault();
        }
    });
});
