/*
CS 461
Homework 1
NFA to DFA

Adam Ordway
9/6/2017

*/


var data = new Object;          // Holds all input file data

main = function(){
	console.log("Initial State: " + data.initialState);
	console.log("Final States: " + data.finalStates);
}

parseList = function(string){
	var a = string.slice(1, -1);
	var b = a.split(',').map(Number);
	return b;
};

setData = function(data){
	
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin
    });


	var lineNo = 0;
    rl.on('line', function(line){
		
		switch(lineNo){
			case 0:		// set initial state
				data.initialState = parseInt(line[line.length - 1]);
				break;

			case 1:		// set final states
				var str = line.split(' ');
				var strNums = str[str.length-1];
				data.finalStates = parseList(strNums);
				break;

			case 2:		// set total states

				break;

			case 3:		// set state types

				break;

			default:	//set states
				
		}
		
		lineNo++;
    }).on('close', function(){
		main();
	});

};

setData(data);




