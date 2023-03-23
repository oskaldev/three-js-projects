const data = [
  {
    id: 1,
    question: "Сколько будет 2+2 ?",
    answers: [
      { answer: "4", isCorrect: true },
      { answer: "2", isCorrect: false },
      { answer: "1", isCorrect: false },
      { answer: "3", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "Сколько будет 5+1 ?",
    answers: [
      { answer: "1", isCorrect: false },
      { answer: "2", isCorrect: false },
      { answer: "6", isCorrect: true },
      { answer: "7", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "Сколько будет 2+8 ?",
    answers: [
      { answer: "9", isCorrect: false },
      { answer: "10", isCorrect: true },
      { answer: "11", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "Сколько будет 6+9 ?",
    answers: [
      { answer: "20", isCorrect: false },
      { answer: "15", isCorrect: true },
      { answer: "16", isCorrect: false },
    ],
  },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
  qIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  total = 0;
  selectedAnswer;
  showQuestion(0);
};
play.addEventListener("click", () => {
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";
  playAgain();
})


const showResult = () => {
  resultScreen.style.display = "block";
  gameScreen.style.display = "none";

  resultScreen.querySelector(".correct").textContent = `Правильных ответов: ${correctCount}`;
  resultScreen.querySelector(".wrong").textContent = `Не правильных ответов: ${wrongCount}`;
  resultScreen.querySelector(".score").textContent = `Оценка: ${correctCount / qIndex * 100}`;
}

const showQuestion = (qNumber) => {
  if (qIndex === data.length) return showResult();
  selectedAnswer = null;
  question.textContent = data[ qNumber ].question
  answersContainer.innerHTML = data[ qNumber ].answers.map((item, index) =>
    ` <div class="answer">
      <input name="answer" type="radio" id="${index}" value="${item.isCorrect}">
        <label for="${index}">${item.answer}</label>
    </div>`
  ).join("\r\n");

  selectAnswer();
}

const selectAnswer = () => {
  answersContainer.querySelectorAll("input").forEach(el => {
    el.addEventListener("click", (e) => {
      selectedAnswer = e.target.value;
    })
  })
}

const submitAnswer = () => {
  submit.addEventListener("click", () => {
    if (selectedAnswer !== null) {
      selectedAnswer === "true" ? correctCount++ : wrongCount++;
      qIndex++;
      showQuestion(qIndex);
    } else {
      alert("Пожалуйста выберите ответ")
    }
  });
}

showQuestion(qIndex);
submitAnswer();

