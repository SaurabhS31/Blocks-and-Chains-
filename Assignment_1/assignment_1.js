const prompt = require('prompt-sync')();
const crypto = require('crypto');
const str=prompt("Enter the string:","");
var num=1;
var numstr=num.toString();
var xs=str+numstr;
var sha256=crypto.createHash('sha256').update(xs).digest('hex');
var target ='0' + numstr + '0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
while(sha256>=target){
    num=num+1;
    numstr=num.toString();
    xs=str+numstr;
    sha256=crypto.createHash('sha256').update(xs).digest('hex');
}

console.log(`the number is ${num}`);