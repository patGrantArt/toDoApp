console.log("dragAndDrop module is loaded");


function createCustomPLaceholder(elem) {
    console.log("creating custom placeholder");
    let placeholder = document.createElement("div");
    placeholder.classList = "toDoList_item";
    placeholder.id = "placeholder";
    placeholder.style.backgroundColor = elem.style.backgroundColor;
    placeholder.style.width = elem.offsetWidth + "px";
    placeholder.style.height = (pageHeight * 0.01) + "px";    
    placeholder.draggable = false;
    placeholder.innerText = elem.id;
    placeholder.style.opacity = 0.5; 
    placeholder.style.pointerEvents = "none";
    return placeholder;
}


async function dnd_dragStartHandler(e) {
    let draggingToDo = e.target;
    draggedElement = draggingToDo.parentElement;
    e.dataTransfer.setData("text", draggedElement.id);   
    
    let customPlaceholder = createCustomPLaceholder(draggingToDo);
    document.body.appendChild(customPlaceholder);
    e.dataTransfer.setDragImage(customPlaceholder, 50, 25);
    animateShrinkDraggedElement(draggingToDo.parentNode);
    setTimeout(() => {
        document.body.removeChild(customPlaceholder);
    }, 50);
}


function dnd_dragEnterHandler(e){
    let elemEntered = e.target;
    if (!elemEntered.classList.contains('dropZone')) {
        return;
    }
    let draggedItemIndex = getNodeIndex(draggedElement.id);
    let possibleDestinationIndex = getNodeIndex(elemEntered.parentNode.id);
    if (draggedItemIndex === possibleDestinationIndex || draggedItemIndex + 1 === possibleDestinationIndex) {
        return
    }
    elemEntered.parentNode.classList.add("toDoList_item_ctnr_expanded");
    elemEntered.classList.add('dropZone_highlight');

}
function dnd_dragLeaveHandler(e){
    let elemLeft = e.target;
    if (!elemLeft.classList.contains('dropZone')) {
        return;
    }
    elemLeft.parentNode.classList.remove("toDoList_item_ctnr_expanded");
    elemLeft.classList.remove('dropZone_highlight');
}


function dnd_dragOverHandler(e) {
    e.preventDefault();
}
function dnd_dropHandler(e) {
    console.log("dragged item dropped");
    e.preventDefault();
    let destinationDZ = e.target;
    let draggedElement = document.getElementById(e.dataTransfer.getData("text"));
    let destinationElem = destinationDZ.parentNode;
    let indexAfter = getNodeIndex(destinationElem.id);

    let listContainer = document.getElementById("toDoList_ctnr");
    listContainer.insertBefore(draggedElement, listContainer.children[indexAfter]);
    highlightTopThree();
    animateInstantExpand(draggedElement);
    animateInstantRestore(destinationElem, destinationDZ);
    reorderDataToMatchDom();
    sendDataToServer(global_toDoData);
};


function dnd_dragEndHandler(e){
    console.log("drag ended")
    console.log("dragged element is: ", draggedElement);
    draggedElement = e.target.parentNode;
    animateExpandDraggedElement(draggedElement);

}
