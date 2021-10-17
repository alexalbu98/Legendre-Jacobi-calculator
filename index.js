const removeElemById = (elemId) => {
    $("body").remove(`#${elemId}`);
};

const ElemExists = (elemId) => {
    if($(`#${elemId}`).length){
        return true;
    }
    return false;
};

const checkIfOptionSelected = () => {
    if(ElemExists("legendre")){
        $("#legendre").remove();
    }

    if(ElemExists("jacobi")){
        $("#jacobi").remove();
    }
};

const insertTemplate = (templateId) =>{
    let temp = document.getElementById(templateId);
    let clone = temp.content.cloneNode(true);
    document.body.appendChild(clone);
};

const setJacobiButtonClickEvent = () => {
    $("#jacobi-button").click(() =>{
        checkIfOptionSelected();
        insertTemplate("jacobi-template")
    });
};

const setLegendreButtonClickEvent = () => {
    $("#legendre-button").click(() =>{
        checkIfOptionSelected();
        insertTemplate("legendre-template")
    });
};

$(document).ready(() => {
    setJacobiButtonClickEvent();
    setLegendreButtonClickEvent();
});