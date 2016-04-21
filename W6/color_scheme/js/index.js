$(document).ready(function () {
    $('#grayButton, #whiteButton, #blueButton, #yellowButton').on('click',
        function () {
            var colour = $(this).attr('id').replace('Button', '');
            $('body').attr('class', colour);
        });
});
