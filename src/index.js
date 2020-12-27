const endPoint = "http://localhost:3000/api/v1/games";
const gameForm = document.getElementById("game-form");
const scoreModal = document.getElementById("scoreModal");
const buttonModal = document.getElementById("buttonModal");


document.addEventListener('DOMContentLoaded', () => {
    loadGames()
    submitForm()
})

function gameOver() {
    scoreModal.style.display = "block";
    document.getElementById("game-over").style.display = "block";
    clickToClose()
}

function gameWin() {
    scoreModal.style.display = "block";
    document.getElementById("game-win").style.display = "block";
    clickToClose()
}

function modalClear() {
    scoreModal.style.display = "none";
    replay()
}

function clickToClose() {
    const closeX = document.getElementById("close-modal")
    closeX.addEventListener("click", handleCloseClick)
}

function handleCloseClick() {
    scoreModal.style.display = "none"
    canvasReload()
}

function replay() {
    buttonModal.style.display = "block";
    replayButton = document.getElementById("replay-button")
    replayButton.addEventListener("click", canvasReload)
}


function loadGames() {
    fetch(endPoint)
    .then(resp => resp.json())
    .then(games => {
        addGamesToPage(games)
    })
}

function addGamesToPage(games) {
    document.querySelector("#score-board-container").innerHTML =            
        `<tr>
            <th>NAME:</th>
            <th>SCORE:</th>
        </tr>`
        
    games.data.forEach(game => {
        attachGame(game)
    });
}

function attachGame(game) {
    const newGame = new Game(game.id, game.attributes);
    document.querySelector("#score-board-container").innerHTML += newGame.renderGame();
}




function submitForm(){
    gameForm.addEventListener("submit", (e) => formHandler(e))
}

function formHandler(e) {
    e.preventDefault()
    // change what formScore is equal to
    const formScore = parseInt(document.getElementById("score").innerText)
    const formName = document.getElementById("name").value
    postFetch(formScore, formName)
}

function postFetch(score, user_name){
    const bodyData = 
    // this object created to satisfy strong params on back end (:game is required)
        {game:
            {score, user_name}
        }

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData),
    })
    .then(resp => resp.json())
    .then(game => {
        if (!game.errors) {
            loadGames()
        } else {
            throw new Error (`${game.errors}`)
        }
    })
    .catch(alert)
    modalClear()
}


