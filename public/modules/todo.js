// Module for to do list

//Globals initiated in init.js

//HIGHER ORDER FUNCTIONS
async function addNewToDoItem(string) {
    console.log("adding a new item with the string ", string);
    let obj = {
        "description": string,
        "priority": 0,
        "timeCreated": Date.now(),
        "complete": false
    }
    let newItem = new ToDoItem(obj)
    let listContainer = document.getElementById("toDoList_ctnr");
    let newElem = newItem.generateElem();
    newElem.classList.add("toDoList_item_ctnr_invisible");
    listContainer.insertBefore(newElem, listContainer.children[0]);
    await pauseFor(0);
    animateSlowRestore(newElem);
    highlightTopThree()
    //console.log("complete?")
    global_toDoData.unshift(newItem);
    reorderDataToMatchDom();
    sendDataToServer(global_toDoData);

    //clear input field
    document.getElementById("newItem_input").value = "";
    document.getElementById("newItem_input").placeholder = randofrom(discouragingSentiments);
}

function tickToDoItem(string) {
    console.log("ticking item with the string ", string);
    let elemToMove = document.getElementById("ctnr_" + string);
    console.log("======================");


    console.log("moving this element: ");
    console.log(elemToMove);
    animateShrinkDraggedElement(elemToMove)

    let listContainer = document.getElementById("toDoList_ctnr");
    let destinationIndex = getIndex_topOfTicked(global_toDoData);
    let obj = getObjectByDescription(string);
    obj.complete = true;
    console.log("recreating ticked item to: ", destinationIndex);


    pauseFor(400).then(() => {
        console.log("moving this element: ");
        //remove elem to move from the DOM
        elemToMove.parentNode.removeChild(elemToMove);

        listContainer.insertBefore(obj.generateElem_ticked(), listContainer.children[destinationIndex-1]);

        console.log(global_toDoData)

        console.log("moved");
        console.log(global_toDoData);
        highlightTopThree();
        reorderDataToMatchDom();
        sendDataToServer(global_toDoData);
    });
}
async function reviveToDoItem(IDstring) {
    console.log("reviving item with the string ", IDstring);
    let doToObj = getObjectByDescription(IDstring);
    doToObj.complete = false;
    let cntr2Revive = document.getElementById("ctnr_" + IDstring);
    console.log(cntr2Revive);
    animateShrinkDraggedElement(cntr2Revive);
    let listContainer = document.getElementById("toDoList_ctnr");
    moveObjectToIndex(global_toDoData, doToObj, 3);
    console.log(global_toDoData);

    let revivedElem = doToObj.generateElem()
    revivedElem.classList.add("toDoList_item_ctnr_invisible");
    listContainer.insertBefore(revivedElem, listContainer.children[3]);

    await pauseFor(500);
    listContainer.removeChild(cntr2Revive);
    listContainer.scrollTo({ top: 0, behavior: "smooth" });
    await pauseFor(1000);
    animateSlowRestore(revivedElem);
    reorderDataToMatchDom();
    sendDataToServer(global_toDoData);
}
function permanentlyRemove(string) {
    console.log("removing this item: ", string);
    let elemToRemove = document.getElementById("ctnr_" + string);
    let listContainer = document.getElementById("toDoList_ctnr");
    animateShrinkDraggedElement(elemToRemove);
    listContainer.removeChild(elemToRemove);
    global_toDoData = global_toDoData.filter((e) => e.description !== string);
    dataTOLocalStorage(global_toDoData);
    sendDataToServer(global_toDoData);

}
async function initialise_toDoListData() {
    console.log("loading To-Do data")
    let raw = await retrieveDataFromServer()
    let result = []
    raw.forEach((e) => {
        result.push(new ToDoItem(e));
    });
    global_toDoData = result;
}
function dataTOLocalStorage(data) {
    console.log("saving data")
    let copy = [];
    data.forEach((e) => {
        let obj = {
            "description": e.description,
            "priority": e.priority,
            "timeCreated": e.timeCreated,
            "complete": e.complete
        }
        copy.push(obj)
    })
    let toDo_json = JSON.stringify(copy);
    localStorage.setItem("toDoData", toDo_json);
}

function dataFROMlocalStorage() {
    let toDo_json = localStorage.getItem("toDoData");
    if (!toDo_json) {
        console.log("no data found in local storage");
        return [];
    }
    console.log("retrieved data:");
    let raw = JSON.parse(toDo_json);
    let result = [];
    raw.forEach((e) => {
        result.push(new ToDoItem(e));
    });
    return result;
}


function item_EditMode(idString) {
    console.log("editing this item: ", idString)
    let obj = getObjectByDescription(idString);
    let container = document.getElementById("ctnr_" + idString);
    let item = container.children[1];

    let para = item.children[0];
    let string = para.innerText;

    //style existing item
    item.classList.add("toDoList_item_editing");
    para.style.visibility = "hidden";
   
    //creat temporary input field
    let input = document.createElement("input");
    input.type = "text";
    input.value = string;
    input.id = "editInput_" + idString;
    input.classList = "toDoList_item_editInput";
    item.insertBefore(input, item.children[1]);   
    input.focus();
    
    //prevent unexpected behaviour
    let editBtn = document.getElementById("edit_"+idString)
    editBtn.removeEventListener("click", editBtn.clickHandler)
    item.removeEventListener("dragstart", dnd_dragStartHandler);
    item.draggable = false;

    //handle edit
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            let newDescription = e.target.value;
            if(newDescription.length < 1){newDescription = "some text here?";}
            updateDescription_DOM(item, newDescription)
            updateDescription_DATA(obj, newDescription)
            reorderDataToMatchDom();
            sendDataToServer(global_toDoData);
            editBtn.addEventListener("click", editBtn.clickHandler)
            item.addEventListener("dragstart", dnd_dragStartHandler);
            item.draggable = true;
        }
    });
}


function updateDescription_DOM(item, newDescription){             

    let para =  item.children[0];
    let input = item.children[1];
    let buttons = item.children[2];
    let cntr = item.parentNode;

    para.innerText = newDescription;
    
    cntr.id = "ctnr_" + newDescription;
    item.id = "item_"+newDescription;
    buttons.children[0].id = "remove_"+newDescription;
    buttons.children[1].id = "edit_"+newDescription;

    item.removeChild(input);

    item.classList.remove("toDoList_item_editing");
    para.style.visibility = "visible";
}

function updateDescription_DATA(obj, newDescription){
    obj.description = newDescription;
}

function generateMyToDoList(dataArray) {
    console.log("generating a to do list")
    let cntr = document.getElementById("toDoList_ctnr");
    let colourNum = 0;
    dataArray.forEach(listItem => {
        let elem;
        if (!listItem.complete) {
            elem = listItem.generateElem(colourNum);
        } else {
            elem = listItem.generateElem_ticked();
        }
        cntr.appendChild(elem);
        if (colourNum >= colours.length - 1) { colourNum = 0 } else { colourNum++ };
    });
    highlightTopThree()
}

function highlightTopThree() {
    console.log("highlighting top three elements")
    let cntr = document.getElementById("toDoList_ctnr")
    if (cntr.children.length < 4) { return }
    for (let i = 0; i <= 3; i++) {
        let styling = "toDoList_item_priority" + (i + 1);
        let thisElem = cntr.children[i].children[1]
       if (thisElem.classList.contains(styling)) {
            continue
        }
        oldElems = document.querySelectorAll("." + styling);
        if (oldElems.length > 0) {
            oldElems[0].classList.remove(styling);
        }
        if (i < 3) {
            thisElem.classList.add(styling)
        }
    }
}

function priorityAdjust_reassign(global_toDoData) {
    console.log("reassigning DOM priorities to match current positions in DATA");
    if (!global_toDoData || global_toDoData.length < 1) { return }
    global_toDoData.forEach(item => {
        let index = global_toDoData.indexOf(item);
        let elem = document.getElementById("dropZone_" + item.description);
        item.priority = index;
        let currentPosition = elem.dataset.takePosition;
        elem.dataset.takePosition = index;
        elem.innerText = index;
    });
}

function reorderDataToMatchDom() {
    let nodelist = document.getElementById("toDoList_ctnr").children;
    let newData = [];
    for (let i = 0; i < nodelist.length; i++) {
        let node = nodelist[i];
        let desc = node.children[1].id.split("_")[1];
        let item = global_toDoData.find((e) => e.description == desc);
        item.priority = i;
        newData.push(item);
    }
    global_toDoData = newData;
}

function sort_by_Priority(global_toDoData) {
    global_toDoData.sort((a, b) => a.priority - b.priority);
}

class ToDoItem {
    constructor(obj) {
        //console.log("creating new to do item: ", obj.description);
        this.description = obj.description;
        this.complete = obj.complete;
        this.priority = obj.priority;
        this.timeCreated = obj.timeCreated;
        this.colourCode = undefined;
        //this.elem = this.generateElem(this.description)
    }

    generateElem() {
        //console.log('generating new elem', this.description, this.priority);

        let newElem = document.createElement('div');
        newElem.classList = "toDoList_item_ctnr";
        newElem.id = "ctnr_" + this.description;

        let newDropZone = document.createElement('div');
        newDropZone.classList = "dropZone";
        newDropZone.addEventListener("dragover", dnd_dragOverHandler);
        newDropZone.addEventListener("dragenter", dnd_dragEnterHandler);
        newDropZone.addEventListener("dragleave", dnd_dragLeaveHandler);
        newDropZone.addEventListener("drop", dnd_dropHandler);

        let newPill = document.createElement('div');
        newPill.classList = "toDoList_item";
        newPill.id = "item_" + this.description;
        newPill.draggable = true;
        newPill.addEventListener("dragstart", dnd_dragStartHandler);
        newPill.addEventListener("dragend", dnd_dragEndHandler);

        let newToDoCopy = document.createElement('p');
        newToDoCopy.innerText = this.description;


        let button_ctnr = document.createElement("div")
        button_ctnr.classList = "toDoList_button_ctnr"

        let removeBtn = document.createElement("button");
        removeBtn.classList = "toDoList_button";
        removeBtn.id = "remove_" + this.description;
        removeBtn.innerText = "x";
        removeBtn.clickHandler = function (e) {
            let str = e.target.id.split("_")[1];
            tickToDoItem(str);
        }
        removeBtn.addEventListener("click", removeBtn.clickHandler)

        let editBtn = document.createElement("button");
        editBtn.classList = "toDoList_button";
        editBtn.id = "edit_" + this.description;
        editBtn.innerText = "e";
        editBtn.clickHandler = function (e) {
             let str = e.target.id.split("_")[1];
            item_EditMode(str)
        }
        editBtn.addEventListener("click", editBtn.clickHandler);

        button_ctnr.appendChild(removeBtn);
        button_ctnr.appendChild(editBtn);
        newPill.appendChild(newToDoCopy);
        newPill.appendChild(button_ctnr);
        newElem.appendChild(newDropZone);
        newElem.appendChild(newPill);

        return newElem
    }
    generateElem_ticked() {
        let newElem = document.createElement('div');
        newElem.classList = "toDoList_item_ctnr";
        newElem.id = "ctnr_" + this.description;

        let newDropZone = document.createElement('div');
        newDropZone.classList = "dropZone";

        let newPill = document.createElement('div');
        newPill.classList = "toDoList_item_ticked";
        newPill.id = "item_" + this.description;

        let button_ctnr = document.createElement("div")
        button_ctnr.classList = "toDoList_button_ctnr"

        let reviveBtn = document.createElement("button");
        reviveBtn.classList = "toDoList_button";
        reviveBtn.id = "revive_" + this.description;
        reviveBtn.innerText = "r";
        reviveBtn.addEventListener("click", (e) => {
            let str = e.target.id.split("_")[1];
            reviveToDoItem(str);
        })

        let removeBtn = document.createElement("button");
        removeBtn.classList = "toDoList_button";
        removeBtn.id = "remove_" + this.description;
        removeBtn.innerText = "x";
        removeBtn.addEventListener("click", (e) => {
            let str = e.target.id.split("_")[1];
            permanentlyRemove(str);
        });

        let newToDoCopy = document.createElement('p');
        newToDoCopy.innerText = this.description;

        button_ctnr.appendChild(reviveBtn);
        button_ctnr.appendChild(removeBtn);
        newPill.appendChild(newToDoCopy);
        newPill.appendChild(button_ctnr);
        newElem.appendChild(newDropZone);
        newElem.appendChild(newPill);

        return newElem
    }

}

//utility functions

function pauseFor(aLilBit) {
    return new Promise(resolve => setTimeout(resolve, aLilBit));
}

//a function that randomly selects an item from an array
function randofrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
//get random inclusive of max and min
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//a function that returns the index of the first completed to do item
function getIndex_topOfTicked(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].complete) {
            return i;
        }
        if (!array[i].complete && i === array.length - 1) {
            console.log("no ticked list items");
            return i;
        }
    }
}

//a function that recieves an id and returns the position (index) on the parent node list
function getNodeIndex(idString) {
    let result
    let elem = document.getElementById(idString);
    let prefix = idString.split("_")[0];

    if (prefix === "ctnr") {
        let nodelist = elem.parentNode.children
        result = Array.from(nodelist).indexOf(elem);
    } else if (prefix === "item") {
        let parent = elem.parentNode
        let nodelist = parent.parentNode.children;;
        result = Array.from(nodelist).indexOf(parent);

    } else {
        console.error("Something is up with getNodeIndex()")
    }
    return result
}


//a function that recieves an id and returns the corresponding object in the global_toDoData array
function getObjectById(elemID_string) {
    let result
    let objDescription = elemID_string.split("_")[1];
    result = global_toDoData.find((e) => e.description == objDescription);
    if (!result) {
        console.error("looks like getObjectByID has been passed an invalid string:", elemID_string);
    }
    return result
}

function getObjectByDescription(description) {
    let result
    result = global_toDoData.find((e) => e.description == description);
    if (!result) {
        console.error("looks like getObjectByDescription has been passed an invalid string:", description);
    }
    return result
}


//move toDoObj to from current index in globalToDoData to desired
function moveObjectToIndex(array, obj, index) {
    let currentIndex = array.indexOf(obj);
    if (currentIndex === -1) {
        console.error("issue with moveObjectToIndex() - Object not found in array");
        return;
    }
    if (index < 0 || index >= array.length) {
        console.error("issue with moveObjectToIndex - detination index out of bounds");
        return;
    }
    array.splice(currentIndex, 1);
    array.splice(index, 0, obj);
}