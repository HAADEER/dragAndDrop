//get button element and set an event handler
var addBtn = document.getElementById("insertedBtn");
addBtn.addEventListener("click" , insertedValue);

//get inprogress tag element to insert data directly 
var inProgressContainer = document.getElementById("inProgressContainer");

//get input element to take the value of inserted data
var inputtedText = document.getElementById("inputVal");
inputtedText.addEventListener("keydown", function(event){
    console.log("enter");
    if(event.key == "Enter"){
        event.preventDefault();
    }
})

//array of object that hold data for local storage
var objArr = [];
var click = 0;
/*onclick function implmentation*/
function insertedValue(val){
    val = inputtedText.value
    var inputListItem = document.createElement("li");
    inputListItem.innerHTML = val;
    //console.log(inProgressContainer);
    inputListItem.setAttribute('draggable', 'true');
    inProgressContainer.append(inputListItem);
    inputListItem.setAttribute("id" , "item" + click);
    var itemID = inputListItem.id;
    var iteminnerHTML = document.getElementById(inputListItem.id).innerHTML;
    var itemContainerName = inputListItem.parentNode.parentNode.getAttribute("class");
    console.log(itemID ,"***" , iteminnerHTML , "***" ,itemContainerName);
    objArr.push({
        "id" : itemID ,
        "value" : iteminnerHTML,
        "container" : itemContainerName 
    })
    var allListItems = document.querySelectorAll("li");
    click += 1;
    console.log(objArr);
    localStorage.setItem("dragANDdrop" , JSON.stringify(objArr));
    setDragFun(allListItems);
}

/*set a drag start function and id name for each list item*/
function setDragFun(allListItems){
    allListItems.forEach(function(e,i){
        e.addEventListener("dragstart" , dragstartFun);})}

/*set the implementation of drag start function*/
function dragstartFun(event){
    event.dataTransfer.setData("txt" , this.id);
}

/*loop through containers to set the drag over and drop function for each*/
var containers = document.getElementsByClassName("tasksSection");
        for(var c=0 ; c<containers.length; c++){
            containers[c].addEventListener("dragover" , dragoverFun);
            containers[c].addEventListener("drop" , dropFun);
        }  

function dragoverFun(event){
    event.preventDefault();
    //console.log(event);
}

function dropFun(event){
    var droppeditemList = event.dataTransfer.getData("txt");
    console.log(document.getElementById(droppeditemList))
    this.append(document.getElementById(droppeditemList));
    //this == ul
    var containerName = this.parentNode.getAttribute("class");
    console.log(objArr)
    //this.childNodes == node list (list of li in ul)
    var ULchildList = this.childNodes; //array of li element
    console.log(ULchildList);
    ULchildList.forEach(function(e){
        console.log(e);
        //console.log(e.getAttribute("id") ,"at container=" , containerName)
        for(item of objArr){
            if(e.getAttribute("id") == item.id){
                if(containerName != item.container){
                    item.container = containerName;
                    console.log(item);
                    localStorage.setItem("dragANDdrop" , JSON.stringify(objArr));
                }
                else{
                    item.container = item.container;
                }
            }
        } 
    })
    itemFromLCS = JSON.parse(localStorage.getItem("dragANDdrop"));
    console.log(itemFromLCS);
}
//get data from local storage to upload it automatically when refresh
document.addEventListener("DOMContentLoaded" , letThings);
function letThings(){
    for(item of JSON.parse(localStorage.getItem("dragANDdrop"))){
        //console.log(document.getElementsByClassName(item.container));
        var allUL = document.querySelectorAll(".tasksSection");
        var listitem = document.createElement("li");
        listitem.innerHTML = item.value;
        listitem.setAttribute('draggable', 'true');
        listitem.setAttribute("id" , item.id);
        listitem.addEventListener("dragstart" , dragstartFun)
        allUL.forEach(function(e){
            //console.log(e.parentElement.getAttribute("class"));
            if(item.container == e.parentElement.getAttribute("class")){
                e.append(listitem);
                //console.log(e)
            }
        })       
    }
} 
