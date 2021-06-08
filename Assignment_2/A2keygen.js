const prompt = require('prompt-sync')();
const NodeRSA=require('node-rsa');
const openssl = require('openssl-nodejs');
const fs = require('fs');
const pem = require('pem-file');

const key=new NodeRSA({b : 1024});

var public_key=key.exportKey('public');
var private_key=key.exportKey('private');
key.exportKey('public','pem');
key.exportKey('private','pem');
console.log(`key is: ${public_key.toString('hex')} \n ${private_key.toString('hex')}`);
fs.writeFileSync("public1.pem", public_key);
fs.writeFileSync("private1.pem", private_key);