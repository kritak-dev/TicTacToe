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

    return { setField, getField, resetBoard, board };
})();

// setting the Player factory function
const Player = (sign) => {
    const getSign = () => {
        return sign;
    };

    return { getSign };
};

// adding the display controller
const displayController = (() => {
    const fields = document.querySelectorAll('.field');
    const resetButton = document.querySelector('.reset-button');

    const upgradeBoard = () => {
        for (let i = 0; i < fields.length; i++) {
            fields[i].textContent = gameBoard.getField(i);
        }
    };

    const reset = () => {
        gameBoard.resetBoard();
        upgradeBoard();
    };

    fields.forEach(field => {
        field.addEventListener('click', function(evt) {
            let index = Number(evt.target.dataset.index);
            gameBoard.setField(index, 'X');
            upgradeBoard();
        });
    });

    resetButton.addEventListener('click', (evt) => {
        gameBoard.resetBoard();
        upgradeBoard();
    });
})();