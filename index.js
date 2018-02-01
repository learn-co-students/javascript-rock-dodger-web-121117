const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
//testing
// const rock = document.createElement('div')
//         rock.className = 'rock'
//         rock.style.top = '365px'
//         rock.style.left = '0px'
// GAME.append(rock)


var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if  ((rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) || (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)){
      return true
    }
  }
  return false
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top

  GAME.appendChild(rock)

  function moveRock() {
    if (checkCollision(rock)){
      endGame()
    } else if (positionToInteger(rock.style.top) > 400 ){
      rock.remove()
    } else {
      rock.style.top = `${top+=2}px`
      window.requestAnimationFrame(moveRock)
    }
  }

  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  alert("YOU LOSE!")
  window.removeEventListener('keydown', moveDodger)
  clearInterval(gameInterval)
  for (const element of ROCKS){
    element.remove()
  }
  START.style.display = ''
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW || e.detail === LEFT_ARROW){
    e.preventDefault()
    window.requestAnimationFrame(moveDodgerLeft());
    e.stopPropagation()
  } else if (e.which === RIGHT_ARROW || e.detail === RIGHT_ARROW){
    e.preventDefault()
    window.requestAnimationFrame(moveDodgerRight());
  }
}

function moveDodgerLeft() {
  newLeftSide = positionToInteger(DODGER.style.left) - 4
  if (newLeftSide >= 0) {
    DODGER.style.left =  `${newLeftSide}px`
  }
}

function moveDodgerRight() {
  newLeftSide = positionToInteger(DODGER.style.left) + 4
  if (newLeftSide <= 360) {
  DODGER.style.left =  `${newLeftSide}px`
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)

}
