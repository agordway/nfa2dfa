/*
CS 461
Homework 1
NFA to DFA

Adam Ordway
9/6/2017

*/


var data = new Object;          // Holds all input file data
var dfa = new Object;

dfa.states = [];

main = function(){
	console.log("reading NFA ... done.\n");
	console.log("creating corresponding DFA ...");
	
	findE();
	console.log(JSON.stringify(data));
	var bool = true;
	//while(bool){
		console.log("##############################");
		console.log("Main Loop");
		console.log("##############################");
		bool = getTranStates();
	//}

	console.log("done.");

}

findE = function(state){
	console.log('  ----  In FindE  ----  ');
	var result = [];
	var touched = [];
	if(dfa.states.length == 0){
		console.log("+ init state +");
		if(data.states[0].E){
			var a = [data.initialState]; 
			var tmp = {
				s: a.concat(data.states[0].E),
				touch: false
			};
			addState(tmp);
		}else{
			var tmp = {
				s: [ data.initialState ],
				touch: false
			};
			addState(tmp);
		}
	}else if(state){

		result.push(state);

		for(var i = 0; i < result.length; i++){
			if(data.states[result[i]-1].E){
				for(var j = 0; j < data.states[result[i]-1].E.length; j++){
					result = result.concat(data.states[result[i]-1].E[j]);
				}
			}
		}

		/*for(var s = 0; s < state.length; s++){
			result = result.concat(data.states[state-1].E);
		}
		console.log("result before recursion: " + result);
		for(var i = 0; i < result.length; i++){
			if(data.states[result[i]-1]){
				if(data.states[result[i]-1].E){
					result = result.concat(findE(result[i]));
				}
			}
		}
		console.log("result after recursion: " + result);*/

		return result;
	}else{
		return null;
	}
}

addState = function(state){
	dfa.states.push(state);
	console.log("new DFA state:\t" + dfa.states.length + "\t-->\t{" + dfa.states[dfa.states.length - 1].s + "}");
}

getTranStates = function(){
	for(var i = 0; i < dfa.states.length; i++){
		console.log("______ DFA States Loop ______");
		if(!dfa.states[i].touch){
			if(dfa.states[i].s){
				var result = [];
				//loop through state list
				for(var j = 0; j < dfa.states[i].s.length; j++){
					console.log("		---- DFA states[i].s Loop ---- ");
					for(var k = 0; k < data.transitionTypes.length-1; k++){
						console.log("			---- transition Types Loop ---- ");
						if(data.states[dfa.states[i].s[j]-1][data.transitionTypes[k]]){
						//var say = data.states[dfa.states[i].s[j]-1].E;
						//console.log("				->>>> findE:  " + say);
						//var eList = findE(data.states[dfa.states[i].s[j]-1]);
						//var eList = findE(dfa.states.s[j]-1);
							console.log("RESULT PUSH: " + data.states[dfa.states[i].s[j]-1][data.transitionTypes[k]]);
							result.push(data.states[dfa.states[i].s[j]-1][data.transitionTypes[k]]);
						//if(eList.length > 0){
							//result = result.concat(eList);
							//console.log(eList + "     +++++++");
						//}
						}
					}
				}
				for(var a = 0; a < result.length; a++){
					tmpResult = [];
					for(var b = 0; b < result[a].length; b++){
						//if(findE(result[a][b])){
							tmpResult = tmpResult.concat(findE(result[a][b]));
						//}
					}
					//result[a] = tmpResult;
					var tmp = {
						s: tmpResult,
						touch: false
					};
					addState(tmp);
				}

			}
			dfa.states[i].touch = true;
		}else{
			break;
		}
	}
	return false;
}

printDFA = function(){
	
}

parseList = function(string){
	if(string == '{}'){
		return null;
	}
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
	data.states = [];
    rl.on('line', function(line){
		
		switch(lineNo){
			case 0:		// set initial state
				var str = line.split(' ');
				data.initialState = parseInt(str[str.length - 1]);
				break;

			case 1:		// set final states
				var str = line.split(' ');
				var strNums = str[str.length-1];
				data.finalStates = parseList(strNums);
				break;

			case 2:		// set total states
				var str = line.split(' ');
				data.totalStates = parseInt(str[str.length - 1]);
				break;

			case 3:		// set transition types
				var str = line.split(' ');
				data.transitionTypes = [];
				for(var i = 1; i < str.length - 1; i++){
					if(str[i] != ''){
						data.transitionTypes.push(str[i]);
					}
				}
				break;

			default:	//set states
				if(!data.states){
					data.states = [];
				}
				var str = line.split(' ');
				transitions = [];
				for(var i = 1; i < str.length - 1; i++){
					if(str[i] != ''){
						transitions.push(str[i]);
					}
				}
				var tmp = {};
				for(var i = 0; i < transitions.length; i++){
					var list = parseList(transitions[i]);
					tmp[data.transitionTypes[i]] = list;
				}
				data.states.push(tmp);

		}
		
		lineNo++;
    }).on('close', function(){
		main();
	});

};

setData(data);




