class Game{
    constructor(id, gameAttributes){
    this.id = id;
    this.userName = gameAttributes.user.name;
    this.score = gameAttributes.score;
    Game.all.push(this)
    }

    renderGame(){
        return `
            <tr data-id=${this.id} style="text-align: left">
                <td>${this.userName}</td>
                <td>${this.score}</td>
            </tr>`;
    }

}

Game.all = []
