/* Checks user input in signup form */
function checkForm(){
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;		

    var valid = false;		
    var all_fields = true;

    if (username == ""){
        all_fields = false;
        document.getElementById("username").style.backgroundColor = "#f57c7c";
    }
    else
        document.getElementById("username").style.backgroundColor = "white";

    if (email == ""){
        all_fields = false;
        document.getElementById("email").style.backgroundColor = "#f57c7c";
    }
    else
        document.getElementById("email").style.backgroundColor = "white";

    if (password1 == ""){
        all_fields = false;
        document.getElementById("password1").style.backgroundColor = "#f57c7c";
    }
    else
        document.getElementById("password1").style.backgroundColor = "white";

    if (password2 == ""){
        all_fields = false;
        document.getElementById("password2").style.backgroundColor = "#f57c7c";
    }
    else
        document.getElementById("password2").style.backgroundColor = "white";

    if (all_fields == true){
        if (password1 == password2){
            alert("Welcome "+firstName+" "+lastName);
            valid = true;
        }
        else{
            document.getElementById("password1").style.backgroundColor = "#f57c7c";
            document.getElementById("password2").style.backgroundColor = "#f57c7c";
        }
    }
    else {
        alert("Error! Please fill out all fields!");
    }

    return valid;			
}	