
//change this part to jQuery, parts later are not working with that so I need to figure out the semantics
var quizContainer = document.getElementById('quiz-div');
var resultsContainer = document.getElementById('results-div');
var submitButton = document.getElementById('submit-div');

var output = [];
var answers;
var userAnswers = [];
var numCorrect = 0;
var currentQuestion = 0;

var myQuestions = [
    {
        question: "What is your name?",
        answers: {
            a: "Blue!",
            b: "Arthur, King of the Britts!",
            c: "I've got a lovely bunch of coconuts",
        },
        correctAnswer: "b"
    },
    {
        question: "What is your favorite color?",
        answers: {
            a: "Blue!",
            b: "Blu...no yellow!",
            c: "Darkness",
        },
        correctAnswer: "a"
    },
    {
        question: "What is the airspeed velocity of an unladen swallow?",
        answers: {
            a: "11 mps",
            b: "African or European?",
            c: "Assryia",
        },
        correctAnswer: "b"
    },
];



//////FUNCTION --> BUILD QUIZ////////
//this function will build the quiz questions and display on the DOC
function buildQuiz() {

    //Store html output (answers)
    for(var i=0; i<myQuestions.length; i++){
        answers = [];
        for(letter in myQuestions[i].answers){
            answers.push(
                `<labels>
                <input
                type = "radio" 
                name = "Question${i}"
                value = "${letter}">
                    ${myQuestions[i].answers[letter]} <br>
                </labels>`
            );
        }
        output.push(
            `<div class="question">${i+1}: ${myQuestions[i].question}</div>
            <div class="answers">${answers.join('')}<br></div>`
        );
    }
    //output join wasn't working for me using jQuery
    quizContainer.innerHTML = output.join('');
}

function collectResults(){
    for(var i=0; i < myQuestions.length; i++){
        var radioValue = $(`input[name="Question${i}"]:checked`).val();
        userAnswers.push(radioValue);
        console.log([i] + " Result =" + radioValue);
        if (typeof radioValue === "undefined") {
            alert("Please complete all answers before submitting (because I haven't made my code that complicated yet OKAY?!");
            return;        
        }
    }
    checkAnswers();
};

function checkAnswers() {
    for(var i=0; i < myQuestions.length; i++){
        if (userAnswers[i] === myQuestions[i].correctAnswer) {
            numCorrect++;
        }
    }
    console.log(numCorrect);
    resultsContainer.innerHTML = "Your Results: " + numCorrect + " out of " + myQuestions.length;
    //clearQuiz()
}

//function clearQuiz() {}

buildQuiz(myQuestions, quizContainer); 
$("#submit-button").on("click", collectResults)

