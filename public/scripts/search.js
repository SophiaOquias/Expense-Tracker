$(document).ready(function () {
    function numberWithCommas(number) {
        // regex formula from
        // https://www.delftstack.com/howto/javascript/javascript-add-commas-to-number/
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var num = $(".amount").text();
    $(".amount").text("P" + numberWithCommas(num.toFixed(2)));
});