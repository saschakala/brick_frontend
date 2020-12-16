const endPoint = "http://localhost:3000/api/v1/games"
const gameForm = document.getElementById("game-form")


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
    const formScore = parseInt(document.getElementById("score").value)
    const formName = document.getElementById("name").value
    postFetch(formScore, formName)
}

function postFetch(score, user_name){
    const bodyData = {score, user_name}
    debugger

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData),
    })
    .then(response => response.json())
    .then(game => {
    console.log(game);
    const gameData = game.data
    let newGame = new Game(gameData.id, gameData.attributes);
    document.querySelector("#score-container").innerHTML += newGame.renderGame();
    })
}

