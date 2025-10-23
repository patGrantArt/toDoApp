console.log("animations module loaded")

function animateShrinkDraggedElement(elem) {
    let children = elem.children;
    children[0].classList.add("toDoList_elem_shrink");
    children[1].classList.add("toDoList_elem_shrink");   
    elem.classList.add("toDoList_elem_shrink");  
}
function animateExpandDraggedElement(elem){
    console.log("expanding dragged element");
    let children = elem.children;
    children[0].classList.remove("toDoList_elem_shrink");
    children[1].classList.remove("toDoList_elem_shrink"); 
    elem.classList.remove("toDoList_elem_shrink");
}
function animateInstantExpand(elem){
    elem.classList.replace("toDoList_elem_shrink", "toDoList_elem_instant_expand");
    let children = elem.children;
    children[0].classList.remove("toDoList_elem_shrink");
    children[1].classList.remove("toDoList_elem_shrink"); 
    setTimeout(() => {
        elem.classList.remove("toDoList_elem_instant_expand");
    }, 100);

}
function animateInstantRestore(elem, dropZone){
    elem.classList.replace(
        "toDoList_item_ctnr_expanded",
        "toDoList_elem_instant_expand"
    )
    dropZone.classList.replace('dropZone_highlight', 'dropZone_instant_shrink');
    //set timeout for 100ms
    setTimeout(() => {
        dropZone.classList.remove('dropZone_instant_shrink');
        elem.classList.remove("toDoList_elem_instant_expand");
    }, 100);
}

//animate a new item being added to the list
function animateSlowRestore(elem){
    elem.classList.remove(
        "toDoList_item_ctnr_invisible"
    )
}


