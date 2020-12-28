const endPoint = "http://localhost:3000/api/v1/games";
const gameForm = document.getElementById("game-form");
const scoreModal = document.getElementById("scoreModal");
const buttonModal = document.getElementById("buttonModal");
const pause = document.getElementById("pause-game");


document.addEventListener('DOMContentLoaded', () => {
    loadGames()
    submitForm()
    pauseGame()
})

function gameOver() {
    scoreModal.style.display = "flex";
    document.getElementById("game-over").style.display = "flex";
    clickToClose()
}

function gameWin() {
    scoreModal.style.display = "flex";
    document.getElementById("game-win").style.display = "flex";
    clickToClose()
}

function modalClear() {
    scoreModal.style.display = "none";
    replay()
}

function clickToClose() {
    const closeX = document.getElementById("close-modal")
    closeX.addEventListener("click", handleCloseClick)
    window.addEventListener("click", function(event) {
        if (event.target === scoreModal) {
            handleCloseClick()
          }
    })
}


function handleCloseClick() {
    scoreModal.style.display = "none"
    replay()
}

function replay() {
    buttonModal.style.display = "flex";
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
    const formScorePhrase = document.getElementById("score").innerText
    const formScore = parseInt(formScorePhrase.replace("Score: ", ""))
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

function pauseGame() {
    pause.addEventListener("click", handlePause)
    // debugger
}

function handlePause() {
    // debugger
    dx === 0 ? ballGo() : ballStop()
}