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

const appShell = document.querySelector(".app-shell");
let baseWidth = 0;
let baseHeight = 0;

function cacheBaseDimensions() {
  if (!appShell) return;
  const width = appShell.offsetWidth;
  const height = appShell.offsetHeight;
  baseWidth = Math.max(baseWidth, width);
  baseHeight = Math.max(baseHeight, height);
}

function applyScale() {
  if (!baseWidth || !baseHeight) {
    cacheBaseDimensions();
  }

  if (!baseWidth || !baseHeight) return;

  const styles = window.getComputedStyle(document.body);
  const paddingX = (parseFloat(styles.paddingLeft) || 0) + (parseFloat(styles.paddingRight) || 0);
  const paddingY = (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
  const availableWidth = Math.max(window.innerWidth - paddingX, 1);
  const availableHeight = Math.max(window.innerHeight - paddingY, 1);

  const widthScale = availableWidth / baseWidth;
  const heightScale = availableHeight / baseHeight;
  const scale = Math.min(widthScale, heightScale, 1);
  document.documentElement.style.setProperty("--ui-scale", scale.toFixed(3));
}

window.addEventListener("resize", applyScale);

function initScaling() {
  cacheBaseDimensions();
  applyScale();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  initScaling();
} else {
  document.addEventListener("DOMContentLoaded", initScaling);
}

window.addEventListener("load", initScaling);

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
  cacheBaseDimensions();
  applyScale();
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
  cacheBaseDimensions();
  applyScale();
}

function restartQuiz() {
  resultsScreen.classList.remove("active");
  introScreen.classList.add("active");
  userAnswers = [];
  currentQuestion = 0;
  cacheBaseDimensions();
  applyScale();
}

function returnToStart() {
  quizScreen.classList.remove("active");
  introScreen.classList.add("active");
  userAnswers = [];
  currentQuestion = 0;
  cacheBaseDimensions();
  applyScale();
}

// Event listeners
startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
prevBtn.onclick = prevQuestion;
restartBtn.onclick = restartQuiz;
returnBtn.onclick = returnToStart;
