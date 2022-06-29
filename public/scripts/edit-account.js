$(document).ready(function() {

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