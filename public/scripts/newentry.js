$(document).ready(function() {

    // input stuff
    var date = $("#date");
    var description = $("#description");
    var ORnum = $("#ORnumber"); // not required
    var category = $("#category");
    var amount = $("#amount");
    var type = $("#entrytype");
    var notes = $("#notes"); // not required

    // set current date as default 
    var today = new Date();
    var formattedDate = today.getFullYear().toString() + '-'
        + (today.getMonth() + 1).toString().padStart(2, 0) + '-'
        + today.getDate().toString().padStart(2, 0);
    date.val(formattedDate);

    // sets border to red
    function setError(element) {
        element.css("border-color", "var(--cancel)");
        element.css("border-width", "2px")
    }

    // sets border to black
    function setDefault(element) {
        element.css("border-color", "var(--text-color)");
        element.css("border-width", "1px")
    }

    // validates if required fields have inputs 
    function validate() {
        // check if description is empty 
        var isValid = true;

        // check description
        if(description.val() == "") {
            setError(description);
            isValid = false;
        }
        else {
            setDefault(description);
        }

        // check category
        if(category.val() == "") {
            setError(category)
            isValid = false;
        }
        else {
            setDefault(category);
        }

        // check amount 
        if(amount.val() == "") {
            setError(amount);
            isValid = false;
        }
        else {
            setDefault(amount);
        }
        // check entry type 
        if (type.val() == "NA") {
            setError(type);
            isValid = false;
        }
        else {
            setDefault(type);
        }

        return isValid; 
    }

    $("#confirmbtn").click(function() {
        if(validate()) {
            var newExpense = {
                entryType: type.find(":selected").val(),
                date: date.val(),
                category: category.val(),
                description: description.val(),
                amount: amount.val(),
                notes: notes.val(),
                ORnumber: ORnum.val()
            }

            $.post('add-expense', newExpense, function(data, status) {
                console.log(data);
            })

            window.open("/", "_self");
        }
    });
});