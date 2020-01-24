// import app essential libraries
const express = require('express');
const session = require('express-session');
const formidable = require('express-formidable');
var bodyParser = require('body-parser');

// import fabric node sdk helper functions
const enrollAdmin = require('./fabric_node_sdk_helper/enrollAdmin');
const registerUser = require('./fabric_node_sdk_helper/registerUser');
const querychaincode = require('./fabric_node_sdk_helper/query');
const invokechaincode = require('./fabric_node_sdk_helper/invoke');
const {load_certificates_from_wallet} = require('./fileread');
const {sqlite_json_insert} = require('./db_query');
const {check_login_and_load_certificates} = require('./db_query');

// Create a express object
const app = express();
app.use(session({secret: 'ssshhhhh'}));
//  Body-parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Create a router for the express object
const router = express.Router();
const app_port_number = 3000;


var app_session;


async function load_html_template_and_start_app(app_port_number) {
    try{
        
        //add the router

        //Store all HTML files in view folder.
        app.use(express.static(__dirname + '/html/view'));

        //Store all JS and CSS in Scripts folder.
        app.use(express.static(__dirname + '/html/script'));


        app.use('/', router);
        app.listen(process.env.port || app_port_number);
        console.log(`######## App is Running at Port - ${app_port_number} #############`);
    }
    catch (error) {
        console.error(`Failed to load_html_template: ${error}`);
        process.exit(1);
    }
}


app.post('/register', async (req, res) =>  {
    
    console.log("inside register");
    let html_json_data;
    let user_role = "client";
    let register_status="success";
    let combined_user_data;
    let fabric_register_status;
    let json_response = {}

    try {

            html_json_data = req.body;
            console.log(html_json_data);
            fabric_register_status = await registerUser(html_json_data["User_Name"],
                                                    html_json_data["User_Password"],
                                                    user_role);
            console.log(fabric_register_status);
            if (fabric_register_status.includes("Success")) {
                      let user_certificates_json = await load_certificates_from_wallet(html_json_data["User_Name"]);
                      combined_user_data = {...html_json_data,...user_certificates_json};
                      let insert_status = await sqlite_json_insert(combined_user_data,"User");
                      register_status = insert_status;
                    }
            else {
              register_status = fabric_register_status;
            }


      }
      catch(e) {
                console.log(e);
                register_status = e;
              }
      finally {
                json_response['status'] = register_status;
                res.json(json_response);
              }
  });

app.post('/',async (req,res) => {
      app_session = req.session;
      let response;
      console.log(app_session);
      if(app_session.user_name && app_session.password) {
          console.log("session exists");
          response = {
                    "status":"session active",
                    "user_name": app_session.user_name,
                    "user_password" : app_session.password
              };
          console.log(response);
          
      }
      else {
          response = {
                "status":"session not active",
          };
          console.log(response);
          //res.json(response);
      }
      
      res.json(response);
      
  });




  
app.post('/logout', async (req, res) =>  {
    app_session = req.session;
    app_session.destroy((err) => {
          if(err) {
              return console.log(err);
          }
          res.redirect('/');
      });
});

// app.get('/logout', async (req, res,next) => {
//   if (req.session) {
//     // delete session object
//     req.session.destroy(function(err) {
//       if(err) {
//         return next(err);
//       } else {
//         return res.redirect('/');
//       }
//     });
//   }
// });


app.post('/login', async (req, res) =>  {

    
    let html_json_data = req.body;
    let user_name = html_json_data["Login_User_Name"];
    let user_password = html_json_data["Login_Password"];
    let login_status = await check_login_and_load_certificates(user_name,user_password);
    if (login_status === "success") {
        app_session = req.session;
        app_session.user_name = user_name;
        app_session.password = user_password;
      }
    
    let response = {
                    "status":login_status,
               };
    console.log(response);
    res.json(response);
  });


app.post('/sell', async (req, res) =>  {
    let response;
    let car_license_plate = req.body.car_license_plate;

    let CHAIN_CODE_NAME = req.body.Chain_Code_Name;
    let CHAIN_CODE_FUNCTION_NAME = req.body.Chain_Code_Function_Name;
   
    if(app_session.user_name && app_session.password) {
        let user_name = app_session.user_name;
        const CHANNEL_NAME  = "appchannel";
        //const CHAIN_CODE_NAME = "carcc";
        //const CHAIN_CODE_FUNCTION_NAME = "createCar";

        let invoke_result = await invokechaincode(user_name, 
                                                CHANNEL_NAME, 
                                                CHAIN_CODE_NAME, 
                                                CHAIN_CODE_FUNCTION_NAME,
                                                car_license_plate,
                                                "Opel","Corsa","Light Blue","7","2050","1");

        response = {
                        "status":"success",
                        "data":invoke_result
                  };
      }
    else {
          response = {
                      "status":"Failed",
                      "data":"Session Expired - Please Login"
                    };
    }
    console.log(response);
    res.json(response);
  });

app.post('/query_chain_code', async (req, res) =>  {
    let response;
    let CHAIN_CODE_NAME = req.body.Chain_Code_Name;
    let CHAIN_CODE_FUNCTION_NAME = req.body.Chain_Code_Function_Name;
   
    if(app_session.user_name && app_session.password) {
      
      let user_name = app_session.user_name;
      let CHANNEL_NAME  = "appchannel";
      //let CHAIN_CODE_NAME = "carcc";
      //let CHAIN_CODE_FUNCTION_NAME = "listCars";

      let query_result = await querychaincode(user_name,
                                              CHANNEL_NAME,
                                              CHAIN_CODE_NAME, 
                                              CHAIN_CODE_FUNCTION_NAME);
      
      response = {
                      "status":"success",
                      "data":query_result
                };
    }
    else {
          response = {
                      "status":"Failed",
                      "data":"Session Expired - Please Login"
                    };
    }

    
    console.log(response);
    res.json(response);
  });



async function main() {
    admin_enroll_status = await enrollAdmin();
    console.log(admin_enroll_status);
    await load_html_template_and_start_app(app_port_number);
}



main();
