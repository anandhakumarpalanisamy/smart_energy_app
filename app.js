// import app essential libraries
const express = require('express');
const formidable = require('express-formidable');
var bodyParser = require('body-parser');

// import fabric node sdk helper functions
const enrollAdmin = require('./fabric_node_sdk_helper/enrollAdmin');
const registerUser = require('./fabric_node_sdk_helper/registerUser');
const querychaincode = require('./fabric_node_sdk_helper/query');
const invokechaincode = require('./fabric_node_sdk_helper/invoke');

// Create a express object
const app = express();

//  Body-parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Create a router for the express object
const router = express.Router();
const app_port_number = 3000;





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
    
    let user_name = req.body.uname;
    let user_password = req.body.psw;
    let user_role = "client";

    
    let register_status = await registerUser(user_name,
                                            user_password,
                                            user_role);

    let response = {
                    status:register_status
               };
    res.json(response);
  });


  app.post('/login', async (req, res) =>  {

    let user_name = req.body.uname;

    let CHANNEL_NAME  = "appchannel";
    let CHAIN_CODE_NAME = "carcc";
    let CHAIN_CODE_FUNCTION_NAME = "listCars";

    let login_result = await querychaincode(user_name,
                                            CHANNEL_NAME,
                                            CHAIN_CODE_NAME, 
                                            CHAIN_CODE_FUNCTION_NAME);
    
    let response = {
                    "status":"success",
                    "data":login_result
               };
    console.log(response);
    res.json(response);
  });


  app.post('/sell', async (req, res) =>  {

    let user_name = req.body.uname;
    let car_license_plate = req.body.car_license_plate;
   
    const CHANNEL_NAME  = "appchannel";
    const CHAIN_CODE_NAME = "carcc";
    const CHAIN_CODE_FUNCTION_NAME = "createCar";

    let sell_result = await invokechaincode(user_name, 
                                            CHANNEL_NAME, 
                                            CHAIN_CODE_NAME, 
                                            CHAIN_CODE_FUNCTION_NAME,
                                            car_license_plate,
                                            "Opel","Corsa","Light Blue","7","2050","1");

    let response = {
                    "status":"success",
                    "data":sell_result
               };
    console.log(response);
    res.json(response);
  });




async function main() {
    admin_enroll_status = await enrollAdmin();
    console.log(admin_enroll_status);
    await load_html_template_and_start_app(app_port_number);
}



main();
