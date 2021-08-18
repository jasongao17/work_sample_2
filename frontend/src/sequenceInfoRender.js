export function renderSequenceInfo (res) {
    if (!res || res.length === 0 || (Object.keys(res).length === 0 || res === "")) return "";
        return parseData(res);
}

let g = "";

// remember to add enough spaces
function parseData(Json) {
    let listOfCalls = JSON.parse(JSON.stringify(Json));; // need to be changed when read from server
    let s = "sequenceDiagram\n";
    let currentActive = [];
    for (let i in listOfCalls) {
        let currentCall = listOfCalls[i];
        if (currentCall["type"] === "none") {
            recursiveCall(currentCall, currentActive);
            s = s + g;
        } else if (currentCall["type"] === "loop") {
            s = s + getLevel(1) + "loop\n";
            recursiveCall(currentCall, currentActive);
            s = s + g;
            s = s + getLevel(1) + "end\n";
        } else if (currentCall["type"] === "opt") {
            s = s + getLevel(1) + "opt\n";
            recursiveCall(currentCall, currentActive);
            s = s + g;
            s = s + getLevel(1) + "end\n";
        } else if (currentCall["type"] === "alt") {
            s = s + getLevel(1) + "alt\n";
            recursiveCall(currentCall, currentActive);
            s = s + g;
            s = s + getLevel(1) + "end\n";
        } else if (currentCall["type"] === "self") {
            s = s + getLevel(1) + "rect rgba(0, 0, 255, .1)" + "\n";
            s = s + getLevel(1) + "Note left of " + currentCall["callerClass"] + ": Recursive call"+"\n";
            recursiveCall(currentCall, currentActive);
            s = s + g;
            s = s + getLevel(1) + "end\n";
        } else {
            console.log("Internal Error");
        }
        currentActive = [];
        g = "";
    }

    console.log(s);

    return s;
}




function recursiveCall(currentCall, currentActive) {
    // when there is no further call, we will do function call and return immediately
    if (currentCall["call"].length === 0) {
        if (currentCall["type"] === "self") {
            g = g + getLevel(1) + "rect rgba(0, 0, 255, .1)" + "\n";
            g = g + getLevel(1) + "Note left of " + currentCall["callerClass"] + ": Recursive call"+"\n";
        }
        g = g + getLevel(3) + activateParseHelper(currentCall, currentActive);
        g = g + getLevel(3) + deactivateParseHelper(currentCall, currentActive);
        if (currentCall["type"] === "self") {
            g = g + getLevel(1) + "end\n";
        }
        return;
    }
    
    if (currentCall["type"] === "none" || currentCall["type"] === "self") {
        g = g + activateParseHelper(currentCall,currentActive);
    }

    // recursively evaluate anything inside the call
    for (let i in currentCall["call"]) {
        if (currentCall["call"][i]["type"] === "none") {
            recursiveCall(currentCall["call"][i], currentActive);
        } else if (currentCall["call"][i]["type"] === "loop") {
            // if we find loop in call, we will add a frame, and still recursive evaluate.
            g = g + getLevel(1) + "loop\n";
            recursiveCall(currentCall["call"][i], currentActive);
            g = g + getLevel(1) + "end\n";
        } else if (currentCall["call"][i]["type"] === "self") {
            // recursive inside some call
            console.log(1234556);
            g = g + getLevel(1) + "rect rgba(0, 0, 255, .1)" + "\n";
            g = g + getLevel(1) + "Note left of " + currentCall["call"][i]["callerClass"] + ": Recursive call"+"\n";
            recursiveCall(currentCall["call"][i], currentActive);
            g = g + getLevel(1) + "end\n";
        } else if (currentCall["call"][i]["type"] === "alt") {
            // will only be called when alt is nested in the calls of outer function
            g = g + getLevel(1) + "alt\n";
            recursiveConditionHelper(currentCall["call"][i]["call"], currentActive);
            g = g + getLevel(1) + "end\n";
        } else if (currentCall["call"][i]["type"] === "opt") {
            g = g + getLevel(1) + "opt\n";
            recursiveConditionHelper(currentCall["call"][i]["call"], currentActive);
            g = g + getLevel(1) + "end\n";
        } else {
            // special structure of condition
            // if we have alt, for every array except first one, we should add an else before evaluating.
            if (i != 0 && currentCall["type"] === "alt") {
                g = g + getLevel(1) + "else\n";
            }
            for (let j in currentCall["call"][i]) {
                // if we find nested condition in each branch, we want to add small frame to it
                if (currentCall["call"][i][j]["type"] === "opt") {
                    g = g + getLevel(1) + "opt\n";
                } else if (currentCall["call"][i][j]["type"] === "alt") {
                    g = g + getLevel(1) + "alt\n";
                }
                // evaluate functions in each branch
                recursiveCall(currentCall["call"][i][j], currentActive);
                if (currentCall["call"][i][j]["type"] === "opt" || currentCall["call"][i][j]["type"] === "alt") {
                    g = g + getLevel(1) + "end\n";
                }
            }
        }
    } 
    if (currentCall["type"] === "none" || currentCall["type"] === "self") {
        g = g + getLevel(3) + deactivateParseHelper(currentCall,currentActive);
    }
}

function recursiveConditionHelper(branch, currentActive) {
    for (let j = 0; j < branch.length; j++) {
        for (let q = 0; q < branch[j].length; q++) {
            console.log(branch[j][q]);
            recursiveCall(branch[j][q], currentActive);
        }
        if (j !== branch.length - 1) {
            g = g + getLevel(1) + "else\n";
        }
    }
}

function activateParseHelper(currentCall, currentActive) {
    // for type none/self only
    // flag means do we need to activate caller, usually we don't want to activate caller unless we are in outest layer of call
    // if we activate caller all the time, we will have double bars for every function call. We only want to have double bars when caller and callee are same class.
    let temp = "";
    let flag = false;
    if (currentCall["callerClass"] === currentCall["calleeClass"]) {
        flag = true;
    }

    // means we are on outest layer
    if (currentActive.length === 0) {
        flag = true;
    }

    if (flag) {
        temp = temp + getLevel(3) + "activate " + strip(currentCall["callerClass"]) + "\n";
        currentActive.push(currentCall["callerClass"]);
    }
    temp = temp + getLevel(3) + "activate " + strip(currentCall["calleeClass"]) + "\n";
    currentActive.push(currentCall["calleeClass"]);

    temp = temp + getLevel(3) + strip(currentCall["callerClass"]) + " ->> " + strip(currentCall["calleeClass"]) + ":";
    let method = getLevel(1) + strip(currentCall["callerName"]) + "(";
    let params = currentCall["param"];
    for (let i = 0; i < params.length; i++) {
        method = method + currentCall["param"][i]["type"] + " " +  currentCall["param"][i]["name"];
        if (i !== currentCall["param"].length - 1) {
            method = method + ",";
        }
    }
    method = method + ")\n";
    method = trimString(method);

    temp = temp + method + "\n";

    return temp;
}

function deactivateParseHelper(currentCall, currentActive) {
    let temp = "";
    let flag = false;
    // Since we know when caller and callee are from same class, they both must be activated  
    if (currentCall["callerClass"] === currentCall["calleeClass"]) {
        flag = true;
    }
    // When we reach the outest layer of nested calls, we will want to remove both active caller and callee
    if (currentActive.length === 2) {
        flag = true;
    }
    if (flag) {
        if (currentActive.length === 2) {
            // no return dash when caller and callee are from same class.
            if (currentCall["callerClass"] != currentCall["calleeClass"]) {
                temp = temp + getLevel(3) + strip(currentCall["calleeClass"]) + " -->> " + strip(currentCall["callerClass"]) + ":" + getLevel(1) + strip(currentCall["returnType"]) + "\n";
            }
        }
        temp = temp + getLevel(3) + "deactivate " + strip(currentCall["callerClass"]) + "\n";
        currentActive.pop();
    }
    // draw line before deactivate, so the dash line will be kept within lifeline
    if (currentActive.length != 1) {
        // no return dash when caller and callee are from same class.
        if (currentCall["callerClass"] != currentCall["calleeClass"]) {
            temp = temp + getLevel(3) + strip(currentCall["calleeClass"]) + " -->> " + strip(currentCall["callerClass"]) + ":" + getLevel(1) + strip(currentCall["returnType"]) + "\n";
        }
    }
    temp = temp + getLevel(3) + "deactivate " + strip(currentCall["calleeClass"]) + "\n";
    currentActive.pop();

    return temp;
}


function strip(name) {
   if (name.indexOf("<") !== -1) {
      name = name.substring(0, name.indexOf("<"));
   }
   return name;
}


function getLevel(level) {
    let spaces = "";
    while (level > 0) {
        spaces += "  ";
        level--;
    }
    return spaces;
}

// trim down string that are too long
function trimString(s) {
    let str = String(s);
    if (str.length > 58) {
        str = str.substring(0, 58);
        str = str + "...";
        return str;
    }
    return str;
}
