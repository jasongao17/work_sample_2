/** 
 * 1. take the json file from the backend passed by app
 * 2. parse the json to what the nomnoml calls "source"
 * 3. give back source to app, and in app call draw function to represent the result on somewhere
 */ 
export function renderClassInfo (res) {
    if (Object.keys(res).length === 0 || res === "") return "";
        return parseData(res);
}

function parseData(Json) {
    let listOfClass = JSON.parse(JSON.stringify(Json)); // need to be changed when read from server
    let s = "classDiagram\n";
    for (let i = 0; i < listOfClass.length; i++) {
        let classInfo = listOfClass[i];

        // classInfo
        let classType = String(classInfo["ClassType"]);
        let className = String(classInfo["Name"]);

        if (className) {
            if (classInfo["TypeParameters"].length !== 0) {
                s = s + getLevel(1) + "class " + className + "~";
                let typeParams = classInfo["TypeParameters"];
                for (let t = 0; t < typeParams.length; t++) {
                    s = s + typeParams[t];
                    if (t !== typeParams.length - 1) {
                        s = s + ",";
                    }
                }
                s = s + "~ {\n";
            } else {
                s = s + getLevel(1) + "class "+ className + " {\n";
            }
            

            if (classType === "Interface") {
                s = s + getLevel(2) + "<<Interface>>" + "\n";
            } else if (classType === "abstract") {
                s = s + getLevel(2) + "<<abstract>>" + "\n";
            } else if (classType === "enumeration") {
                s = s + getLevel(2) + "<<enumeration>>" + "\n";
            }
            
            

            // FieldInfo
            let  fields = classInfo["Fields"];
            for (let j in fields) {
                let singleField = fields[j]; 
                s = s + getLevel(2) + access(singleField["Access"])  + singleField["Type"] + " " + singleField["FieldName"] + "\n";
            }

            // MethodInfo
            let  methods = classInfo["Methods"];
            for (let k in methods){
                let singleMethod = methods[k];
                // Remember to add return type
                // Generic ?
                // Static ? abstract ?
                let params = singleMethod["Param"];
                if (params.length === 0) {
                    s = s + getLevel(2) + access(singleMethod["Access"])  + singleMethod["FuncName"] + "("  + ")"  + "\n";
                } else {
                    s = s + getLevel(2) + access(singleMethod["Access"])  + singleMethod["FuncName"] + "(";
                    for (let a = 0; a < params.length; a++) {
                        s = s + params[a];
                        if (a !== params.length - 1) {
                            s = s + ",";
                        }
                    }
                    s = s + ")\n";
                }
                // s = s + access(singleMethod["Access"])  + singleMethod["FuncName"] + "(" + singleMethod["Param"] + ")"  + "\n";
            }

            s = s + getLevel(1) + "}\n";
        }
    }

    // We generate all calsses first then its dependencies to handle type parameter classes 
    for (let x = 0; x < listOfClass.length; x++) {
        let classInfo = listOfClass[x];
        let className = String(classInfo["Name"]);
        
        if (className) {
            //DependencyInfo -- assume 3 kinds of dependencies exist
            let relationships = classInfo["Relationship"];
            let inheritance = Array.from(relationships["Inheritance"]);
            let implementations = Array.from(relationships["Implementation"]);
            let dependencies = Array.from(relationships["Dependency"]);

            for (let m in inheritance) {
                s = s + getLevel(1) + getClassName(className) + " ..|> " + getClassName(inheritance[m]) + " : inherits" + "\n";
            }

            for (let n in implementations) {
                s = s + getLevel(1) + getClassName(className) + " --|> " + getClassName(implementations[n]) + " : implements" + "\n";
            }

            for (let g in dependencies) {
                if (!inheritance.includes(dependencies[g]) && !implementations.includes(dependencies[g])) {
                    s = s + getLevel(1) + getClassName(className) + " ..> " + getClassName(dependencies[g]) + " : depends" + "\n";
                }
            }
        }
    }

    // console.log(s);

    return s;
}

function getClassName(fullName) {
    return String(fullName).replace("<", "~").replace(">", "~");
}

function getLevel(level) {
    let spaces = "";
    while (level > 0) {
        spaces += "  ";
        level--;
    }
    return spaces;
}

function access(access) {
    switch (access) {
        case "public":
            return "+";
        case "private":
            return "-";
        case "protected":
            return "#";
        case "package":
            return "~";
        default:
            return "";
    }
}

// methodString looks like +getX(int,double,String)
// output: getX
export function methodNameHelper(methodString) {
    let from = 0;
    if (methodString.charAt(0) === "+" || methodString.charAt(0) === "-" || methodString.charAt(0) === "#" || methodString.charAt(0) === "~") {
        from = 1;
    }
    let to = methodString.indexOf("(");
    return methodString.substring(from, to);
}
