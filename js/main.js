"use strict"
const addTask = document.getElementById("add-task-btn");

const elemUl = document.getElementById("parentLi");

const taskText = document.getElementById("input-task-text");

const arrPropAdd = [
    {opacity: "0", left: "3rem"},
    {opacity: "1", left: "0"}
];
const arrPropRem = [
    {opacity: "1", left: "0"},
    {opacity: "0", left: "-5rem"}
];
const durProp = {
    duration: 500,
    iterations: 1
};

// check empty OBJ or not
let obj = JSON.parse(window.localStorage.getItem("Tasks"));
if (obj === null) {
    obj = {
        task1: "Example"
    };
    window.localStorage.setItem("Tasks", JSON.stringify(obj));
}


function create_P_Elem(newElemP_f, textP_f, currentText_f) {
    newElemP_f = document.createElement("p");
    textP_f = document.createTextNode(currentText_f);
    newElemP_f.appendChild(textP_f);
    return newElemP_f;
}


// handle window ending load
window.onload = loadingLocalStorage;


function loadingLocalStorage() {
    // load last text in text input
    taskText.value = window.localStorage.getItem("InputValue");

    // check task storage, empty or not
    if (Object.keys(obj).length) {
        for (let key in obj) {

            // get value from local storage
            const valueCreatingElem = obj[key];
            
            // create new P element with text node
            let newElemP, textP;
            newElemP = create_P_Elem(newElemP, textP, valueCreatingElem);

            // create new BUTTON element with classes and text node
            const newElemBtn = document.createElement("button");
            newElemBtn.innerHTML = "&#10005;";
            newElemBtn.classList.add("perform-task");
            newElemBtn.setAttribute("onclick", 
                `delete obj.${key}; ` + 
                "window.localStorage.setItem(\"Tasks\", JSON.stringify(obj)); " +
                "this.parentElement.animate(arrPropRem, durProp); " +
                "setTimeout(() => this.parentElement.remove(), 400);"
            );

            // create new LI element and append children P and BUTTON
            const newElemLi = document.createElement("li");
            newElemLi.appendChild(newElemP);
            newElemLi.appendChild(newElemBtn);

            // in UL, append child LI
            elemUl.appendChild(newElemLi);
        }
    }
}




// handle input typing event 
taskText.addEventListener("input", () => {
    const currentText = taskText.value;
    window.localStorage.setItem("InputValue", currentText);
});



// handle ENTER click for task adding
taskText.addEventListener("keydown", event => {
    const keyName = event.key;
    if (keyName === "Enter") addTask.click();
});



// handle button (add task) click
addTask.addEventListener("click", () => {
    
    // clean input value storage
    window.localStorage.removeItem("InputValue");

    // define NULL values or NO NULL values
    let indexCreatingElem = 1;
    for (let key in obj) {
        if (obj.hasOwnProperty(`task${indexCreatingElem}`)) indexCreatingElem++;
        else break;
    }

    // take input value
    const currentText = taskText.value;

    //check input, empty or not
    if (currentText.trim() !== "") { 

        // create new P element with text node
        let newElemP, textP;
        newElemP = create_P_Elem(newElemP, textP, currentText);

        // create new BUTTON element with classes and text node
        const newElemBtn = document.createElement("button");
        newElemBtn.innerHTML = "&#10005;";
        newElemBtn.classList.add("perform-task");
        newElemBtn.setAttribute("onclick", 
            `delete obj.task${indexCreatingElem}; ` + 
            "window.localStorage.setItem(\"Tasks\", JSON.stringify(obj)); " +
            "this.parentElement.animate(arrPropRem, durProp); " +
            "setTimeout(() => this.parentElement.remove(), 400);"
        );

        // create new LI element and append children P and BUTTON
        const newElemLi = document.createElement("li");
        newElemLi.appendChild(newElemP);
        newElemLi.appendChild(newElemBtn);

        // in UL, append child LI
        elemUl.appendChild(newElemLi);

        // animation adding
        newElemLi.animate(arrPropAdd, durProp);

        // Clean text input after create new task
        taskText.value = "";

        // Save values in local storage
        obj[`task${indexCreatingElem}`] = currentText;
        window.localStorage.setItem("Tasks", JSON.stringify(obj));
    }

    else alert("Invalid input!");
});


