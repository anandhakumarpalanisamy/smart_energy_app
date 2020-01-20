
function logout(){
    $.ajax({
        type: "POST",
        url: "/logout",
        async: true,
        complete: function(data)
            {
                console.log(data);
                //$("#login_button").removeClass("w3-hide");
               // document.getElementById("welcome_user_span").style.display = "none";
                //document.getElementById("logout_button").style.display = "none";
                window.location.href = "/index.html";
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
                    //document.getElementById("session_user_name").textContent=json['user_name'];
                    //document.getElementById("welcome_user_span").style.display = "block";
                    //document.getElementById("logout_button").style.display = "block";
                    //document.getElementById('home').style.display = "block";

                    $("#session_user_name").text(json['user_name']);
                    
                    $(".login_button").hide();
                    $(".register_button").hide();

                    $("#welcome_user_span").show();
                    $(".logout_button").show();
                    $(".notification_button").show();
                    $(".buy_button").show();
                    $(".query_button").show();
                    $(".invoke_button").show();
                    
                    $("#login_check").hide();
                    $("#register_check").hide();
                    $("#buy").hide();
                    $("#home").show();
                    



                }
                else {
                    //document.getElementById("welcome_user_span").style.display = "none";
                    //document.getElementById("logout_button").style.display = "none";
                    
                    $(".login_button").show();
                    $(".register_button").show();

                    $("#welcome_user_span").hide();
                    $(".logout_button").hide();
                    $(".notification_button").hide();
                    $(".buy_button").hide();
                    $(".query_button").hide();
                    $(".invoke_button").hide();

                    $("#home").hide();
                    $("#register_check").hide();
                    $("#buy").hide();
                    
                    
                    $("#login_check").show();

                    //document.getElementById('login_check').style.display = "block";
                }
                
            }
        });
}




function check_iframe_session(){
    $.ajax({
        type: "POST",
        url: "/",
        async: true,
        complete: function(data)
            {
                var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                console.log(json);
                if (json["status"] ==="session active") {
                    //document.getElementById("session_user_name").textContent=json['user_name'];
                    //$("#login_button").addClass("w3-hide");
                    //document.getElementById("welcome_user_span").style.display = "block";
                    //document.getElementById("logout_button").style.display = "block";
                    //window.location.href = "/home_page.html";
                    //document.getElementById('home').style.display = "block";
                    console.log("session active");
                }
                else {
                    
                   // document.getElementById("welcome_user_span").style.display = "none";
                    //document.getElementById("logout_button").style.display = "none";
                   // $("#login_button").removeClass("w3-hide");
                    //document.getElementById('login_check').style.display = "block";
                    window.location.href = "/index.html";
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
                        //document.getElementById("register").style.display = "none";
                        window.location.href = "/login_check.html";
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
                    alert(json['status']);
                    if (json["status"] ==="success") {
                        //console.log(document.getElementById('Login_User_Name').value);
                        //$(parent.document).find("#session_user_name").text(document.getElementById("Login_User_Name").value);
                        //$(parent.document).find("#welcome_user_span").show();
                        //$(parent.document).find("#logout_button").show();
                        window.top.location.href = "/index.html";
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


