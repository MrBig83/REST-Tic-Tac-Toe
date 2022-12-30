const gridA = document.getElementById("a");
const gridB = document.getElementById("b");
const gridC = document.getElementById("c");
const gridD = document.getElementById("d");
const gridE = document.getElementById("e");
const gridF = document.getElementById("f");
const gridG = document.getElementById("g");
const gridH = document.getElementById("h");
const gridI = document.getElementById("i");
const roundText = document.querySelector(".roundText");
const playerTurnText = document.querySelector(".playerTurn")
const gameBoard = document.querySelector(".game-board");
const inputs = document.querySelector(".inputs");
const info = document.querySelector(".info");
const namePlayer1 = document.querySelector(".namePlayer1");
const namePlayer2 = document.querySelector(".namePlayer2");
const playBtn = document.querySelector(".btnPlay");
const startBtn = document.querySelector(".btnStart");
const cancelBtn = document.querySelector(".btnCancel")
const cancelInfoBtn = document.querySelector(".btnCancelInfo");
const btnEditBio = document.querySelector(".btnEditBio");
const highScorePane = document.querySelector(".highScore")
const ulName = document.querySelector(".ulName");
const ulPoints = document.querySelector(".ulPoints");
const infoHeader = document.querySelector(".infoHeader");
const infoBio = document.querySelector(".infoBio");
const infoScore = document.querySelector(".infoScore");
const editBioTxt = document.querySelector(".editBioTxt");
const btnSaveBio = document.querySelector(".btnSaveBio");
const btnDeleteUser = document.querySelector(".btnDeleteUser");
const editBioTxtDiv = document.querySelector(".editBioTxtDiv");
let playerTurn;
let round = 0;
let userID;

startBtn.style.display="none";
let players = [
    {
    "userName": "",
    "playerSymbol" : "X"
    },
    {
    "userName": "",
    "playerSymbol" : "O"
    }
];

playBtn.addEventListener("click", (e) => {
    highScorePane.style.zIndex="-1"
    startBtn.style.display="block";
    inputs.style.display="flex";
    cancelBtn.style.display="block";
    gameBoard.style.zIndex = "-1";
})
cancelBtn.addEventListener("click", (e) => {
    highScorePane.style.zIndex="0"
    startBtn.style.display="none";
    inputs.style.display="none";
    cancelBtn.style.display="none";
    gameBoard.style.zIndex = "-1";
})
btnEditBio.addEventListener("click", editBio);
btnDeleteUser.addEventListener("click", deleteUser);
startBtn.addEventListener("click", (e) =>{
    highScorePane.style.zIndex="0"
    players[0].userName=namePlayer1.value
    players[1].userName=namePlayer2.value
    startBtn.style.display="none";
    inputs.style.display="none";
    cancelBtn.style.display="none";
    gameBoard.style.zIndex = "1";
    displayRound();
})

async function createPlayers(player){
    const response = await fetch("http://localhost:3000/users/newUser", {
        method: "POST", 
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            "ID": "",
            "userName": player, 
            "bio":"This is a n00b",
            "highScore":1
        })
    })   
}





async function updatePlayer(player){
    await fetch("http://localhost:3000/users/update", {
        method: "PUT", 
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            "ID": "",
            "userName": player, 
            "bio": "",
            "highScore": "score",
        })
    })  
}

renderHighScore()
async function renderHighScore(){
    const response = await fetch("http://localhost:3000/users/usersList")
    const highScoreList = await response.json();
    
    for(let i = 0; i < highScoreList.length; i++){
        const liName = document.createElement("li")
        const liScore = document.createElement("li")
        liName.innerText = highScoreList[i].userName;
        liScore.innerText = highScoreList[i].highScore
        ulName.append(liName)
        ulPoints.append(liScore)
    }
    ulName.addEventListener("click", (e) => {
        showInfo(e.path[0].innerText)
    })
}

function showInfo(name){
    lala(name)
    async function lala(){
    const response = await fetch("http://localhost:3000/users/usersList")
    const info = await response.json();
    
    for(let i = 0; i < info.length; i++){
        if(info[i].userName == name){
            userID = info[i].ID
            infoHeader.innerText=name;
            infoBio.innerText=info[i].bio
            infoScore.innerText="HighScore: " + info[i].highScore
        }
    }}
    info.style.display="flex"
    info.style.zIndex="2"
    cancelInfoBtn.style.display="block"    
}

cancelInfoBtn.addEventListener("click", (e)=> {
    info.style.display="none"
    cancelInfoBtn.style.display="none"
})
function editBio(){
    btnEditBio.style.display="none"
    btnSaveBio.style.display="flex"
    editBioTxtDiv.style.display="flex"
    editBioTxt.value = infoBio.innerText
    infoBio.style.display="none"
    btnSaveBio.addEventListener("click", saveBio);

    async function saveBio(){
        await fetch("http://localhost:3000/users/update", {
            method: "PUT", 
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                "ID" : userID,
                "userName": infoHeader.innerText, 
                "bio" : editBioTxt.value,
                "highScore" : ""
            })
        })
    }
}
async function deleteUser(){
    await fetch ("http://localhost:3000/users/usersList/delete/" + userID,
    {
        method: "DELETE",
    });

}

function displayRound(){
    round = round+1;
    roundText.innerText="Round: " + round;
    if(round%2 != 0){
        playerTurn = players[0].userName;
        playerTurnText.innerText="It is "+players[0].userName+"s turn";
    } else {
        playerTurn = players[1].userName;
        playerTurnText.innerText="It is "+players[1].userName+"s turn";
    }
}

let gridArray = ["","","","","","","","",""]

function renderGrid(){

    gridA.textContent = gridArray[0]
    gridB.textContent = gridArray[1]
    gridC.textContent = gridArray[2]
    gridD.textContent = gridArray[3]
    gridE.textContent = gridArray[4]
    gridF.textContent = gridArray[5]
    gridG.textContent = gridArray[6]
    gridH.textContent = gridArray[7]
    gridI.textContent = gridArray[8]
    winCheck();
    
}

gridA.addEventListener("click", (e) => {
    if(gridArray[0] == ""){ //Loopa eller gör någon funktion... DRY!!
        if(round%2 != 0){
            gridArray[0] = players[0].playerSymbol;
        } else {
            gridArray[0] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridB.addEventListener("click", (e) => {
    if(gridArray[1] == ""){
        if(round%2 != 0){
            gridArray[1] = players[0].playerSymbol;
        } else {
            gridArray[1] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridC.addEventListener("click", (e) => {
    if(gridArray[2] == ""){
        if(round%2 != 0){
            gridArray[2] = players[0].playerSymbol;
        } else {
            gridArray[2] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridD.addEventListener("click", (e) => {
    if(gridArray[3] == ""){
        if(round%2 != 0){
            gridArray[3] = players[0].playerSymbol;
        } else {
            gridArray[3] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridE.addEventListener("click", (e) => {
    if(gridArray[4] == ""){
        if(round%2 != 0){
            gridArray[4] = players[0].playerSymbol;
        } else {
            gridArray[4] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridF.addEventListener("click", (e) => {
    if(gridArray[5] == ""){
        if(round%2 != 0){
            gridArray[5] = players[0].playerSymbol;
        } else {
            gridArray[5] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridG.addEventListener("click", (e) => {
    if(gridArray[6] == ""){
        if(round%2 != 0){
            gridArray[6] = players[0].playerSymbol;
        } else {
            gridArray[6] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridH.addEventListener("click", (e) => {
    if(gridArray[7] == ""){
        if(round%2 != 0){
            gridArray[7] = players[0].playerSymbol;
        } else {
            gridArray[7] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})
gridI.addEventListener("click", (e) => {
    if(gridArray[8] == ""){
        if(round%2 != 0){
            gridArray[8] = players[0].playerSymbol;
        } else {
            gridArray[8] = players[1].playerSymbol;
        }

        renderGrid()
    } else {
        errorMessage();
    }
})

function errorMessage(){
    roundText.innerText="Occupied, you moron! Try another square"
}
function winCheck(){
    if (
        (gridArray[0] == "X" && gridArray[1] == "X" && gridArray[2] == "X") ||
        (gridArray[3] == "X" && gridArray[4] == "X" && gridArray[5] == "X") ||
        (gridArray[6] == "X" && gridArray[7] == "X" && gridArray[8] == "X") ||
        (gridArray[0] == "X" && gridArray[3] == "X" && gridArray[6] == "X") ||
        (gridArray[1] == "X" && gridArray[4] == "X" && gridArray[7] == "X") ||
        (gridArray[2] == "X" && gridArray[5] == "X" && gridArray[8] == "X") ||
        (gridArray[0] == "X" && gridArray[4] == "X" && gridArray[8] == "X") ||
        (gridArray[2] == "X" && gridArray[4] == "X" && gridArray[6] == "X") ||

        (gridArray[0] == "O" && gridArray[1] == "O" && gridArray[2] == "O") ||
        (gridArray[3] == "O" && gridArray[4] == "O" && gridArray[5] == "O") ||
        (gridArray[6] == "O" && gridArray[7] == "O" && gridArray[8] == "O") ||
        (gridArray[0] == "O" && gridArray[3] == "O" && gridArray[6] == "O") ||
        (gridArray[1] == "O" && gridArray[4] == "O" && gridArray[7] == "O") ||
        (gridArray[2] == "O" && gridArray[5] == "O" && gridArray[8] == "O") ||
        (gridArray[0] == "O" && gridArray[4] == "O" && gridArray[8] == "O") ||
        (gridArray[2] == "O" && gridArray[4] == "O" && gridArray[6] == "O") 

        ){
        playerTurnText.innerText="THE WINNER IS " + playerTurn;    
       
        saveNewUser()
            async function saveNewUser(){
                const response = await fetch("http://localhost:3000/users/usersList")
                const data = await response.json();
                user ={
                    userName: playerTurn
                    }
                    let obj = data.find(o => o.userName === playerTurn);
                    if(obj != undefined){                   
                        updatePlayer(playerTurn)
                    } else {
                        createPlayers(playerTurn)
                        }
            }
        //gameBoard.style.zIndex = "-1";


    } else {
        displayRound();
    }
}