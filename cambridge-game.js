
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timePerQuestion = 20;
let timer;
let questionCount = 50;

document.addEventListener("DOMContentLoaded", () => {
  generateQuestions();
  loadQuestion();

  document.getElementById("submit").addEventListener("click", checkAnswer);
  document.getElementById("next").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showFinalPopup();
    }
  });
});

function generateQuestions() {
  const operators = ["+", "-", "×", "÷"];
  for (let i = 0; i < questionCount; i++) {
    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question, answer;
    switch (operator) {
      case "+":
        question = `${a} + ${b}`;
        answer = a + b;
        break;
      case "-":
        question = `${a} - ${b}`;
        answer = a - b;
        break;
      case "×":
        question = `${a} × ${b}`;
        answer = a * b;
        break;
      case "÷":
        answer = a;
        question = `${a * b} ÷ ${b}`;
        break;
    }

    questions.push({ question, answer });
  }
}

function loadQuestion() {
  clearInterval(timer);
  const q = questions[currentQuestionIndex];
  document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of ${questionCount}`;
  document.getElementById("question").textContent = q.question;
  document.getElementById("answer").value = "";
  startTimer();

  if (currentQuestionIndex + 1 === 10) {
    setTimeout(showSubscribeModal, 500);
  }
}

function startTimer() {
  let time = timePerQuestion;
  document.getElementById("timer").textContent = `Time Left: ${time}s`;

  timer = setInterval(() => {
    time--;
    document.getElementById("timer").textContent = `Time Left: ${time}s`;
    if (time <= 0) {
      clearInterval(timer);
      showFeedback(false, "Time's up!");
    }
  }, 1000);
}

function checkAnswer() {
  clearInterval(timer);
  const userAnswer = parseInt(document.getElementById("answer").value);
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    score++;
    showFeedback(true, "Correct!");
  } else {
    showFeedback(false, `Incorrect! Correct answer is ${correctAnswer}`);
  }
}

function showFeedback(correct, message) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.style.color = correct ? "green" : "red";
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("next").style.display = "block";
}

function showFinalPopup() {
  const message = `Well done! You scored ${score} out of ${questionCount}. Proceed to next level?`;
  if (confirm(message)) {
    alert("Please wait as the next game uploads...");
    window.location.href = "next-math-topic.html"; // Update with actual next page
  } else {
    window.location.href = "index.html";
  }
}

function showSubscribeModal() {
  const modal = document.createElement("div");
  modal.innerHTML = `
    <div style="position:fixed;top:0;left:0;width:100%;height:100%;
    background-color:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;z-index:1000;">
      <div style="background:#fff;padding:20px;border-radius:10px;text-align:center;">
        <h2>Subscribe</h2>
        <p>Please enter parent's email to subscribe and continue</p>
        <input type="email" id="subscribeEmail" placeholder="Parent Email" style="padding:8px;width:80%;">
        <br><br>
        <button onclick="document.body.removeChild(this.parentNode.parentNode)">Submit</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
