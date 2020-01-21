# Smart Energy Node App

# Requirements
  1. Bityoga fabric sdk should be up and running
  2. Node version
     - Supports node version >=v11.0.0
     - Tested with v11.0.0

# Run Instructions
  1. ## Clone this repository
      - git clone https://github.com/anandhakumarpalanisamy/smart_energy_app.git
      
  2. ## Run npm install
      - cd smart_energy_app/
      - ####  Set node version
          -  nvm use node v8.10.0   (using nvm)
      - **Execute  Command :** npm install
      
  3. ## Update fabric ip address in 'smart_energy_app/fabric_node_sdk_helper/network_profile.json'
      - (For other New App Developers) fabric_node_sdk_helper is available in git repository  : https://github.com/anandhakumarpalanisamy/fabric_node_sdk_helper.git 
      - **update the url ip addresses of orderer, peer2, orgca, tlsca (4 places)**.
      - update it with your prime manager's ip address
      
  4.  ## Retrieve hyperledger fabric tls certificates of 'orderer' and 'peer2'
      #### Through shell script - needs ssh permission
        - cd smart_energy_app/fabric_node_sdk_helper
        - In 'smart_energy_app/fabric_node_sdk_helper/get_tls_certificates.sh' Replace **IP_ADDRESS="178.62.207.235"** with your fabric prime manager's ip address
        - **Execute  Command :** bash get_tls_certificates.sh
      #### (OR) Through Manual scp commands - needs ssh permission
        - Replace ipaddress in the below scp commands with your fabric prime manager's ip address.
        - scp -r root@178.62.207.235:/root/hlft-store/orderer/tls-msp/tlscacerts/tls-tlsca-7054.pem .smart_energy_app/fabric_node_sdk_helper/hlft-store/orderer/tls-msp/tlscacerts/tls-tlsca-7054.pem
        - scp -r root@178.62.207.235:/root/hlft-store/peer2/tls-msp/tlscacerts/tls-tlsca-7054.pem .smart_energy_app/fabric_node_sdk_helper/hlft-store/peer2/tls-msp/tlscacerts/tls-tlsca-7054.pem
        
      #### (OR) Manually edit the following two files - no need of ssh permission
        - smart_energy_app/fabric_node_sdk_helper/hlft-store/orderer/tls-msp/tlscacerts/tls-tlsca-7054.pem
        - smart_energy_app/fabric_node_sdk_helper/hlft-store/peer2/tls-msp/tlscacerts/tls-tlsca-7054.pem
         
         
        
   5. ## Start App
        - cd smart_energy_app/
        - **Execute  Command :** node app.js
        - app will be running in 'localhost' at port 3000
        - open in browser: http://localhost:3000/ 
