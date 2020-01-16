#!/bin/bash
set -x #echo on

IP_ADDRESS="178.62.207.235"
REMOTE_MACHINE_ORDERER_TLS_CERT_FILE="/root/hlft-store/orderer/tls-msp/tlscacerts/tls-tlsca-7054.pem"
REMOTE_MACHINE_PEER2_TLS_CERT_FILE="/root/hlft-store/peer2/tls-msp/tlscacerts/tls-tlsca-7054.pem"
LOCAL_ORDER_TLS_CERT_FILE="./hlft-store/orderer/tls-msp/tlscacerts/tls-tlsca-7054.pem"
LOCAL_ORDER_PEER2_CERT_FILE="./hlft-store/peer2/tls-msp/tlscacerts/tls-tlsca-7054.pem"

scp -r root@$IP_ADDRESS:$REMOTE_MACHINE_ORDERER_TLS_CERT_FILE $LOCAL_ORDER_TLS_CERT_FILE &&
scp -r root@$IP_ADDRESS:$REMOTE_MACHINE_PEER2_TLS_CERT_FILE $LOCAL_ORDER_PEER2_CERT_FILE