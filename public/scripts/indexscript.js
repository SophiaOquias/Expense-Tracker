/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("menubar").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("menubar").style.width = "0";
}

function editBalance() {
    var editButton = document.getElementById("editbalance");
    var amount = document.getElementById("balamount");

    if(editButton.innerHTML == "edit"){
        amount.innerHTML = "<input id='newbalance' type='number'>";
        editButton.innerHTML = "done";
    }
    else {
        var newBalance = document.getElementById("newbalance").value;
        amount.innerHTML = "P" + newBalance;
        editButton.innerHTML = "edit";
    }
}

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