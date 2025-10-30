const introScreen = document.getElementById("intro");
const quizScreen = document.getElementById("quiz");
const resultsScreen = document.getElementById("results");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const returnBtn = document.getElementById("return-btn");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultsText = document.getElementById("results-text");

// Temporary test questions — replace later with full data set
const quizData = [
  {
    question: "How do you take your caffeine?",
    answers: ["Strong and bold", "Mild and balanced", "No caffeine please"],
  },
  {
    question: "What flavors do you vibe with?",
    answers: ["Citrus & bright", "Earthy & deep", "Floral & soft", "Spiced & warm"],
  },
  {
    question: "Pick your current goal:",
    answers: ["Better sleep", "More focus", "Less stress", "Digestive balance"],
  },
];

let currentQuestion = 0;
let userAnswers = [];

function showQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      userAnswers[currentQuestion] = ans;
    };
    answersEl.appendChild(btn);
  });

  prevBtn.style.display = currentQuestion === 0 ? "none" : "block";
  nextBtn.style.display = currentQuestion === quizData.length - 1 ? "none" : "block";
}

function startQuiz() {
  introScreen.classList.remove("active");
  quizScreen.classList.add("active");
  currentQuestion = 0;
  showQuestion();
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    finishQuiz();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function finishQuiz() {
  quizScreen.classList.remove("active");
  resultsScreen.classList.add("active");

  resultsText.textContent = "You’d love Green teas with floral or citrus notes!";
}

function restartQuiz() {
  resultsScreen.classList.remove("active");
  introScreen.classList.add("active");
  userAnswers = [];
  currentQuestion = 0;
}

function returnToStart() {
  quizScreen.classList.remove("active");
  introScreen.classList.add("active");
  userAnswers = [];
  currentQuestion = 0;
}

// Event listeners
startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
prevBtn.onclick = prevQuestion;
restartBtn.onclick = restartQuiz;
returnBtn.onclick = returnToStart;
