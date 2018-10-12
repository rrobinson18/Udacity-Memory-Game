

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /*
  * Create a list that holds all of your cards
  */
const cardsAgain = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


cardsAgain.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
      if (clockOff) {
        startClock ();
        clockOff = false;
      }
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (toggledCards.length === 2) {
      checkForMatch(clickTarget);
      addMove();
      checkScore();
    }

    }
    if (matched === TOTAL_PAIRS) {
          gameOver();
  }
});

function toggleCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

function addToggleCard(clickTarget){
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}


//Check for Match Card
function checkForMatch () {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matched++
  } else {
    setTimeout(()=> {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 1000);
  }
  }

function isClickValid(clickTarget) {
  return(
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)

  )
}

//Shuffles Deck
function shuffleDeck (){
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  // console.log('Cards to shuffle', cardsToShuffle);
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    cardsAgain.appendChild(card);
  }
}
shuffleDeck();

//increments moves by 1 every match attempt in the DOM.
function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves
}

//Check Score to Remove Stars
function checkScore (){
  if (moves === 15 || moves === 24
  ) { removeStar();

  }
}

function removeStar() {
  const starList  = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none'){
      star.style.display = 'none';
      break;
    }
  }
}
// removeStar();
// removeStar();


//Starts Clock
function startClock() {
  clockId = setInterval(() => {
    time++
    // console.log(time);
    displayTime();
  }, 1000);

}
// startClock();
// displayTime();

//Displays Time
function displayTime () {
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  const clock = document.querySelector('.clock');
  // console.log(clock);
  clock.innerHTML = time;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }

}

//Stops Clock
function stopClock() {
  clearInterval(clockId);
}


//this fucntion toggles the modal.
function toggleModal () {
  const modal = document.querySelector('.modal__background');
  modal.classList.toggle('hide');
}

toggleModal ()
toggleModal ()

function getStars () {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none'){
      starCount++;
    }
  }
  return starCount;
}

//Modal function
function writeModalStats () {
  const timeStat = document.querySelector('.modal__time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal__moves');
  const starsStat = document.querySelector('.modal__stars')
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML =  `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`
}

writeModalStats();

document.querySelector('.modal__cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal__replay').addEventListener('click', () => {
toggleModal();
resetGame();
});

document.querySelector('.restart').addEventListener('click', resetGame);

document.querySelector('.modal__close').addEventListener('click', toggleModal);

//This function resets the game
function resetGame () {
  resetClockAndTime ();
  resetMoves();
  resetStars();
  shuffleDeck();
  resetMatched();
  resetCards();
  toggledCards = [];
}

function resetClockAndTime () {
  stopClock ();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves(){
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars(){
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}


 function gameOver() {
   toggleModal();
   stopClock();
   writeModalStats();
 }

 function resetCards() {
   const cards = document.querySelectorAll('.deck li');
   for (let card of cards) {
     card.className = 'card';
   }
 }

function resetMatched () {
  matched = 0;
}
