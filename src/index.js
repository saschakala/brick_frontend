const endPoint = "http://localhost:3000/api/v1/games"

document.addEventListener('DOMContentLoaded', () => {
    getGames()
})

function getGames() {
    fetch(endPoint)
    .then(response => response.json())
    .then(games => {
        games.data.forEach(game => {
            // can turn the following into a function to use with GET and POST:

            // create a new instance of a game class here
            const gameMarkup = `
                <div data-id=${game.id}>
                <h3>${game.attributes.user.name}</h3>
                <p>${game.attributes.score}</p>
                </div>
                <br> </br>`;

                document.querySelector("#score-container").innerHTML += gameMarkup
        });
    })

}