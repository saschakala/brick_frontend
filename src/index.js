const endPoint = "http://localhost:3000/api/v1/games"
const gameForm = document.getElementById("game-form")


document.addEventListener('DOMContentLoaded', () => {
    loadGames()
    submitForm()
})

function loadGames() {
    fetch(endPoint)
    .then(response => response.json())
    .then(games => {
        games.data.forEach(game => {
            const newGame = new Game(game.id, game.attributes);

            document.querySelector("#score-board-container").innerHTML += newGame.renderGame();
        });
    })
}


function submitForm(){
    gameForm.addEventListener("submit", (e) => formHandler(e))
}

function formHandler(e) {
    e.preventDefault()
    // change what formScore is equal to
    const formScore = parseInt(document.getElementById("score").value)
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
        const gameData = game.data;
        let newGame = new Game(gameData.id, gameData.attributes);
        document.querySelector("#score-board-container").innerHTML += newGame.renderGame();
        } else {
            throw new Error (`${game.errors}`)
        }
    })
    .catch(alert)
}

