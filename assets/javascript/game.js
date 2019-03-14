//Defining constants - need to understand the advantage to constants vs vars, but still a little hairy on this
var quizContainer = document.getElementById('quiz-div');
var resultsContainer = document.getElementById('results-div');
var submitButton = document.getElementById('submit-div');
var output = [];
var answers;
var userAnswers = [];
var numCorrect = 0;
var myQuestions = [
    {
        question: "What is 2+2?",
        answers: {
            a: "1",
            b: "2",
            c: "4",
        },
        correctAnswer: "c"
    },
    {
        question: "What is 6+2?",
        answers: {
            a: "2",
            b: "4",
            c: "8",
        },
        correctAnswer: "c"
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
                id = "Q${i}"
                type = "radio" 
                name = "Question${i}" 
                value = "${letter}">
                    ${letter} : ${myQuestions[i].answers[letter]}
                </labels>`
            );
        }
        output.push(
            `<div class="question">${myQuestions[i].question}</div>
            <div class="question">${answers.join('')}</div>`
        );
    }
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
    resultsContainer.innerHTML = "Results: " + numCorrect + " out of " + myQuestions.length;
    //clearQuiz()
}

//function clearQuiz() {}

buildQuiz(myQuestions, quizContainer); 
$("#submit-button").on("click", collectResults)

