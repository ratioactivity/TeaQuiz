const introScreen = document.getElementById("intro");
const quizScreen = document.getElementById("quiz");
const resultsScreen = document.getElementById("results");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultsText = document.getElementById("results-text");

// Temporary questions (we’ll replace with your real quiz next)
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

  q.answers.forEach((ans, index) => {
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

startBtn.onclick = () => {
  introScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
};

nextBtn.onclick = () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    finishQuiz();
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
};

function finishQuiz() {
  quizScreen.classList.remove("active");
  resultsScreen.classList.add("active");

  // Placeholder logic — replace with tea logic later
  resultsText.textContent = "You’d love Green teas with floral or citrus notes!";
}

restartBtn.onclick = () => {
  resultsScreen.classList.remove("active");
  introScreen.classList.add("active");
  userAnswers = [];
  currentQuestion = 0;
};

const returnBtn = document.getElementById("return-btn");

returnBtn.onclick = () => {
  quizScreen.classList.remove("active");
  introScreen.classList.add("active");
  currentQuestion = 0;
  userAnswers = [];
};
