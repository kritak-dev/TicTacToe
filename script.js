// setting the game board IIFE
const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""] 

    const setField = (index, sign) => {
        if (index >= board.length) return;
        board[index] = sign;
    };

    const getField = (index) => {
        if (index >= board.length) return;
        return board[index];
    };

    const resetBoard = () => {
        board = board.map(elem => elem = "");
    };

    return { setField, getField, resetBoard };
})();

// setting the Player factory function
const Player = (name, sign) => {
    const getSign = () => sign;
    const getName = () => name;

    return { getSign, getName };
};

// adding the display controller to upgrade, reset and 
const displayController = (() => {
    const fields = document.querySelectorAll('.field');
    const resetButton = document.querySelector('.reset-button');
    const message = document.querySelector('.message');

    const updateBoard = () => {
        for (let i = 0; i < fields.length; i++)
            fields[i].textContent = gameBoard.getField(i);
    };

    const updateMessage = (showMessage) => {
        message.textContent = showMessage;
    }

    const resetBoard = () => {
        gameBoard.resetBoard();
        updateBoard();
        gameController.resetBoard();
        updateMessage(`Player X's turn`);
    };

    fields.forEach(field => {
        field.addEventListener('click', function(evt) {
            let index = Number(evt.target.dataset.index);
            if (gameController.isOver() || evt.target.textContent !== '') return;
            gameController.playGame(index);
            if (gameController.isOver()) {
                if (gameController.isGameDraw()) {
                    console.log('Game Draw');
                    updateMessage('Game Draw');
                }
                else {
                    console.log(`${gameController.getPlayer().getName()} is winner`);
                    updateMessage(`Player ${gameController.getPlayer().getSign()} is winner`)
                }
            }
        });
    });

    resetButton.addEventListener('click', resetBoard);

    return { updateBoard, resetBoard, updateMessage }
})();

const gameController = (() => {
    player1 = Player('PlayerX', 'X');
    player2 = Player('PlayerO', 'O');
    let player = player1;
    let isDraw = false, gameOver = false;

    const playGame = (index) => {
        gameBoard.setField(index, player.getSign());
        displayController.updateBoard();
        if (checkWinner(index)) {
            gameOver = true;
            return player;
        }

        if (checkDraw()) {
            gameOver = true;
            isDraw = true;
            return;
        }

        player = player === player1 ? player2 : player1;
        displayController.updateMessage(`Player ${player.getSign()}'s turn.`);
    };

    const checkDraw = () => {
        for (let i = 0; i < 9; i++) {
            if (gameBoard.getField(i) === "")
                return false;
        }

        return true;
    }

    const checkWinner = (index) => {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winCondition
        .filter(combination => combination.includes(index))
        .some(possibleCombination => possibleCombination.every(ind => gameBoard.getField(ind) === player.getSign()));
    }

    const isOver = () => gameOver;
    const isGameDraw = () => isDraw;
    const getPlayer = () => player;

    const resetBoard = () => {
        player = player1;
        gameOver = false;
        isDraw = false;
    }
    
    return { playGame, isOver, isGameDraw, getPlayer, resetBoard }
})();