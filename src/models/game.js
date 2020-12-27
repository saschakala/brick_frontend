class Game{
    constructor(id, gameAttributes){
    this.id = id;
    this.userName = gameAttributes.user.name;
    this.score = gameAttributes.score;
    Game.all.push(this)
    }

    renderGame(){
        return `
            <div data-id=${this.id}>
            <h3>${this.userName}: ${this.score}</h3>
            </div>`;
    }

}

Game.all = []
