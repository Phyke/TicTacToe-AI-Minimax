const x = 'X', o = 'O', b = '_';
const initialState = [b,b,b,b,b,b,b,b,b];
/*const initialState = [  x,x,b,
                        o,b,o,
                        x,o,o];*/

function getLegalMoves(position) {
    const legalMoves = [];
    for (let i = 0; i < position.length; i++) {
        if (position[i] == '_') legalMoves.push(i);
    }
    return legalMoves;
}


function countXO(array, match) {
    let count = 0;
    for (const item of array) {
        if (item == match) count++;
    }
    return count;
}

function getWinner(position) {
    //console.log("gameended", position);
    if      (countXO([position[0], position[1], position[2]], x) == 3) return 100;
    else if (countXO([position[3], position[4], position[5]], x) == 3) return 100;
    else if (countXO([position[6], position[7], position[8]], x) == 3) return 100;
    else if (countXO([position[0], position[3], position[6]], x) == 3) return 100;
    else if (countXO([position[1], position[4], position[7]], x) == 3) return 100;
    else if (countXO([position[2], position[5], position[8]], x) == 3) return 100;
    else if (countXO([position[0], position[4], position[8]], x) == 3) return 100;
    else if (countXO([position[2], position[4], position[6]], x) == 3) return 100;
    else if (countXO([position[0], position[1], position[2]], o) == 3) return -100;
    else if (countXO([position[3], position[4], position[5]], o) == 3) return -100;
    else if (countXO([position[6], position[7], position[8]], o) == 3) return -100;
    else if (countXO([position[0], position[3], position[6]], o) == 3) return -100;
    else if (countXO([position[1], position[4], position[7]], o) == 3) return -100;
    else if (countXO([position[2], position[5], position[8]], o) == 3) return -100;
    else if (countXO([position[0], position[4], position[8]], o) == 3) return -100;
    else if (countXO([position[2], position[4], position[6]], o) == 3) return -100;
    else return 0;
}

let count = 0;
const map = new Map();

function minimax(currentPosition, depth, maximizingPlayer) {
    const legalMoves = getLegalMoves(currentPosition);
    winner = getWinner(currentPosition);

    if (winner == 100 || winner == -100) {
        return winner - depth;
    }

    if (legalMoves.length == 0) return 0;
    
    if (maximizingPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < currentPosition.length; i++) {
            if (currentPosition[i] == b) {
                currentPosition[i] = x;
                count++;
                bestScore = Math.max(bestScore, minimax(currentPosition, depth + 1, false));
                currentPosition[i] = b;
            }
        }
        return bestScore;
    }

    else {
        let bestScore = 10000;
        for (let i = 0; i < currentPosition.length; i++) {
            if (currentPosition[i] == b) {
                currentPosition[i] = o;
                count++;
                bestScore = Math.min(bestScore, minimax(currentPosition, depth + 1, true));
                currentPosition[i] = b;
            }
        }
        return bestScore;
    }
}

//console.log(initialState);
/*makeMove(initialState, 0, x);
makeMove(initialState, 1, o)
makeMove(initialState, 2, x);
makeMove(initialState, 3, o);
makeMove(initialState, 4, o);
makeMove(initialState, 5, x);*/

//makeMove(initialState, 5, o);

/*let final = minimax(initialState, 0, true);
console.log('=======================================');
if (final > 0) console.log('Game Results - Max wins');
else if (final < 0) console.log('Game Results - Min wins');
else if (final == 0) console.log("Game Results - Draws");
else console.log('Error');*/

function findBestMoveAI(currentPosition) {
    let bestScore = 10000
    let bestMove;
    for (let i = 0; i < currentPosition.length; i++) {
        if (currentPosition[i] == b) {
            currentPosition[i] = o;
            //console.log(currentPosition);
            let moveScore = minimax(currentPosition, 0, true);

            currentPosition[i] = b;
            if (moveScore < bestScore) {
                bestMove = i;
                bestScore = moveScore;
            }
        }
    }
    return bestMove;
}

function makeMove(currentPosition, moveToMake, player) {
    currentPosition[moveToMake] = player;
}

//makeMove(initialState, 0, x);
//makeMove(initialState, findBestMoveAI(initialState), o);
//console.log('count', count);
//makeMove(initialState, 1, x);
//makeMove(initialState, findBestMoveAI(initialState), o);
//console.log('count', count);
//makeMove(initialState, 5, x);
//makeMove(initialState, findBestMoveAI(initialState), o);
//console.log('count', count);
console.log(initialState);
//makeMove(initialState, 1, o);
//makeMove(initialState, findBestMoveAI(initialState), o);
//console.log('moveAI', findBestMoveAI(initialState));
//console.log('minimax', minimax(initialState, 0, true));
//makeMove(initialState, findBestMoveAI(initialState), o);
//console.log('count', count);
//console.log(initialState);
function printBoard(board) {
    const tdList = document.querySelectorAll('td');
    let i = 0;
    tdList.forEach(td => {
        td.innerHTML = board[i];
        i++;
    })
}

printBoard(initialState);
document.getElementById('submit').addEventListener('click', e => {
    let val = document.getElementById('numInput').value - 1;
    if (initialState[val] == b) {
        makeMove(initialState, val, x);
        makeMove(initialState, findBestMoveAI(initialState), o);
    }
    printBoard(initialState);
})
