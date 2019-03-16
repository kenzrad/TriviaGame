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

$(".keeper").hide();
$("#quiz-div").hide();
$("#end-message").hide();

$("#title-button").on("click", makeKeeper);

function makeKeeper () {
    $("#title-div").fadeOut(2000);
    setTimeout(function() {
        $("#title-div").hide();
        $(".keeper").show();
        $(".keeper-text-under").hide();
        $(".keeper-text-over").hide();
    }, 3000);
    setTimeout(function() {
        $(".keeper-text-under").show();
        $(".keeper-text-stop").hide();
        // $(".keeper").on("click", startGame);
    }, 5000);
    setTimeout(function() {
        startGame();
    }, 8000);
}

function startGame() {
    if (gameOn === false) {
        gameOn = true;
        // $(".overlay").hide();
        $(".keeper-text").fadeOut(2000);
        setTimeout(function() {
            $(".keeper-img").attr("src", "https://www.themarysue.com/wp-content/uploads/2016/08/monty-python-and-the-holy-grail-still2.jpg");
            $(".stand-aside").html("<p>Ask me the questions, Bridge Keeper!<br>I am not afraid....<p>")
            $(".stand-aside").fadeOut(6000);
        }, 3000);
        setTimeout(function() {
            console.log("set timeout");
            $(".keeper-img").attr("src", "https://vignette.wikia.nocookie.net/montypython/images/c/c1/Bridge_of_Death_monty_python_and_the_holy_grail_591679_800_4411271399897.jpg/revision/latest?cb=20130716234623");
            buildQuiz();
        }, 9000);
    }
}


function buildQuiz() {
    count++;
    $(".keeper-text-under").empty();
    $(".keeper-text-over").empty();
    $(".keeper-text-stop").empty();
    $(".quiz-options").remove("#last-question");
    a = count;
    answers = [];
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
    }
    answers = answers.join('');
    $(".keeper-text").show();
    $(".keeper-text-over").show();
    $(".keeper-text-over").html(`<p>${myQuestions[a].question}</p>`);
    setTimeout (function() {
        $("#quiz-div").show();
        $(".quiz-options").html(answers);
    }, 1000);

}

function collectResults(){
    var radioValue = $(`input[name="Question${a}"]:checked`).val();
    userAnswers.push(radioValue);
    console.log([a] + " Result =" + radioValue);
    if (typeof radioValue === "undefined") {
        alert("At least TRY to answer the question!");   
    }
    else {
        $("#quiz-div").hide();
        checkAnswers();
    }
};

function checkAnswers() {
    if (userAnswers[a] === myQuestions[a].correctAnswer) {
        numCorrect++;
        if (numCorrect === 3) {
            $(".keeper-text-over").empty();
            setTimeout(function() {
                youWin();
            }, 2000);          
        }
        else {
            $(".quiz-options").empty();
            setTimeout(function() {
                buildQuiz();
            }, 1000);    

        }
    }
    else {
        setTimeout(function() {
            youLose();
        }, 500);  
    }
    
};

function youWin() {
    $("#quiz-div").hide();
    $(".keeper-text").hide();
    $(".keeper-img").attr("src", "http://images.amcnetworks.com/bbcamerica.com/wp-content/uploads/2015/10/montypyhton.jpg");
    $("#end-message").show();
    $("#end-message").text("YOU DID IT!");
};

function youLose() {
    $("#quiz-div").hide();
    $(".keeper-text").hide();
    $(".keeper-img").attr("src", "https://i.makeagif.com/media/2-07-2016/oMP7gC.gif");
    $("#end-message").show();
    $("#end-message").text("SAYONARA!");
};

$("#submit-button").on("click", collectResults)

