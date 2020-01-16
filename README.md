# Smart Energy Node App
##  Instructions

# Requirements
  1. Bityoga fabric sdk should be up and running
  2. Node version
     - Supports node version >=8
     - Tested with v8.10.0

# Run Instructions
  1. ## Clone this repository
      - git clone https://github.com/anandhakumarpalanisamy/smart_energy_app.git
      
  2. ## Run npm install
      - cd smart_energy_app/
      - ####  Set node version
          -  nvm use node v8.10.0   (using nvm)
      - **Execute  Command :** npm install
      
  3. ## Update ip address in 'smart_energy_app/fabric_node_sdk_helper/network_profile.json'
      - (For other New App Developers) fabric_node_sdk_helper is available in git repository  : https://github.com/anandhakumarpalanisamy/fabric_node_sdk_helper.git 
      - update the url ip addresses of orderer, peer2, orgca, tlsca (4 places).
      - update it with your prime manager's ip address
      
  4.  ## Retrieve hyperledger fabric tls certificates of 'orderer' and 'peer2'
      #### (Replace ip address with your fabric prime manager's ip address)
        - cd smart_energy_app/fabric_node_sdk_helper
        - **Execute  Command :** bash get_tls_certificates.sh
      #### (OR)
        - scp -r root@178.62.207.235:/root/hlft-store/orderer/tls-msp/tlscacerts/tls-tlsca-7054.pem .smart_energy_app/fabric_node_sdk_helper/hlft-store/orderer/tls-msp/tlscacerts/tls-tlsca-7054.pem

        - scp -r root@178.62.207.235:/root/hlft-store/peer2/tls-msp/tlscacerts/tls-tlsca-7054.pem .smart_energy_app/fabric_node_sdk_helper/hlft-store/peer2/tls-msp/tlscacerts/tls-tlsca-7054.pem
         
         
        
   5. ## Start App
        - **Execute  Command :** node app.js
