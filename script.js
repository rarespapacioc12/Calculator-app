function createButton(text, id){
    const calculator = document.getElementById("calculator");
    const button = document.createElement("button");
    button.id = id;
    button.style.gridArea = id;
    button.style.backgroundColor = "#cdd2d4";
    button.style.borderRadius = "15px";
    button.innerHTML = text;
    button.style.display = "flex";
    button.style.flexDirection = "row";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";
    button.style.padding = "20px";
    button.style.fontSize = "20px";
    button.style.fontFamily = "Verdana"
    calculator.appendChild(button);
}

function handleArithmeticOperation(operand1, operand2, operator){
    switch(operator){
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if(operand2 == 0){
                return 'Err';
            }
            return operand1 / operand2;
    }
}

function handleUnaryOperation(operand, operation){
    switch(operation){
        case 'square':
            return operand * operand;
        case 'root':
            if(operand < 0){
                return 'Err';
            }
            return Math.sqrt(operand);
        case 'inverse':
            if(operand == 0){
                return 'Err';
            }
            return 1 / operand;
    }
}

function handleError(){
    if(screen.innerHTML === 'Err'){
        setTimeout(() => {
            screen.innerHTML = '0';
            sessionStorage.setItem('lastValue', '0');
            sessionStorage.removeItem('lastOperation');
        }, 500);
    }
}

window.onload = () => {
    const div = document.createElement("div");
    div.id = "container";
    div.style.height = "100vh";
    div.style.width = "100vw";
    div.style.backgroundColor = "#ebe4ea";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    document.body.appendChild(div);

    const calculator = document.createElement("div");
    calculator.id = "calculator";
    calculator.style.width = "500px";
    calculator.style.height = "600px";
    calculator.style.backgroundColor = "#a19ca0";
    calculator.style.borderRadius = "30px";
    calculator.style.border = "5px solid black";
    calculator.style.display = "grid";
    calculator.style.gridTemplateColumns = "repeat(4, 1fr)"
    calculator.style.gridTemplateRows = "2fr repeat(5, 1fr) 1fr";
    calculator.style.gridTemplateAreas = `"screen screen screen screen"
    "inverse square root division"
    "btn7 btn8 btn9 multiplication"
    "btn4 btn5 btn6 subtraction"
    "btn1 btn2 btn3 addition"
    "point btn0 delete equal"
    "clear clear clear clear"`;
    calculator.style.gap = "10px";
    calculator.style.padding = "30px";
    div.appendChild(calculator);

    const screen = document.createElement("div");
    screen.id = "screen";
    screen.style.gridArea = "screen";
    screen.style.backgroundColor = "#9dddf5";
    screen.style.borderRadius = "30px";
    screen.innerHTML = "0";
    screen.style.display = "flex";
    screen.style.flexDirection = "column";
    screen.style.justifyContent = "flex-end";
    screen.style.alignItems = "flex-end";
    screen.style.padding = "20px";
    screen.style.fontSize = "40px";
    screen.style.fontFamily = "Verdana"
    calculator.appendChild(screen);

    createButton("1/x", "inverse");
    createButton("<var>x<sup>2</sup></var>", "square");
    createButton("&#8730x", "root");
    createButton("/", "division");
    createButton("7", "btn7");
    createButton("8", "btn8");
    createButton("9", "btn9");
    createButton("*", "multiplication");
    createButton("4", "btn4");
    createButton("5", "btn5");
    createButton("6", "btn6");
    createButton("-", "subtraction");
    createButton("1", "btn1");
    createButton("2", "btn2");
    createButton("3", "btn3");
    createButton("+", "addition");
    createButton(".", "point");
    createButton("0", "btn0");
    createButton("del", "delete");
    createButton("=", "equal");
    createButton("C", "clear");

    sessionStorage.setItem('lastValue', '0');
    sessionStorage.removeItem('lastOperation');
    document.body.addEventListener('keydown', (e) => {
        if(e.key === '+' || e.key === '*' || e.key === '-' || e.key === '/'){
            if(sessionStorage.getItem('lastOperation') === null){
                sessionStorage.setItem('lastOperation', e.key);
                sessionStorage.setItem('lastValue', screen.innerHTML);
                screen.innerHTML = '0';
            }
            else{
                let operand1 = parseFloat(sessionStorage.getItem('lastValue'));
                let operand2 = parseFloat(screen.innerHTML);
                let operator = sessionStorage.getItem('lastOperation');
                let result = handleArithmeticOperation(operand1, operand2, operator);
                screen.innerHTML = String(result);
                sessionStorage.setItem('lastOperation', e.key);
                sessionStorage.setItem('lastValue', screen.innerHTML);
            }
            handleError();
            return;
        }
        switch(e.keyCode){
            case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57:
                screen.innerHTML = screen.innerHTML === '0' ? e.key : `${screen.innerHTML}${e.key}`;
                break;
            case 67:
                screen.innerHTML = '0';
                sessionStorage.setItem('lastValue', '0');
                sessionStorage.removeItem('lastOperation');
                break;
            case 8:
                screen.innerHTML = (screen.innerHTML.length === 1) ? '0' : screen.innerHTML.substring(0, screen.innerHTML.length - 1);
                break;
            case 190:
                if(!screen.innerHTML.includes('.')){
                    screen.innerHTML = `${screen.innerHTML}${e.key}`;
                }
                break;
            case 187: case 13:
                if(sessionStorage.getItem('lastOperation') !== null){
                    let operand1 = parseFloat(sessionStorage.getItem('lastValue'));
                    let operand2 = parseFloat(screen.innerHTML);
                    let operator = sessionStorage.getItem('lastOperation');
                    let result = handleArithmeticOperation(operand1, operand2, operator);
                    screen.innerHTML = String(result);
                    sessionStorage.removeItem('lastOperation', e.key);
                    sessionStorage.setItem('lastValue', screen.innerHTML);
                }
                handleError();
                break;
        }
    });

    calculator.addEventListener('click', (e) => {
        switch(e.target.id){
            case 'btn0': case 'btn1': case 'btn2': case 'btn3': case 'btn4': case 'btn5': case 'btn6': case 'btn7': case 'btn8': case 'btn9':
                screen.innerHTML = screen.innerHTML === '0' ? e.target.innerHTML : `${screen.innerHTML}${e.target.innerHTML}`;
                break;
            case 'clear':
                screen.innerHTML = '0';
                sessionStorage.setItem('lastValue', '0');
                sessionStorage.removeItem('lastOperation');
                break;
            case 'delete':
                screen.innerHTML = (screen.innerHTML.length === 1) ? '0' : screen.innerHTML.substring(0, screen.innerHTML.length - 1);
                break;
            case 'division': case 'multiplication': case 'subtraction': case 'addition':
                if(sessionStorage.getItem('lastOperation') === null){
                    sessionStorage.setItem('lastOperation', e.target.innerHTML);
                    sessionStorage.setItem('lastValue', screen.innerHTML);
                    screen.innerHTML = '0';
                }
                else{
                    let operand1 = parseFloat(sessionStorage.getItem('lastValue'));
                    let operand2 = parseFloat(screen.innerHTML);
                    let operator = sessionStorage.getItem('lastOperation');
                    let result = handleArithmeticOperation(operand1, operand2, operator);
                    screen.innerHTML = String(result);
                    sessionStorage.setItem('lastOperation', e.target.innerHTML);
                    sessionStorage.setItem('lastValue', screen.innerHTML);
                }
                handleError();
                break;
            case 'point':
                if(!screen.innerHTML.includes('.')){
                    screen.innerHTML = `${screen.innerHTML}${e.target.innerHTML}`;
                }
                break;
            case 'equal':
                if(sessionStorage.getItem('lastOperation') !== null){
                    let operand1 = parseFloat(sessionStorage.getItem('lastValue'));
                    let operand2 = parseFloat(screen.innerHTML);
                    let operator = sessionStorage.getItem('lastOperation');
                    let result = handleArithmeticOperation(operand1, operand2, operator);
                    screen.innerHTML = String(result);
                    sessionStorage.removeItem('lastOperation', e.key);
                    sessionStorage.setItem('lastValue', screen.innerHTML);
                }
                handleError();
                break;
            case 'inverse': case 'square': case 'root':
                if(sessionStorage.getItem('lastOperation') !== null){
                    let operand1 = parseFloat(sessionStorage.getItem('lastValue'));
                    let operand2 = parseFloat(screen.innerHTML);
                    let operator = sessionStorage.getItem('lastOperation');
                    let result = handleArithmeticOperation(operand1, operand2, operator);
                    screen.innerHTML = String(result);
                    sessionStorage.removeItem('lastOperation', e.key);
                    sessionStorage.setItem('lastValue', screen.innerHTML);
                }
                let result = handleUnaryOperation(parseFloat(screen.innerHTML), e.target.id);
                screen.innerHTML = String(result);
                sessionStorage.removeItem('lastOperation', e.key);
                sessionStorage.setItem('lastValue', screen.innerHTML);
                handleError();
        }
    });
}