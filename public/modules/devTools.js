console.log("dev tools running");

//displays and interprets the layout variables that structure the page
function displayLayoutVariables(){
    console.log("displaying layout variables");
    
    let widthDisplay = document.getElementById("widthDisplay");
    if (!widthDisplay){
        widthDisplay = document.createElement("div");
        widthDisplay.id = "widthDisplay";
        
        widthDisplay.style.height = 20+"px";
        widthDisplay.style.border = "solid 3px red";
        widthDisplay.style.position = "absolute";
        document.body.appendChild(widthDisplay);
    }
    widthDisplay.style.width = (pageWidth-6)+"px";
    widthDisplay.innerText = "page width is "+pageWidth+"px"
    

    let HeightDisplay = document.getElementById("heightDisplay");
    if(!HeightDisplay){
        HeightDisplay = document.createElement("div");
        HeightDisplay.id = "heightDisplay";
        HeightDisplay.style.width = 20+"px";
        HeightDisplay.style.border = "solid 3px green";
        HeightDisplay.style.position = "absolute";
        document.body.appendChild(HeightDisplay);
    }
    HeightDisplay.style.height = (pageHeight-6)+"px";
    HeightDisplay.innerText = "page Height is "+pageHeight+"px"


    let orientationDisplay = document.getElementById("orientationDisplay")
    if(!orientationDisplay){
        orientationDisplay = document.createElement('div');
        orientationDisplay.id = "orientationDisplay";
        orientationDisplay.style.color = "grey";
        orientationDisplay.style.fontSize = "50px";
        orientationDisplay.style.fontWeight = "strong";
        orientationDisplay.style.padding = "100px 0 0 100px";
        document.body.appendChild(orientationDisplay)
    } 

    let cssBallDisplay = document.getElementById("cssBallDisplay");
    if(!cssBallDisplay){
        cssBallDisplay = document.createElement('div');
        cssBallDisplay.id = "cssBallDisplay";
        cssBallDisplay.classList = "cssBallDisplay";
        cssBallDisplay.innerText = "this is an element responding to one dynamic CSS variable"
        document.body.appendChild(cssBallDisplay)

    }


    orientationDisplay.innerText = pageOrientation;
    
    
}

function tempData(){
    console.log("creating temp data")
    global_toDoData = [];
    global_toDoData.push(new ToDoItem("eat a pie")),
    global_toDoData.push(new ToDoItem("change a nappy")),
    global_toDoData.push(new ToDoItem("contemplate the vastness of space")),
    global_toDoData.push(new ToDoItem("have a healthy little cry"))
}


function devTools(bool){
    if(!bool){return}
    //displayLayoutVariables();
    tempData();
}




function test1(){
    console.log("testing first container")
    getNodeIndex("ctnr_A new To-Do Item")
    console.log("testing first item,")
    getNodeIndex("item_A new To-Do Item")
    console.log("testing third container,")
    getNodeIndex("ctnr_wipe Bede's butt")
    console.log("testing third item,")
    getNodeIndex("item_wipe Bede's butt")
    console.log("testing last container")
    getNodeIndex("ctnr_take a belt of whiskey")

}
function pat(){
    getObjectById("ctnr_Appointment with GP");
    getObjectById("item_Appointment with GP");
    getObjectById("ctnr_Appoinment with GP");
}