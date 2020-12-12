const endPoint = "http://localhost:3000/api/v1/games"

document.addEventListener('DOMContentLoaded', () => {
    getGames()
})

function getGames() {
    fetch(endPoint)
    .then(response => response.json())
    .then(games => {
        games.data.forEach(game => {
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