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
dfa.seen = [];

main = function(){
	console.log("reading NFA ... done.\n");
	console.log("creating corresponding DFA ...");	
	
	var init = [];//setTranStates(data.initialState);
	//console.log(init);
	init = init.concat(findE(data.initialState));
	init.sort(sortNumber);
	dfa.seen = init;
	addState(init);

	getTranStates();

	console.log("done.");

}

findE = function(state){
	//console.log('  ----  In FindE  ----  ');
	var result = [];
	if(state){
		//console.log("inner");
		result.push(state);
		for(var i = 0; i < result.length; i++){
			//console.log("inner - 1");
			if(data.states[result[i]-1].E){
				//console.log("inner - 1: if");
				for(var j = 0; j < data.states[result[i]-1].E.length; j++){
					//console.log("inner - 2");
					if(!result.includes(data.states[result[i]-1].E[j])){
						result = result.concat(data.states[result[i]-1].E[j]);
					}else{
						//return result;
					}
				}
			}
		}
		return result;
	}else{
		return null;
	}
}

setTranStates = function(state){
	var result = [];
	if(state.constructor === Array){
		for(var i = 0; i < state.length; i++){
			for(var j = 0; j < data.transitionTypes.length-1; j++){
				if(data.states[state[i]-1][data.transitionTypes[j]]){
					result.push(data.states[state[i]-1][data.transitionTypes[j]]);
				}
			}
		}
	}else{
		for(var j = 0; j < data.transitionTypes.length-1; j++){
			if(data.states[state-1][data.transitionTypes[j]]){
				result.push(data.states[state-1][data.transitionTypes[j]]);
			}
		}
	}

		return result;
}

getTranStates = function(){
	for(var i = 0; dfa.seen.length < data.totalStates; i++){
		//console.log("______ DFA States Loop ______");
		if(dfa.states[i] && !dfa.states[i].touch){
			if(dfa.states[i].s){
				var result = [];
				//loop through state list
				result = result.concat(setTranStates(dfa.states[i].s));

				for(var a = 0; a < result.length; a++){
					tmpResult = [];
					for(var b = 0; b < result[a].length; b++){
						tmpResult = tmpResult.concat(findE(result[a][b]));
					}
					
					//Check to make sure there are not dups
					tmpResult.sort(sortNumber);
					var is_inList = false;
					for(var o = 0; o < dfa.states.length; o++){		//search for dups dfa.states
						if(tmpResult.equals(dfa.states[o].s)){
							is_inList = true;
							break;
						}
					}
					
					//If not a dup
					if(!is_inList){
						//add to seen
						dfa.seen = dfa.seen.concat(tmpResult);
						dfa.seen = dfa.seen.filter(function(i, p){
							return dfa.seen.indexOf(i) == p;
						});

						addState(tmpResult);
					}

				}

			}
			dfa.states[i].touch = true;
		}else{
			break;
		}
	}
}

printDFA = function(){
	
}

addState = function(s){
	var state = {
		s: s,
		touch: false
	};

	dfa.states.push(state);
	console.log("new DFA state:\t" + dfa.states.length + "\t-->\t{" + dfa.states[dfa.states.length - 1].s + "}");
}

parseList = function(string){
	if(string == '{}'){
		return null;
	}
	var a = string.slice(1, -1);
	var b = a.split(',').map(Number);
	return b;
};

sortNumber = function(a,b){
	return a - b;
}

Array.prototype.equals = function(a){
	if(!a){
		return false;
	}
	if(this.length != a.length){
		return false;
	}
	for(var i = 0, l = this.length; i < l; i++){
		if(this[i] instanceof Array && a[i] instanceof Array){
			if(!this[i].equals(a[i])){
				return false;
			}
		}else if(this[i] != a[i]){
			return false;
		}
	}
	return true;
}
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

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
