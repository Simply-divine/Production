var huplayer = 'O';
var aiplayer = 'X';
var origboard;
var level = true;
var wincombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var cells = document.querySelectorAll('.cells');

startgame();

function startgame() {
    origboard = Array.from(Array(9).keys());
    document.querySelector('.endgame').style.display = 'none';
    document.querySelector('.endgame').getElementsByClassName.display = "none";
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = '';
        cells[i].innerText = "";
        cells[i].addEventListener('click', turnclick, false);
    }
    $('#easy').css({
        'background-color': 'white',
    })
    $('#hard').css({
        'background-color': 'white',
    })

}

function turnclick(x) {


    if (typeof origboard[x.target.id] == 'number') {
        turn(x.target.id, huplayer);
        if (!checkTie() && !checkwin(origboard, huplayer)) {
            turn(bestSpot(), aiplayer);
        }
    }

}
$('#easy').on('click', function() {
    level = true;
    $(this).css({
        'background-color': 'green',

    })
})
$('#hard').on('click', function() {
    level = false;
    $(this).css({
        'background-color': 'green',

    })
})

function bestSpot() {
    if (level == "" || level == null || level == undefined) {
        alert("Select difficulty to proceed");
        startgame();

    }
    if (level == true) {
        return availspots()[0];
    } else
        return minimax(origboard, aiplayer).index;
}

function minimax(newboard, player) {
    var moves = [];

    var availspots = emptysquares(newboard);


    if (checkwin(newboard, aiplayer)) {
        return { score: 10 };
    } else if (checkwin(newboard, huplayer)) {
        return { score: -10 };
    } else if (availspots.length == 0) {
        return { score: 0 };
    }

    for (var i = 0; i < availspots.length; i++) {
        var move = {};
        move.index = newboard[availspots[i]];
        newboard[availspots[i]] = player;
        if (player == huplayer) {
            var result = minimax(newboard, aiplayer);
            move.score = result.score;
        }
        if (player == aiplayer) {
            var result = minimax(newboard, huplayer);
            move.score = result.score;
        }
        newboard[availspots[i]] = move.index;
        moves.push(move);
    }
    var bestmove;
    if (player === huplayer) {
        var bestscore = 1000;

        for (var i = 0; i < moves.length; i++) {

            if (moves[i].score < bestscore) {
                bestscore = moves[i].score;
                bestmove = i;
            }
        }

    }
    if (player === aiplayer) {
        var bestscore = -1000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestscore) {
                bestscore = moves[i].score;
                bestmove = i;
            }
        }
    }
    return moves[bestmove];
}

function emptysquares(board) {
    var squares = [];
    for (var i = 0; i < board.length; i++) {
        (typeof board[i] == 'number') ? squares.push(i): squares, [];
    }
    //console.log(squares);
    return squares;
}

function checkTie() {
    if (availspots().length == 0 && (!checkwin(origboard, huplayer) || !checkwin(origboard, aiplayer))) {
        for (var i = 0; i < origboard.length; i++) {
            document.querySelector('.endgame').style.display = 'block';
            document.getElementById(i).style.backgroundColor = 'blue';
            document.querySelector('.endgame .text').innerText = 'Its a Tie';
        }
        return true;
    }


    return false;
}

function availspots() {
    var spots = [];

    for (var i = 0; i < origboard.length; i++) {

        if (typeof origboard[i] == 'number') {
            spots.push(i);
        }
    }

    return spots;
}

function turn(id, player) {
    origboard[id] = player;

    cells[id].innerHTML = player;

    var gameWon = checkwin(origboard, player)

    if (gameWon) gameOver(gameWon);
}
var plays;

function checkwin(board, player) {

    plays = board.reduce((a, e, i) => (e == player) ? a.concat(i) : a, []);

    var gameWon;
    for (var [index, entries] of wincombos.entries()) {
        if (entries.every(elem => plays.indexOf(elem) >= 0)) {
            gameWon = {
                index: index,
                player: player
            }

            break;
        }
    }

    return gameWon;
}


function gameOver(gameWon) {
    var index = gameWon.index;
    var player = gameWon.player;
    for (var i = 0; i < wincombos[index].length; i++) {
        document.getElementById(wincombos[index][i]).style.background = (gameWon.player == huplayer) ? "rgb(71, 189, 21)" : "red";
        document.querySelector('.endgame').style.display = 'block';
        cells.forEach(x => x.removeEventListener('click', turnclick, false));
        document.querySelector('.endgame .text').innerText = (gameWon.player == huplayer) ? "You Win" : "You Lose";
    }
}