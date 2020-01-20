function logout(){
    $.ajax({
        type: "POST",
        url: "/logout",
        async: true,
        complete: function(data)
            {
                console.log(data);
                $("#login_button").removeClass("w3-hide");
                document.getElementById("welcome_user_span").style.display = "none";
                document.getElementById("logout_button").style.display = "none";
            }
        });
}

function check_session(){
    $.ajax({
        type: "POST",
        url: "/",
        async: true,
        complete: function(data)
            {
                var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                console.log(json);
                if (json["status"] ==="session active") {
                    document.getElementById("session_user_name").textContent=json['user_name'];
                    $("#login_button").addClass("w3-hide");
                    document.getElementById("welcome_user_span").style.display = "block";
                    document.getElementById("logout_button").style.display = "block";
                }
                else {
                    document.getElementById("welcome_user_span").style.display = "none";
                    document.getElementById("logout_button").style.display = "none";
                    $("#login_button").removeClass("w3-hide");
                    
                }
                
            }
        });
}

// this is the id of the form
$("#register_form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    document.getElementById("register_loader").style.display = "block";
    var user_json  = {
        "User_Name":document.getElementById("User_Name").value,
        "User_Password":document.getElementById("User_Password").value,
        "User_House_Number":document.getElementById("User_House_Number").value,
    };

    $.ajax({
            type: "POST",
            url: "/register",
            async: true,
            dataType : 'json',
            data : user_json,
            complete: function(data)
                {
                    
                    document.getElementById("register_loader").style.display = "none";
                    console.log(data);
                    var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                    alert(json.status);
                    if (json["status"] ==="success") {
                        document.getElementById("register").style.display = "none";
                    }
                    
                }
            });
});



$("#login_form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    document.getElementById("login_loader").style.display = "block";

    var user_json  = {
        "Login_User_Name":document.getElementById("Login_User_Name").value,
        "Login_Password":document.getElementById("Login_Password").value,
    };

    $.ajax({
            type: "POST",
            url: "/login",
            async: true,
            dataType : 'json',
            data : user_json,
            complete: function(data)
                {
                    
                    document.getElementById("login_loader").style.display = "none";  
                    var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                    
                    if (json["status"] ==="success") {
                        document.getElementById("session_user_name").textContent=document.getElementById("Login_User_Name").value;
                        console.log(json['status']);
                        $("#login_button").addClass("w3-hide");
                        document.getElementById("login").style.display = "none";
                        document.getElementById("welcome_user_span").style.display = "block";
                        document.getElementById("logout_button").style.display = "block";
                        alert(json['status']);

                    }
    
                }
            });
});


$("#sell_form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    document.getElementById("sell_loader").style.display = "block";
    $.ajax({
            type: "POST",
            url: "/sell",
            async: true,
            data: form.serialize(), // serializes the form's elements.
            complete: function(data)
                {
                    document.getElementById("sell_loader").style.display = "none";
                    var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                    alert(json['data']);
                    console.log(JSON.parse(json['data']));
                }
            });
});


$("#query_chain_code").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    document.getElementById("query_chain_code_loader").style.display = "block";
    $.ajax({
            type: "POST",
            url: "/query_chain_code",
            async: true,
            data: form.serialize(), // serializes the form's elements.
            complete: function(data)
                {
                    document.getElementById("query_chain_code_loader").style.display = "none";
                    var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                    alert(json['data']);
                    console.log(JSON.parse(json['data']));
                }
            });
});


