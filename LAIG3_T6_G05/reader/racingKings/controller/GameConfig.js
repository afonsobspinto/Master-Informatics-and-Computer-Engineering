class GameConfig {
    constructor(gameMode, gameDifficulty, gameTimeout) {
        this.gameMode = gameMode;
        this.gameDifficulty = gameDifficulty;
        this.gameTimeout = gameTimeout
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
  }
