const endPoint = "http://localhost:3000/api/v1/games"
const gameForm = document.getElementById("game-form")
const formScore = document.getElementById("score")
const formName = document.getElementById("name")

document.addEventListener('DOMContentLoaded', () => {
    getGames()
    submitForm()
})

function getGames() {
    fetch(endPoint)
    .then(response => response.json())
    .then(games => {
        games.data.forEach(game => {
            // create a new instance of a game class here
            const newGame = new Game(game.id, game.attributes);

            document.querySelector("#score-container").innerHTML += newGame.renderGame();
        });
    })

}

function submitForm(){
    gameForm.addEventListener("submit", (e) => formHandler(e))
}

function formHandler(e) {
    e.preventDefault()
    console.log("This Works")
}

// function getFormInfo(event){

// }

