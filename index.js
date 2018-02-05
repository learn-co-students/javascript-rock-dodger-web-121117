/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */




function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIX: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIX: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (((rockLeftEdge < dodgerLeftEdge)&&(rockRightEdge > dodgerLeftEdge)) || ((rockLeftEdge >= dodgerLeftEdge)&&(rockRightEdge<=dodgerRightEdge)) || ((rockLeftEdge<dodgerRightEdge)&&(rockRightEdge>dodgerRightEdge))


              /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true
    }
  }
}




function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top


  GAME.appendChild(rock)


  function moveRock() {

    rock.style.top = `${(top += 3)}px`;

    if (checkCollision(rock)) {
      endGame()
    }

    if (top <= 400) {
      window.requestAnimationFrame(moveRock);
    }
    else {
      rock.remove()
    }


   }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}




function endGame() {
  // gameInterval = null;
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) { rock.remove() })
  window.removeEventListener('keydown', moveDodger) 
  // ROCKS.remove()
  // keydown.removeEventListener();
  alert("YOU LOSE!");
}



function moveDodger(e) {
   if (e.which === 37) {
    moveDodgerLeft()
    e.preventDefault();
    e.stopPropagation();
  }
  else if (e.which === 39) {
    moveDodgerRight()
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  if (left > 0) {
    dodger.style.left = `${left - 10}px`
  }
}

function moveDodgerRight() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  if (left < 360) {
    dodger.style.left = `${left + 10}px`
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
