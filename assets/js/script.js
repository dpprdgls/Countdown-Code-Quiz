
//selecting DOM elements

let timeSeconds = document.querySelector('#seconds')
const startBtn = document.querySelector('#startBtn')
const startQuiz = document.querySelector('#startQuiz')
const viewHighScores = document.getElementById('viewHighScores')
const questionContainerElement = document.getElementById('questionContainer')
const questionElement = document.getElementById('questions')
const answerButtonElement = document.getElementById('answerbuttons')
const timer = document.getElementById('timer')
const submitButton = document.getElementById('scoreSubmit')
const goBackButton = document.getElementById('goBack')
const clearScoresButton = document.getElementById('clearScores')
let finalScoreUser = document.getElementById('finalScore')

// timerInterval variable
let timerInterval;

// let time = document.getElementById('#seconds');
let i = 0;


//quiz questions array
const questions = [
  {
    question:
      'Which of the following is the correct HTML tag for the element h1?',
    answers: [
      { text: '<h1>', correct: true },
      { text: '<h2>', correct: false },
      { text: '<h3>', correct: false },
      { text: '<h4>', correct: false },
    ],
  },
  {
    question:
      'Which of the following is the correct HTML tag for an image tag?',
    answers: [
      { text: '<div>', correct: false },
      { text: '<img>', correct: true },
      { text: '<h3>', correct: false },
      { text: '<a>', correct: false },
    ],
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Happy To Make Lasagna', correct: false },
      { text: 'Hope to Meet Love', correct: false },
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Home Tool Markup Language', correct: false },
    ],
  },
  {
    question:
      'Which of the following is the correct HTML tag for a line break?',
    answers: [
      { text: '<break>', correct: false },
      { text: '<boo>', correct: false },
      { text: '<bob>', correct: false },
      { text: '<br>', correct: true },
    ],
  },
]

let shuffledQuestions, currentQuestionIndex
//set time limit for quiz
let secRemaining = 30

//event listener for the start of quiz
startBtn.addEventListener('click', () => {
  startTimer()
  startGame()
  console.log('started')
})

//function to start the timer
function startTimer() {
  

  timerInterval = setInterval(function () {
    secRemaining--

    timeSeconds.textContent = secRemaining + ' SECONDS REMAINING!'

    if (secRemaining === 1) {
      timeSeconds.textContent = secRemaining + ' SECOND REMAINING!'
    }

    if (secRemaining === 0) {
      clearInterval(timerInterval)
      timeSeconds.textContent = 'GAME OVER!'
      saveHighScore()
      document.getElementById('questionContainer').setAttribute('class', 'hide')
      //change to remove class hide
      document.getElementById('finalScoreContainer').removeAttribute('class', 'hide')
    }
  }, 1000)
}
//function to start the game
function startGame() {
  console.log('stargamefunc')
  document.getElementById('startQuiz').setAttribute('class', 'hide')
  //change to remove class hide
  document.getElementById('questionContainer').removeAttribute('class', 'hide')
  timer.removeAttribute('class')
  displayNextQ()
  //if high scores don't exist, create empty array
  let highScores = JSON.parse(localStorage.getItem('highScores'))
  if (!highScores) {
    highScores = []
  }
  createHighScore()
}

//function to display the next question
function displayNextQ() {
  document.getElementById('question').textContent = questions[i].question
  document.getElementById('buttonBox').innerHTML = ''
  let rightOrWrong = document.getElementById('right-or-wrong')
  if (
    rightOrWrong.textContent === 'Correct' ||
    rightOrWrong.textContent === 'Wrong'
  ) {
       //change to remove class hide
    rightOrWrong.removeAttribute('class', 'hide')
  }

  questions[i].answers.forEach(function (answerChoice) {
    var button = document.createElement('button')
    button.setAttribute('class', 'answer')
    button.textContent = answerChoice.text
    button.setAttribute('value', answerChoice.text)
    document.getElementById('buttonBox').append(button)
    button.onclick = checkAnswer
    console.log(button)
  })
}

//function to check answers
function checkAnswer() {
  if (
    this.value !== questions[i].answers.find((answer) => answer.correct).text
  ) {
      //if answer is wrong then also reduce secRemaining by 5
    document.getElementById('right-or-wrong').textContent = 'Wrong!'
    secRemaining -= 5
  } else {
    document.getElementById('right-or-wrong').textContent = 'Correct!'
  }
  i++
  if (i < questions.length) {
    displayNextQ()
    //if there are no more questions end the game
  } else if (i === questions.length) {
    document.getElementById('questionContainer').setAttribute('class', 'hide')
     //change to remove class hide
    document.getElementById('finalScoreContainer').removeAttribute('class', 'hide')
    timer.setAttribute('class', 'hide')
    //create final score text string
    finalScoreUser.textContent = 'Your final score is ' + secRemaining
    clearInterval(timerInterval)
  } else {
    
    console.log('Quiz completed')
  }
}

let highScores = []
//change createhighscore to show no high scores yet
function createHighScore() {
  let scoreListEl = document.getElementById('highScoresList')
  scoreListEl.innerHTML = ''
    //changes high scorelist text to show no high scores yet
  if (highScores.length === 0) {
    
    scoreListEl.textContent = 'No high scores yet!';
  } else {
    for (let i = 0; i < highScores.length; i++) {
      let scoreItem = document.createElement('li')
      scoreItem.textContent = highScores[i].initials + ':' + highScores[i].score // creates an li with initials and score
      scoreListEl.appendChild(scoreItem)
    }
  }
}
//function to save high scores
function saveHighScore() {
  let initials = document.getElementById('initials').value
  let scoreAdd = {
    score: secRemaining,
    initials: initials,
  }
  highScores.push(scoreAdd)
  localStorage.setItem('highScores', JSON.stringify(highScores))
  document.getElementById('initials').value = ''
  createHighScore()
}
//event lister for the submit button
submitButton.addEventListener('click', function (event) {
  event.preventDefault()
  document.getElementById('finalScoreContainer').setAttribute('class', 'hide')
   //change to remove class hide
  document.getElementById('highScoresContainer').removeAttribute('class', 'hide')

  saveHighScore()
})

//event lister for the view high scores button

viewHighScores.addEventListener('click', function () {
  createHighScore()
  document.getElementById('startQuiz').setAttribute('class', 'hide')
  document.getElementById('questionContainer').setAttribute('class', 'hide')
  document.getElementById('finalScoreContainer').setAttribute('class', 'hide')
   //change to remove class hide
  document.getElementById('highScoresContainer').removeAttribute('class', 'hide')
})

//Resets the game
function restartGame() {
  secRemaining = 30
   //change to remove class hide
  document.getElementById('startQuiz').removeAttribute('class', 'hide')
  document.getElementById('highScoresContainer').setAttribute('class', 'hide')
  timer.setAttribute('class', 'hide')
  i = 0
  clearInterval(timerInterval)
}

function clearScores() {
  // localStorage.setItem("highScores", '');
  localStorage.removeItem('highScores')
  clearInterval(timerInterval)

  restartGame()
}
//event listeners for start, restart and clear scores  
startBtn.addEventListener('click', startGame)
goBackButton.addEventListener('click', restartGame)
clearScoresButton.addEventListener('click', clearScores)
