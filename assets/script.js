// Create a class for quiz
class Quiz {
    // every time the quiz is taken, there is a score, questions asked and an index of questions
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        // check which question user is on
        return this.questions[this.questionIndex];
    }

    // when user clicks on an answer
    guess(answer) {
        // if answer is correct, increase score by 1
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        } else {
            quizTime -= 60;
        }
        // go to the next question
        this.questionIndex++;
    }

    // the quiz is over when questionIndex and questions.length both equal 0
    isEnded() {
        return this.questionIndex === this.questions.length
    }

}

// Create a class for questions
class Question {
    // for every question, there is text, a number of choices and the answer selected
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    // the user's choice is correct if it the exact same as this.answer
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// Display the question
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show the next question
        let questionElement =document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options for user to choose
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

// Guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

// Show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

// Show score
function showScores() {
    let quizEndHTML =
       `
           <h1>Quiz Complete</h1>
           <h2>You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
           <div class="quiz-repeat">
              <a href="index.html">Try The Quiz Again</a>
           </div>
       `;
       let quizElement = document.getElementById("quiz");
       quizElement.innerHTML = quizEndHTML;

       scoreStorage();
    
};

function scoreStorage() {
    localStorage.setItem("quiz.score", JSON.stringify(quiz.score))
}

// Create questions
let questions = [
    new Question(
        "What is considered the 'skeleton' code of a website?", ["JQuery", "Bootstrap", "CSS", "HTML"], "HTML" // correct answer outside of array
    ),
    new Question(
        "What gives a website its style?", ["CSS", "HTML", "Adobe", "Markup"], "CSS"
    ),
    new Question(
        "Which choice is an example of the proper way to write a function?", ["function showScore()", "function show Score()", "function showScore[]", "function ShowScore ()"], "function showScore()"
    ),
    new Question(
        "Which type of brackets holds an array?", ["( )", "{ }", "[ ]", "< >"], "[ ]"
    ),
    new Question(
        "What does the 'for' start in JavaScript?", ["a loop", "a string", "an array", "an object"], "a loop"
    ),
    new Question(
        "Which of the following is NOT a JavaScript data type", ["Number", "String", "Boolean", "Letter"], "Letter"
    ),
    new Question(
        "What is the use of a prompt box?", ["to call a function", "to alert the user", "to allow a user to enter input", "to stop a function"], "to allow a user to enter input"
    ),
    new Question(
        "What does the '===' operator mean?", ["somewhat equal", "absolutely equal", "not equal", "greater than equal"], "absolutely equal"
    ),
    new Question(
        "Which is the correct way to submit a form in JavaScript", ["document.text[0].submit();", "submit.form()", "document.form[0].submit();", "submit.doc[0]"], "document.form[0].submit();"
    ),
    new Question(
        "Which is NOT a looping structure in JavaScript?", ["for", "while", "do-while", "this"], "this"
    )
]

// Initialize quiz
let quiz = new Quiz(questions);

// display question
displayQuestion();

// Add timer
let time = 10;
let quizTimeMinutes = time * 60 * 60;
quizTime = quizTimeMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `Time: ${min} : ${sec}`;
        }
    }, 1000)
}

startCountdown();
