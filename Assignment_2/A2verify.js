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
var signature=prikey.sign(unencrypted,'utf8');
console.log(signature);
//fs.writeFileSync("sign.pem", signature);

//VERIFICATION
const encrypted_text=prompt("Enter the Encrypted text:","");
const pubkeydata=fs.readFileSync('public1.pem','utf8');
const encrypted = Buffer.from(encrypted_text, "utf-8");
console.log(pubkeydata);
const pubkey = new NodeRSA([pubkeydata]);
var info = pubkey.verify(encrypted,signature,'utf8','utf8')
if (info === true) console.log("Signature Verified!");
else console.log("Verification Failed");
//var encrypted_text=key.encrypt(unencrypted_text,'hex');
