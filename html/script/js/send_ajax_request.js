// this is the id of the form
$("#register_form").submit(function(e) {

e.preventDefault(); // avoid to execute the actual submit of the form.

var form = $(this);
//var url = form.attr('action');
document.getElementById("register_loader").style.display = "block";
$.ajax({
        type: "POST",
        url: "/register",
        async: true,
        data: form.serialize(), // serializes the form's elements.
        complete: function(data)
            {
                
                document.getElementById("register_loader").style.display = "none";
                console.log(data);
                var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                alert(json.status);
                
            }
        });
});



$("#login_form").submit(function(e) {

e.preventDefault(); // avoid to execute the actual submit of the form.

var form = $(this);
//var url = form.attr('action');
document.getElementById("login_loader").style.display = "block";
$.ajax({
        type: "POST",
        url: "/login",
        async: true,
        data: form.serialize(), // serializes the form's elements.
        complete: function(data)
            {
                
                document.getElementById("login_loader").style.display = "none";  
                var json = JSON.parse(data.responseText.replace(/\bNaN\b/g, "null"));
                alert(json['data']);
                console.log(JSON.parse(json['data']));
            }
        });
});


$("#sell_form").submit(function(e) {

e.preventDefault(); // avoid to execute the actual submit of the form.

var form = $(this);
//var url = form.attr('action');
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

