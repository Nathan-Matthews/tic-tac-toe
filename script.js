// Module for the Gameboard.
const Gameboard = (() => {
    let gameboard = ["X","O","X",
                    "","","O",
                    "X","X","O"];
    
    return {gameboard};
})();

// Module for the "flow" or game display.
const displayController = (() => {

    // Initializes the display before any moves are made
    const initializeDisplay = () => {
        // Note that For loops start at 1
        for(let i = 1; i <= 3; i++){
            for(let j = 1; j <= 3; j++){
                const cell = document.createElement("div");
                cell.className = "cell " + i + " " + j; // Name each cell "cell i j"
                document.querySelector(".gameboard").appendChild(cell);
            }
        }
    }

    // Updates the board after a tile is changed to 'X' or 'O'
    const displayBoard = (gameboard) => {
        // Note that For loops start at 1
        for(let i = 0; i <= 3; i++){
            for(let j = 0; j <= 3; j++){

            }
        }
    }

    // Module return of public methods and variables.
    return {initializeDisplay, displayBoard};

})();

// Player factory for the players
const playerFactory = (name, shape) => {
    return {name, shape};
};

// Initialize the players and the game.
const playerOne = playerFactory(1,"X");
const playerTwo = playerFactory(2,"O");
displayController.initializeDisplay();

// TODO: make the selectable options appear in a popup on page load
// Then once those selections are made, the popup disappears and shows the board.
