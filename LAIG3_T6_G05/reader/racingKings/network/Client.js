class Client {
    constructor(game){
        this.game = game;
        this.communicationOK = false;
    }

    init() {
        var client = this;
        this._getPrologRequest('handshake',
            function (data) {
                console.log("Request successful. Reply: " + data.target.response);
                client.communicationOK = true;
                client.game.init();
            });
    }

    _getPrologRequest(requestString, onSuccess, onError, port) {
        var requestPort = port || 8081
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);
        request.onload = onSuccess || function (data) { console.log("Request successful. Reply: " + data.target.response); };
        request.onerror = onError || function () { console.error("Error waiting for response"); };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    get getCommunicationOK(){
        return this.communicationOK;
    }

    startGame(){
        var client = this;
        this._getPrologRequest("start-"+this.game.getGameConfig.toString(),
    function(data){
        var [board, gameState, gameMode] = data.target.response.split('-');
        client.game.prologData.update(board, gameState, gameMode);
        client.game.board.updateBoard(board);
        client.game.timer1.update();
    });
    }

    makeMove(oldPos, newPos){
        var client = this;
        var changedBoard = client.game.prologData.board;
        var replacedBoard = replaceAll(changedBoard, '"', '');
        this._getPrologRequest('move-'+ replacedBoard + "-" + oldPos.toString() + "-"+newPos.toString());
    }
}