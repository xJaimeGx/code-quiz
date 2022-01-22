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
        }
        // go to the next question
        this.questionIndex++;
    }

    // the quiz is over when questionIndex and questions.length both equal 0
    isEnded() {
        return this.questionIndex === this.questions.length
    }
};

// Create a class for questions
class Question {
    // for every question, there is text, a number of choices and the answer selected
    constructor (text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    // the user's choice is correct if it the exact same as this.answer
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
};

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
};

// Guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// Show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.question.length}`;
};

// Show score
function showScores() {
    let quizEndHTML =
       `
           <h1>Quiz Complete</h1>
           <h2> id="score">You Scored: ${quiz.score} of ${quiz.question.length}</h2>
           <div class="quiz-repeat">
              <a href="index.html">Try The Quiz Again</a>
           </div>
       `;
       let quizElement = document.getElementById("quiz");
       quizElement.innerHTML = quizEndHTML;
};

// Create questions
let questions = {
    //new Question(
        ""
    )
}