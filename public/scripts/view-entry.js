$(document).ready(function() {
    function numberWithCommas(number) {
        // regex formula from
        // https://www.delftstack.com/howto/javascript/javascript-add-commas-to-number/
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // format amount to add commas 
    var unformattedAmount = parseFloat($("#amount").text());
    console.log(unformattedAmount);

    $("#amount").text(numberWithCommas("P " + unformattedAmount.toFixed(2)));

});