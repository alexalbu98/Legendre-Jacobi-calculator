const removeElemById = (elemId) => {
    $("body").remove(`#${elemId}`);
};

const ElemExists = (elemId) => {
    if($(`#${elemId}`).length){
        return true;
    }
    return false;
};

const setError = (text) => {
    $("#resultHelp").text(text);
}

const isNumberPrime = (number) =>{
    let isPrime = true;
    if (number === 1) {
        return false;
    }
    if (number > 1) {
        for (let i = 2; i < number; i++) {
            if (number % i == 0) {
                isPrime = false;
                break;
            }
        }
    }
    if(number <= 0){
        isPrime = false;
    }
    return isPrime;
};


const areJacobiNumAndDenOk = (num, den) => {
    if(num === "" || den === ""){
        setError("Both numerator and denominator must be numeric values");
        return false;
    }
    num = Number(num);
    den = Number(den)
    if(!(den > num > 0) && den % 2 == 0){
        setError("Denominator must be an odd number");
        return false;
    }
    return true;
};

const areLegendreNumAndDenOk = (num, den) => {
    if(num === "" || den === ""){
        setError("Both numerator and denominator must be numeric values");
        return false;
    }
    num = Number(num);
    den = Number(den)
    if(!isNumberPrime(den)){
        setError("Denominator must be a prime number");
        return false;
    }
    return true;
};

const checkIfOptionSelected = () => {
    if(ElemExists("legendre")){
        $("#legendre").remove();
    }

    if(ElemExists("jacobi")){
        $("#jacobi").remove();
    }

    if(ElemExists("symbol-result")){
        $("#symbol-result").remove();
    }
};

const computeSymbol = (a, n) =>{
    let t = 1;
    while(a != 0){
        while( a % 2 == 0){
            a /= 2;
            let r = n % 8;
            if(r == 3 || r == 5){
                t = -t;
            }
        }
        let temp = a;
        a = n;
        n = temp;
        if((a % 4 == 3) && (n % 4 == 3)){
            t = -t;
        }
        a %= n;
    }
    if (n == 1){
        return t;
    }
    else{
        return 0;
    }
}

const calculateLegendreSymbol = (num, den) => {
    if(!areLegendreNumAndDenOk(num, den)){
        return 0;
    }
    setError("");
    return computeSymbol(num, den);
};

const calculateJacobiSymbol = (num, den) => {
    if(!areJacobiNumAndDenOk(num, den)){
        return 0;
    }
    setError("");
    return computeSymbol(num, den);
};

const insertTemplate = (templateId) =>{
    let temp = document.getElementById(templateId);
    let clone = temp.content.cloneNode(true);
    document.body.appendChild(clone);
};

const insertResultTemplate = () =>{
    if(!ElemExists("symbol-result")){
        insertTemplate("result-template");
    }
};

const setJacobiButtonClickEvent = () => {
    $("#jacobi-button").click(() =>{
        checkIfOptionSelected();
        insertTemplate("jacobi-template")
        $("#jacobi-submit").click(JacobiClicked);
    });
};

const setLegendreButtonClickEvent = () => {
    $("#legendre-button").click(() =>{
        checkIfOptionSelected();
        insertTemplate("legendre-template");
        $("#legendre-submit").click(LegendreClicked);
    });
};

const LegendreClicked = () => {
    insertResultTemplate();
    let num = $("#numerator").val();
    let den = $("#denominator").val();
    let result = calculateLegendreSymbol(num, den);
    $("#result").val(result);
    
};

const JacobiClicked = () => {
    insertResultTemplate();
    let num = $("#numerator").val();
    let den = $("#denominator").val();
    let result = calculateJacobiSymbol(num, den);
    $("#result").val(result);
};

$(document).ready(() => {
    setJacobiButtonClickEvent();
    setLegendreButtonClickEvent();
});