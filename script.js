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
        // If it is BOTH the AI and the AI's turn, then do an aiMove
        if((playerOne.playerTurn && playerOne.isAI || playerTwo.playerTurn && playerTwo.isAI)){
            aiMove();
        }
        // Start checking for wins only after the 5th turn has been played.
        if(_turnCounter >= 5){
            _checkWin();
        }
        displayController.updateDisplay(gameboard);
    }

    const aiMove = () => {
        let move = _getRandomInt(9);

        //Checks to make sure a valid move succeeded.
        let checkCounter = _turnCounter + 1;
        while(checkCounter > _turnCounter){
            gameboardMove(move);
            move = _getRandomInt(9);
        }
    }
    const _getRandomInt = (max) => {
        return Math.floor(Math.random() * max) + 1;
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
        if(gameboard[2] == gameboard[4] && gameboard[2] == gameboard[6]){
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
    
    return {gameboard, gameboardMove, aiMove};
})();

// Driver for the settings that a player chooses on page load.
const settings = (() => {

    const closeButton = document.getElementById('close-modal');
    // Default parameter choices.
    let playerChoice = "X"
    let playerOpponent = "Player"
    let aiDifficulty = "Easy"
    
    const openModal = () => {
      const modalDiv = document.querySelector('.popup-modal');
      modalDiv.classList.toggle('show');
    }
    
    // Steps taken when the modal is closed
    const closeModal = () => {
        const modalDiv = document.querySelector('.popup-modal');
        modalDiv.classList.toggle('show');
    
        // Select the form
        oForm = document.forms[0];
        if(oForm.elements["shape"].value == "O"){
            settings.playerChoice = "O"
        }
        if(oForm.elements["opponentType"].value == "AI"){
            settings.playerOpponent = "AI"
            if(settings.playerChoice=="O"){
                playerOne.isAI = true;
            }
            else{
                playerTwo.isAI = true;
            }
        }
        if(oForm.elements["difficulty"].value == "Medium"){
            settings.aiDifficulty = "Medium"
        }
        else if(oForm.elements["difficulty"].value == "Hard"){
            settings.aiDifficulty = "Hard"
        }

        // Check if an AI has been selected to play
        // If so, go ahead and have them make the first move if they are "X"
        if(settings.playerOpponent == "AI" && settings.playerChoice == "O"){
            Gameboard.aiMove();
        }
    
    }
    
    closeButton.addEventListener('click', closeModal);
    // Open Modal on page load
    openModal();

    return{playerChoice, playerOpponent, aiDifficulty}

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
    let isAI = false;
    if(name == 1){
        playerTurn = true;
    }
    // If this is not the playerCharacter and AI has been selected, set isAI to true.
    if(settings.playerOpponent == "AI" && settings.playerChoice != shape){
        isAI = true;
    }
    return {name, shape, playerTurn, hasWon, isAI};
};

// Initialize the players and the display.
const playerOne = playerFactory(1,"X");
const playerTwo = playerFactory(2,"O");
displayController.initializeDisplay();
