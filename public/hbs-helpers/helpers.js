function numberWithCommas(number) {
    // regex formula from
    // https://www.delftstack.com/howto/javascript/javascript-add-commas-to-number/
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
    
    currency: function(value) {
        return "P" + numberWithCommas(value.toFixed(2));
    },

    select: function(selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    }
}