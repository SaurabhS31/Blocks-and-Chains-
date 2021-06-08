const prompt = require('prompt-sync')();
const NodeRSA=require('node-rsa');
const fs = require('fs');
const pem = require('pem-file');

const prikeydata = fs.readFileSync('private1.pem','utf8');
const prikey = new NodeRSA([prikeydata]);
console.log(prikeydata);

//SIGNING
const unencrypted_text=prompt("Enter the Unencrypted text:","");
const unencrypted = Buffer.from(unencrypted_text, "utf-8");
console.log(unencrypted)
var signature=prikey.sign(unencrypted_text,'utf8');
console.log(signature);
//fs.writeFileSync("sign.pem", signature);
