
//dependencies 
//DEV TOOLS

//globals - APP DATA
let global_toDoData;
let backgroundImageURLS

//globals - LAYOUT
let pageWidth;
let pageHeight;
let pageOrientation = "portrait"; //landscape, portrait (default), square



//initialisation function.
async function letsGo() {
    console.log("==== LET'S GO! ====")
    await initialise_toDoListData();
    setLayoutVariables();
    generateMyToDoList(global_toDoData);
    await initialise_backgroundImages();
    listen();
    setInterval(pollForUpdates, 30000);
}

async function pollForUpdates() {
    const serverData = await retrieveDataFromServer();
    if (!serverData) return;

    const normalize = arr => JSON.stringify(arr.map(item => ({
        description: item.description,
        complete: item.complete,
        priority: item.priority,
        timeCreated: item.timeCreated
    })));

    if (normalize(serverData) !== normalize(global_toDoData)) {
        console.log("Remote data changed — refreshing list");

        // shrink out existing items
        let cntr = document.getElementById("toDoList_ctnr");
        Array.from(cntr.children).forEach(elem => animateShrinkDraggedElement(elem));
        await pauseFor(400);

        // rebuild with fresh data
        let result = [];
        serverData.forEach(e => result.push(new ToDoItem(e)));
        global_toDoData = result;
        cntr.innerHTML = "";
        generateMyToDoList(global_toDoData);

        // fade new items in
        Array.from(cntr.children).forEach(elem => elem.classList.add("toDoList_item_ctnr_invisible"));
        await pauseFor(0);
        Array.from(cntr.children).forEach(elem => animateSlowRestore(elem));
    }
}

//set globals in reference to current window size
function setLayoutVariables(){
    pageWidth = window.innerWidth;
    pageHeight = window.innerHeight;
    document.documentElement.style.setProperty('--pageWidth', pageWidth+"px");
    document.documentElement.style.setProperty('--pageHeight', pageHeight+"px");

    if(pageWidth > pageHeight * 1.1){pageOrientation = "landscape"}
    else if (pageWidth < pageHeight * 0.95 ){pageOrientation = "portrait"}
    else {pageOrientation = "square"}

    console.log("page orintation is: ", pageOrientation);
}

//resize function to handle responsive design within the DOM
function windowResized() {
    console.log("window resized")
    setLayoutVariables() 
}

//Event listeners at Initialisation 
// (elem specific events can be found in elem constructors)
function listen(){
    window.addEventListener('resize', (_) => {
        console.log("resize!")
        setLayoutVariables();

    })
    document.getElementById("newItem_add").addEventListener("click", (_) => {
        let inputElem = document.getElementById("newItem_input");
        let theString = inputElem.value;
        console.log(theString);
        addNewToDoItem(theString);
        
    });
    document.getElementById('newItem_input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('newItem_add').click();
        }
    });

}











