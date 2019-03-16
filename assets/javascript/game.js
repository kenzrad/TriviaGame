var output = [];
var answers;
var userAnswers = [];
var numCorrect = 0;
var currentQuestion = 0;
var gameOn = false;
var count = -1;
var a = 0;

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

$(".keeper").on("click", startGame)
$("#quiz-div").hide();

function startGame() {
    if (gameOn === false) {
        gameOn = true;
        $(".overlay").hide();
        $(".keeper-text").fadeOut(2000);
        setTimeout(function() {
            $(".stand-aside").html("<h3>Ask me the questions, Bridge Keeper!</h3><h1> I am not afraid....</h1>")
            $(".stand-aside").fadeOut(4000);
        }, 2000);
        setTimeout(function() {
            console.log("set timeout");
            buildQuiz();
        }, 7000);
    }
}


function buildQuiz() {
    count++;
    console.log("I'm in the build quiz function!");
    $(".keeper-text").empty();
    $(".quiz-options").remove("#last-question");
    a = count;
    answers = [];
    console.log(answers + "should be empty");
    for(letter in myQuestions[a].answers){
        answers.push(
            `<labels>
            <input
            type = "radio" 
            name = "Question${a}"
            value = "${letter}">
                ${myQuestions[a].answers[letter]} <br>
            </labels>`
        );
        console.log(answers);
    }
    answers = answers.join('');
    console.log(answers);
    $(".keeper-text").show();
    $(".keeper-text").html(`<p>${myQuestions[a].question}</p>`);
    setTimeout (function() {
        $("#quiz-div").show();
        $(".quiz-options").html(answers);
    }, 1000);

}

function collectResults(){
    $("#quiz-div").hide();
    var radioValue = $(`input[name="Question${a}"]:checked`).val();
    userAnswers.push(radioValue);
    console.log([a] + " Result =" + radioValue);
    if (typeof radioValue === "undefined") {
        alert("Please complete all answers before submitting (because I haven't made my code that complicated yet OKAY?!");
        return;        
    }
    checkAnswers();
};

function checkAnswers() {
    if (userAnswers[a] === myQuestions[a].correctAnswer) {
        numCorrect++;
        console.log("Number correct is: " + numCorrect)
        if (numCorrect === 3) {
            $(".keeper-text").empty();
            $(".keeper-text").html(`<h1 class="question">You may pass!</h1>`);
            setTimeout(function() {
                youWin();
            }, 1000);          
        }
        else {
            console.log("Still playing");
            $(".keeper-text").empty();
            $(".quiz-options").empty();
            setTimeout(function() {
                buildQuiz();
            }, 1000);    

        }
    }
    else {
        $(".keeper-text").empty();
        $(".keeper-text").html(`<h1 class="question">HEH HEH HEH!</h1>`);
        setTimeout(function() {
            youLose();
        }, 1000);  
    }
    
};

function youWin() {
    console.log("You win!");
    $("#quiz-div").hide();
    $(".keeper-text").empty();
    $(".keeper-img").attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6tIeLWoW6UYd9nQAFDjQY0uiwcaGuPf6Y8AZiNZSgIf2nryL");
    $("#end-message").text("YOU DID IT!");
};

function youLose() {
    console.log("You lose!");
    $("#quiz-div").hide();
    $(".keeper-text").empty();
    $(".keeper-img").attr("src", "https://i.makeagif.com/media/2-07-2016/oMP7gC.gif");
    $("#end-message").text("SAYONARA!");
};

$("#submit-button").on("click", collectResults)

