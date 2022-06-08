$(document).ready(function () {
    function numberWithCommas(number) {
        // regex formula from
        // https://www.delftstack.com/howto/javascript/javascript-add-commas-to-number/
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function createExpenseDiv(expense, parentDiv) {
        // Guide Format 
        // <div id="entry1" class="entry" onclick="location.href='viewentry.html';">
        //     <span class="description">Thomas The Train Trainset</span>
        //     <span class="entryType">Expense</span>
        //     <br>
        //     <span class="amount">P1,760.00</span>
        //     <span class="date">January 03, 2022</span>
        // </div>

        // create html elements
        var expenseEntry = document.createElement("div");
        var descriptionRow = document.createElement("span");
        var entryTypeRow = document.createElement("span");
        var amountRow = document.createElement("span");
        var dateRow = document.createElement("span");
        var br = document.createElement("br");

        // add css styles 
        $(expenseEntry).addClass("entry");
        $(descriptionRow).addClass("description");
        $(entryTypeRow).addClass("entryType");
        $(amountRow).addClass("amount");
        $(dateRow).addClass("date");

        // add data 
        $(descriptionRow).text(expense.description);
        $(entryTypeRow).text(expense.entryType);
        $(amountRow).text("P" + numberWithCommas(expense.amount.toFixed(2)));
        $(dateRow).text(expense.date);

        // append to parent div 
        expenseEntry.append(descriptionRow);
        expenseEntry.append(entryTypeRow);
        expenseEntry.append(br);
        expenseEntry.append(amountRow);
        expenseEntry.append(dateRow);

        parentDiv.append(expenseEntry);
    }

    $.get('/view-savings/get-savings-only', function (data, status) {
        console.log(data);

        var container = $("#entrysect");

        data.forEach((item, i) => {
            createExpenseDiv(item, container);
        })
    });
})