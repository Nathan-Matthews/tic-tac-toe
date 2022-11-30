// Module for the Gameboard.
const Gameboard = (() => {
    let gameboard = ["","","",
                    "","","",
                    "","",""];
    // Runs when a tile is clicked.
    const gameboardMove = (cellID) => {

        // Check who's turn, place the shape, then switch turns.
        if(playerOne.playerTurn){
            gameboard[cellID - 1] = "X";
            playerOne.playerTurn = false;
            playerTwo.playerTurn = true;
        }
        else{
            gameboard[cellID - 1] = "O";
            playerOne.playerTurn = true;
            playerTwo.playerTurn = false;
        }
        displayController.updateDisplay(gameboard);
    }
    
    return {gameboard, gameboardMove};
})();

// Module for the "flow" or game display.
const displayController = (() => {

    // Initializes the display before any moves are made
    const initializeDisplay = () => {
        // Note that For loops start at 1
        let cellNamerCount = 0; // Used to assign a value 1-9 to each cell of the grid.
        for(let i = 0; i <= 2; i++){
            // Inner Loop starts at 1 and ends at 3
            for(let j = 1; j <= 3; j++){
                const cell = document.createElement("div");
                cellNamerCount = i * 3 + j;
                cell.className = "cell c" + cellNamerCount; // Name each cell "cell c<#1-#9>"
                document.querySelector(".gameboard").appendChild(cell);
            }
        }

        // Event listener for cell clicks aka "moves"
        // Once a cell is clicked, send that cell number and record the player shape.
        document.querySelectorAll('.cell').forEach(item => {
            item.addEventListener('click', event => {
                console.log(item.className.slice(-1));
                Gameboard.gameboardMove(item.className.slice(-1));
            })
          })

    }

    // Updates the board after a tile is changed to 'X' or 'O'
    const updateDisplay = (gameboard) => {
        let cellNamerCount = 0;
        let gameboardIndex = 0;

        for(let i = 0; i <= 2; i++){
            // Inner Loop starts at 1 and ends at 3
            for(let j = 1; j <= 3; j++){

                cellNamerCount = i * 3 + j;
                gameboardIndex = cellNamerCount - 1;

                const test = document.querySelector(".c" + cellNamerCount); // Select each cell by its <#1-#9>
                if(gameboard[gameboardIndex] == "X"){
                    test.textContent = "X";
                }
                else if(gameboard[gameboardIndex] == "O"){
                    test.textContent = "O";
                }
                else{
                    continue;
                }

            }
        }
    }

    // Module return of public methods and variables.
    return {initializeDisplay, updateDisplay};

})();

// Player factory for the players
const playerFactory = (name, shape) => {
    let playerTurn = false;
    if(name == 1){
        playerTurn = true;
    }
    return {name, shape, playerTurn};
};

// Initialize the players and the game.
const playerOne = playerFactory(1,"X");
const playerTwo = playerFactory(2,"O");
displayController.initializeDisplay();

displayController.updateDisplay(Gameboard.gameboard);

// TODO: make the selectable options appear in a popup on page load
// Then once those selections are made, the popup disappears and shows the board.
