/*
CS 461
Homework 1
NFA to DFA

Adam Ordway
9/6/2017

*/

var data = {};          // Holds all input file data

setData = function(){
    var readline = require('readline');
    var r = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    r.on('line', function(line){
        console.log(line);
    });
};

setData();
