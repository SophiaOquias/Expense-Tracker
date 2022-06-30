$(document).ready(function() {

    // format numbers to have commas 
    function numberWithCommas(number) {
        // regex formula from
        // https://www.delftstack.com/howto/javascript/javascript-add-commas-to-number/
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // get balance 
    $.get('get-total', function(data, status) {
        console.log(data);

        var totalExpense = 0;
        var totalIncome = 0; 

        data.forEach((item, i) => {

            if(item.entryType == "expense")
                totalExpense += item.amount;
            else if(item.entryType == "income")
                totalIncome += item.amount; 
        });

        var totalBalance = totalIncome - totalExpense; 

        // to .toFixed(2) adds decimal 
        $("#totalExpenses").text("P" + numberWithCommas(totalExpense.toFixed(2)));
        $("#totalIncome").text("P" + numberWithCommas(totalIncome.toFixed(2)));
        $("#balamount").text("P" + numberWithCommas(totalBalance.toFixed(2)));
    });

    // search 
    $("#search").keydown(function (event) {
        if (event.keyCode === 13) {
            var input = $("#search").val();
            window.open("/search?key=" + input, "_self"); 
        }
    });
   
    // edit budget goal
    $("#editbudget").click(function() {
        $.get("edit-budget", function (data, status) {
            var amount = data.budgetGoal;
            $("#budgetamount").html("<input id='newbudget' type='number' value='"
                + amount + "'>"); // append input elemeent 

            // make edit button invisible 
            $("#editbudget").hide();

            // create done button element
            var confirmBtn = document.createElement("a");
            $(confirmBtn).text("done");
            $(confirmBtn).addClass("edit");
            $(confirmBtn).attr("id", "confirmbudget");
            $("#budget").append(confirmBtn);

            $("#confirmbudget").click(function() {
                var newBudget = $("#newbudget").val();
                var doc = {budgetGoal: newBudget};

                $.get("edit-budget/confirm", doc, function(data, status) {
                    console.log(data);
                });

                // show edits in page 
                $("#budgetamount").html("P" + numberWithCommas(Number(newBudget).toFixed(2)));
                $("#newbudget").remove(); // remove input element
                $("#confirmbudget").remove(); // remove done button 

                // unhide edit button 
                $("#editbudget").show();
                
            });
        });
    });

    // edit budget goal
    $("#editsavgoal").click(function () {
        $.get("edit-savings", function (data, status) {
            var amount = data.savingsGoal;
            $("#sgoalamount").html("<input id='newsavings' type='number' value='"
                + amount + "'>"); // append input elemeent 

            // make edit button invisible 
            $("#editsavgoal").hide();

            // create done button element
            var confirmBtn = document.createElement("a");
            $(confirmBtn).text("done");
            $(confirmBtn).addClass("edit");
            $(confirmBtn).attr("id", "confirmsavings");
            $("#savingsgoal").append(confirmBtn);

            $("#confirmsavings").click(function () {
                var newSavings = $("#newsavings").val();
                var doc = { savingsGoal: newSavings };

                $.get("edit-savings/confirm", doc, function (data, status) {
                    console.log(data);
                });

                // show edits in page 
                $("#sgoalamount").html("P" + numberWithCommas(Number(newSavings).toFixed(2)));
                $("#newsavings").remove(); // remove input element
                $("#confirmsavings").remove(); // remove done button 

                // unhide edit button 
                $("#editsavgoal").show();

            });
        });
    });

});