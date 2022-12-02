// Module for the Gameboard.
const Gameboard = (() => {
    let gameboard = ["","","",
                    "","","",
                    "","",""];
    let _turnCounter = 0;

    // Runs when a tile is clicked.
    const gameboardMove = (cellID) => {

        //Disables moves after a player has won.
        if(playerOne.hasWon || playerTwo.hasWon){
            return;
        }

        // Check if a player has already made a move in that spot.
        if(gameboard[cellID - 1] == "X" || gameboard[cellID - 1] == "O"){
            return;
        }

        // Check who's turn, place the shape, then switch turns.
        else if(playerOne.playerTurn){
            gameboard[cellID - 1] = "X";
            playerOne.playerTurn = false;
            playerTwo.playerTurn = true;
        }
        else{
            gameboard[cellID - 1] = "O";
            playerOne.playerTurn = true;
            playerTwo.playerTurn = false;
        }
        _turnCounter++;
        // Start checking for wins only after the 5th turn has been played.
        if(_turnCounter >= 5){
            _checkWin();
        }
        displayController.updateDisplay(gameboard);
    }

    const _checkWin = () => {
        for(let i = 0; i <= 6; i++){
            // Check for wins in Rows
            if(i == 0 || i == 3 || i == 6){
                if(gameboard[i] == gameboard[i + 1] && gameboard[i] == gameboard[i + 2]){
                    if(gameboard[i] == ""){
                        continue;
                    }
                    _hasWon(gameboard[i]);
                }
            }
            // Check for wins in Columns
            if(i == 0 || i == 1 || i == 2){
                if(gameboard[i] == gameboard[i + 3] && gameboard[i] == gameboard[i + 6]){
                    if(gameboard[i] == ""){
                        continue;
                    }
                    _hasWon(gameboard[i]);
                }
            }
        }
        // Check backslash diagonal wins
        if(gameboard[0] == gameboard[4] && gameboard[0] == gameboard[8]){
            if(gameboard[0] != ""){
                _hasWon(gameboard[0]);
            }
        }
        // Check frontslash diagonal wins
        if(gameboard[2] == gameboard[4] && gameboard[0] == gameboard[6]){
            if(gameboard[2] != ""){
                _hasWon(gameboard[2]);
            }
        }
        // After the 9th turn and after checking for a win, it must be a tie.
        if(_turnCounter >= 9){
            document.querySelector(".header").textContent = "There has been a tie."
        }
    }

    // Called once a winning set has been found.
    const _hasWon = (shape) => {
        document.querySelector(".header").textContent = shape + " has won!";
        if(shape == playerOne.shape){
            playerOne.hasWon = true;
        }
        else{
            playerTwo.hasWon = true;
        }
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
    let hasWon = false;
    if(name == 1){
        playerTurn = true;
    }
    return {name, shape, playerTurn, hasWon};
};

// Initialize the players and the display.
const playerOne = playerFactory(1,"X");
const playerTwo = playerFactory(2,"O");
displayController.initializeDisplay();

// TODO: make the "difficulty" be selectable once "AI" is selected.
// set selected options to variables in the code.

const openButton = document.getElementById('trigger-modal');
const closeButton = document.getElementById('close-modal');

function toggleModal() {
  const modalDiv = document.querySelector('.popup-modal');
  modalDiv.classList.toggle('show');
}

closeButton.addEventListener('click', toggleModal);


// Open Modal on page load
toggleModal();
