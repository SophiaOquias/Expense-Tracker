$(document).ready(function() {

    function numberWithCommas(number) {
        // regex formula from
        // https://www.delftstack.com/howto/javascript/javascript-add-commas-to-number/
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    $("#search").keydown(function (event) {
        if (event.keyCode === 13) {
            var input = $("#search").val();
            window.open("/search?key=" + input, "_self"); 
        }
    });
})

// TO DO: make this jquery later

function editBudget() {
    var editButton = document.getElementById("editbudget");
    var amount = document.getElementById("budgetamount");

    if(editButton.innerHTML == "edit"){
        amount.innerHTML = "<input id='newbudget' type='number'>";
        editButton.innerHTML = "done";
    }
    else {
        var newBudget = document.getElementById("newbudget").value;
        amount.innerHTML = "P" + newBudget;
        editButton.innerHTML = "edit";
    }
}

function editSavingsGoal() {
    var editButton = document.getElementById("editsavgoal");
    var amount = document.getElementById("sgoalamount");

    if(editButton.innerHTML == "edit"){
        amount.innerHTML = "<input id='newsavgoal' type='number'>";
        editButton.innerHTML = "done";
    }
    else {
        var newSavGoal = document.getElementById("newsavgoal").value;
        amount.innerHTML = "P" + newSavGoal;
        editButton.innerHTML = "edit";
    }
}