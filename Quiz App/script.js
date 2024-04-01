// below array will contain questions, options and the right option
const questions =[
    {
        question: "Which is the largest animal in the world?",
        answers:[
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers:[
            { text: "Vatican city", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Sri Lanka", correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers:[
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antartica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            { text: "Asia", correct: false},
            { text: "Africa", correct: false},
            { text: "Australia", correct: true},
            { text: "Artic", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    //removes the last question's options when user goes to next question
    resetState();
    //displays questions
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;

    //adds option on the btns and it iterates over every option and stores the boolean values
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //it stores the value in btn dataset for true ans
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

////removes the last question's options when user goes to next question
function resetState(){
nextButton.style.display = "none";
while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
}
}

//if the clicked ans is correct then the css will add and score will increase otherwise only turn it to red
function selectAnswer(e){
const selectedButton = e.target;
const isCorrect = selectedButton.dataset.correct === "true";
if(isCorrect){
    selectedButton.classList.add("correct");
    score++;
}
else{
    selectedButton.classList.add("incorrect");
}

//once you select an option if it is wrong then right one will highlight
Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
//once you click on an opt the next btn comes up
   nextButton.style.display = "block";                         

}

//it will show score in the end
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//this func will check if there is next qs, if yes then it will print otherwise it will show score
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
//this event is trigger when you press next button
nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();

