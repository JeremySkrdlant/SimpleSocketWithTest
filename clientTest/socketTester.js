const recieverArea = document.getElementById("recieverArea");
const emitterArea = document.getElementById("emitterArea");
const loadingArea = document.getElementById("loading");
const newMSG = document.getElementById("newMSG");

const socket = io("http://localhost:3000");

socket.on("connectionComplete", ()=>{
    console.log("We have a connection");
    loadingArea.classList.remove("fullSize")
    loadingArea.classList.add("hidden")
    recieverArea.parentElement.classList.remove("hidden")
    emitterArea.parentElement.classList.remove("hidden")
})

socket.on("last", (msg)=>{
    recieverArea.innerHTML = msg; 
})

async function askForBroadcast(){
    await fetch("http://localhost:3000/broadcastLast");
}

function submitCall(){
    socket.emit("call", newMSG.value);
    newMSG.value = "";
}