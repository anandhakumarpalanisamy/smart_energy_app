
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
                window.location.href = "/";
            }
        });
}


function get_session_details(){

    $.ajax({
        type: "POST",
        url: "/",
        async: true,
        complete: function(data)
            {
                var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                console.log(json);
                if (json["status"] ==="session active") {
                   
                    $(".session_user_name").text(json['user_name']);
                    
                }
                else {
                   
                    $(".session_user_name").text("Session Expired");
                }
                
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

                    //$("#session_user_name").text(json['user_name']);

                    // console.log($('#my_profile').contents().find('div .session_user_name'));
                    // $('#my_profile').contents().find('.session_user_name').html(json['user_name']);

                    
                    //$(".session_user_name").text(json['user_name']);
                    
                    $(".login_button").hide();
                    $(".register_button").hide();

                    $("#welcome_user_span").show();
                    $(".logout_button").show();
                    $(".notification_button").show();
                    $(".buy_button").show();
                    $(".query_button").show();
                    $(".invoke_button").show();
                    $(".my_profile_button").show();
                    
                    $("#login_check").hide();
                    $("#register_check").hide();
                    $("#buy").hide();
                    $("#my_profile").show();
                    
                    
                    


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
                    $(".my_profile_button").hide();

                    $("#my_profile").hide();
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
                    $(".session_user_name").text(json['user_name']);
                }
                else {
                    
                   // document.getElementById("welcome_user_span").style.display = "none";
                    //document.getElementById("logout_button").style.display = "none";
                   // $("#login_button").removeClass("w3-hide");
                    //document.getElementById('login_check').style.display = "block";
                    window.location.href = "/";
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
                        window.top.location.href = "/";
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


$("#ad_submit").click(function() {
    //alert("cancel");
    document.getElementById("ad_loader").style.display = "block";
    var time = new Date();
    var user_json  = {
        "Posted_Timestamp":time.toString().slice(0, -41),
        "Energy_To_Sell":document.getElementById("power_to_sell").value, 
        "Cost":document.getElementById("energy_cost").value, 
        "Advertisement_text":document.getElementById("advertisement_text").value, 
        
    };


    $.ajax({
            type: "POST",
            url: "/ad_submit",
            async: true,
            dataType : 'json',
            data : user_json,
            complete: function(data)
                {
                    document.getElementById("ad_loader").style.display = "none";
                    var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                    alert(json['status']);
                    if (json["status"] ==="success") {
                        //console.log(document.getElementById('Login_User_Name').value);
                        //$(parent.document).find("#session_user_name").text(document.getElementById("Login_User_Name").value);
                        //$(parent.document).find("#welcome_user_span").show();
                        //$(parent.document).find("#logout_button").show();
                        console.log(json["status"]);
                        window.top.location.href = "/";
                        
                    }
                    
    
                }
            });
  });


function template_ad_content(json_data){

//var user_image = json_data["User_Image"]; 
var user_image = "/images/avatar2.png"; 
var user_name = json_data["User_Name"];
var cost = json_data["Cost"];
var Energy_To_Sell = json_data["Energy_To_Sell"];
var Energy_Sources = json_data["Energy_Source_Type"];
var Capacity = json_data["Accumulated_Generated_Power"];
var Likes_Count = json_data["Likes_Count"];
var seller_rating = json_data["User_Profile_Rating"];
var price_comparison = json_data["Cost"];
var ad_text = json_data["Advertisement_Text"];
var timestamp = json_data["Posted_Timestamp"];

var add_content = ' <div class="w3-row w3-padding-24 w3-animate-bottom">'
            + '<div class="w3-twothird w3-container">'
            + '<div class="w3-container w3-card w3-white w3-round "><br>'
            + '<img src="'+user_image+'" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">'
            + '<span class="w3-right w3-opacity"><i class="far fa-clock" aria-hidden="true"></i> '+timestamp+'</span>'
            + '<h4>'+user_name+'</h4><br>'
            + '<hr class="w3-clear">'

            + '<p>'+ad_text+'</p>'

            + '<div class="w3-row-padding " >'
            + '<div class="w3-quarter w3-center w3-right">'
            + '<p >'
            + '<span class="w3-text-dark-gray"><i class="fab fa-bitcoin" aria-hidden="true"></i> Price</span><br>'
            + '<span>'+cost+' per kW</span>'
            + '</p>'
            + '</div>'

            + '<div class="w3-quarter w3-center w3-right ">'
            + '<p >'
            + '<span class="w3-text-dark-gray"><i class="fas fa-battery-half" aria-hidden="true"></i> Selling</span><br>'
            + '<span>'+Energy_To_Sell+' kW</span>'
            + '</p>'
            + '</div>'

            + '<div class="w3-quarter w3-center w3-right ">'
            + '<p >'
            + '<span class="w3-text-dark-gray"><i class="fas fa-charging-station" aria-hidden="true"></i> Source</span><br>'
            + '<span>'+Energy_Sources+' </span>'
            + '</p>'
            + '</div>'

            + '<div class="w3-quarter w3-center w3-right w3-hide-small w3-hide-medium">'
            + '<p >'
            + '<span class="w3-text-dark-gray"><i class="fas fa-battery-full" aria-hidden="true"></i> Capacity</span><br>'
            + '<span >'+Capacity+' kW  </span>'
            + '</p>'
            + '</div>'

            + '</div><hr class="w3-clear">'
            + '<button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like <span>'+Likes_Count+'</span></button> '
            + '<!-- <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment <span>16</span></button> -->'
            + '<button  type="button" class="buy_energy_button w3-button w3-theme-d2 w3-margin-bottom w3-right w3-teal w3-hover-opacity"><i class="fa fa-shopping-cart"></i> Buy</button>'
            + '</div>'
            + '</div>'
            + '<div class="w3-third w3-container w3-hide-small " style="margin-top: 25px;">'
            + '<p class="w3-card w3-padding-large w3-padding-32 w3-center w3-animate-right">'
            + '<img src="/images/profile_rating_icon.png" aria-hidden="true" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">'
            + '<span class="w3-text-dark-gray"><i class="fas fa-star-half-alt" aria-hidden="true"></i> Seller Rating</span><br>'
            + '<span>'+seller_rating+'%  <i class="far fa-heart" aria-hidden="true"></i></span>'
            + '</p>'
            + '<p class="w3-card w3-padding-large w3-padding-32 w3-center w3-animate-left">'
            + '<img src="/images/bitcoin2.png" aria-hidden="true" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px;margin-top: -7px;height: 60px;">'
            + '<span class="w3-text-dark-gray"><i class="fas fa-chart-line w3-xlarge" aria-hidden="true"></i> Price Meter </span><br>'
            + '<span>'+price_comparison+'% <i class="far fa-arrow-alt-circle-down" aria-hidden="true"></i> </span>'
            + '</p>'
            + '</div>'
            + '</div>';
    return add_content;
}


  function get_advertisements(){

  
    $.ajax({
        type: "POST",
        url: "/buy_ad_loader",
        async: true,
        dataType : 'json',
        //data : user_json,
        complete: function(data)
            {
                //document.getElementById("buy_ad_loader").style.display = "none";
                var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                //alert(json['status']);
                if (json["status"] ==="success") {
                    //console.log(document.getElementById('Login_User_Name').value);
                    //$(parent.document).find("#session_user_name").text(document.getElementById("Login_User_Name").value);
                    //$(parent.document).find("#welcome_user_span").show();
                    //$(parent.document).find("#logout_button").show();
                    //window.top.location.href = "/";
                    console.log(json["data"]);

                    for (i = 0; i < json["data"].length; i++) {
                        
                        $(".add_container").prepend(template_ad_content(json["data"][i]));
                       
                      }
                }
                

            }
        });



 

}