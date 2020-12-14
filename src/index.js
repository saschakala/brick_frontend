const endPoint = "http://localhost:3000/api/v1/games"

document.addEventListener('DOMContentLoaded', () => {
    getGames()
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