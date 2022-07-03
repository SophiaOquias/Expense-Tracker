$(document).ready(function() {

    // from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function checkFields() {

        // check email
        if($("#email").val() == "" || !validateEmail($("#email").val())) {
            return false;
        }

        if($("#username").val() == "") {
            return false; 
        }

        return true; 
    }

    // confirm button disables and shows error if invalid email is inputted
    $("#email").keyup(function() {
        if(!checkFields()) {
            $("#confirm").prop("disabled", true);

            var edits = {
                email: $("#email").val(),
                username: $("#username").val()
            }

            $.post("/account/edit/confirm", edits, function(data, status) {
                $("#error").text(data);
            });
        }
        else {
            $("#confirm").prop("disabled", false);
            $("#error").text("");
        }
    });

    // confirm disables and shows error if no username is inputted
    $("#username").keyup(function () {
        if (!checkFields()) {
            $("#confirm").prop("disabled", true);

            var edits = {
                email: $("#email").val(),
                username: $("#username").val()
            }

            $.post("/account/edit/confirm", edits, function (data, status) {
                $("#error").text(data);
            });
        }
        else {
            $("#confirm").prop("disabled", false);
            $("#error").text("");
        }
    });

    $("#confirm").click(function() {
        var edits = {
            email: $("#email").val(),
            username: $("#username").val()
        }

        console.log(edits);

        $.post('/account/edit/confirm', edits, function(data, status) {
            console.log(data);
        });

    });
});