// variables for the player text, restart button, and boxes
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks')
// variables for players 
const treasureChests = "O"
const crossBones = "X"
let currentPlayer = crossBones

// keep track of what box was clicked
let spaces = Array(9).fill(null)
let count_plays = 0

// start game
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && count_plays < 9) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10
            winning_blocks.map( box => boxes[box].style.background=winnerIndicator)
            return
        }
        count_plays++
        currentPlayer = currentPlayer == crossBones ? treasureChests : crossBones
    }

    if(count_plays === 9) {
        playerText.innerHTML = 'Draw Game!'
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}

// combos to hit to win game
const winningCombos = [
    [0,1,2],
    [3,4,6],
    [6,7,8], 
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [2,1,0],
    [3,4,6],
    [8,7,6], 
    [6,3,0],
    [7,4,1],
    [8,5,2],
    [8,4,0],
    [6,4,2]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c] && [c,b,a]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)
restartBtn.addEventListener('click', function(e) {
    window.location.reload(false)
})

function restart() {
    spaces.fill(null)
    count_plays = 0
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundcolor = '';
        box.style.color = 'black'
    })

    playerText.innerHTML = 'Crossbones and Treasure chests'

    currentPlayer = crossBones
}


startGame()