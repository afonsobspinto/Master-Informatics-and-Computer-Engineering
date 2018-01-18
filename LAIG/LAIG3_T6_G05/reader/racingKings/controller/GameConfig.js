class GameConfig {
    constructor(gameMode, gameDifficulty, gameTimeout) {
        this.gameMode = parseInt(gameMode);
        this.gameDifficulty = parseInt(gameDifficulty);
        this.gameTimeout = parseInt(gameTimeout);
    }

    get getGameMode(){
        return this.gameMode;
    }

    get getGameDifficulty(){
        return this.gameDifficulty;
    }

    get getGameTimeout(){
        return this.gameTimeout;
    }

    toString(){
        return this.gameMode + "-" + this.gameDifficulty;
    }
  }
