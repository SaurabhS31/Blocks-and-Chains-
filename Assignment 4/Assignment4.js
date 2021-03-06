const prompt = require('prompt-sync')();
const NodeRSA=require('node-rsa');
const fs = require('fs');
const pem = require('pem-file');
const crypto = require('crypto');
const readline = require('readline');
const now = require('nano-time');
const Transaction = require("D:\\Desktop\\Blockchain\\Transaction.js");
const Output = require("D:\\Desktop\\Blockchain\\Output.js");
const Input = require("D:\\Desktop\\Blockchain\\Input.js");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter the file path:", file => {
    // TODO: Log the answer in a database
let ans=file;
str = fs.readFileSync(ans);
let hash = crypto.createHash('sha256').update(str).digest('hex');
hash= hash.toString();
console.log(hash);

let start = 0;
let txn= new Transaction;
const val = readInt(str, start, start + 8);
txn.timestamp = val;
start += 8;
txn.numInputs = readInt(str, start, start+4);
start += 4;

console.log(txn.numInputs);
for (let i = 0; i < txn.numInputs; ++i)
    {
        let input = new Input;
        input.txnID = str.toString("hex", start, start + 32);
        start += 32;
        input.index = readInt(str, start, start + 4);
        start += 4;
        input.sigLength = readInt(str, start, start + 4);
        start += 4;
        input.sig = str.toString("hex", start, start + input.sigLength);
        start += input.sigLength;
        txn.pushInputs(input);
    }

    txn.numOutputs = readInt(str, start, start + 4);
    start += 4;
    
    for (let i = 0; i < txn.numOutputs; ++i)
    {
        let output = new Output;
        output.coins = readInt(str, start, start + 8);
        start += 8;
        output.pubKeyLen = readInt(str, start, start + 4);
        start += 4;
        output.pubKey = str.toString("utf-8", start, start + output.pubKeyLen);
        start += output.pubKeyLen;
        txn.pushOutputs(output);
    }
    console.log(`\nTimestamp: ${txn.timestamp}\n`);
    console.log(`Transaction ID : ${hash}\n`);
    console.log(`Number of inputs: ${txn.numInputs}\n`);

    let inputs = txn.getInputs();
    let i = 1;
    for(let input of inputs)
    {
        console.log(`Input ${i}:`);
        console.log(`Transaction ID: ${input.txnID}`);
        console.log(`Index: ${input.index}`);
        console.log(`Length of Signature: ${input.sigLength}`);
        console.log(`Sign: ${input.sig}\n`);
        i++;
    }

    console.log(`Number of outputs: ${txn.numOutputs}\n`); 

    let outputs = txn.getOutputs();
    i = 1;
    for(let output of outputs)
    {
        console.log(`   Output ${i}:`);
        console.log(`       Number of coins: ${output.coins}`);
        console.log(`       Length of public Key: ${output.pubKeyLen}`);
        console.log(`       Public Key: ${output.pubKey}\n`);
        i++;
    }
rl.close();
});


function readInt(str, start, end)
{
    let size = end - start;
    if(size === 4)
    {
        let ans = 0;
        for(let i = 0; i < size; ++i)
        {
            ans = ans << 8;
            ans += str[i + start];
        }
        return ans;
    }

    else
    {
        let ans = 0n;
        for (let i = 0; i < size; ++i)
        {
            ans = ans * 256n;
            ans += BigInt(str[i+start])
        }
        return ans;
    }
}