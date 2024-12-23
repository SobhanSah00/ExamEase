const questionBank = {
  c: [
    {
      question: "What is the correct syntax to print 'Hello World' in C?",
      options: [
        "printf('Hello World');",
        "System.out.println('Hello World');",
        "echo 'Hello World';",
        "print('Hello World');",
      ],
      correct: 0,
    },
    {
      question: "Which data type is used to store decimal values in C?",
      options: ["int", "float", "char", "void"],
      correct: 1,
    },
    {
      question: "Which header file is required to use printf() and scanf()?",
      options: ["stdio.h", "stdlib.h", "conio.h", "math.h"],
      correct: 0,
    },
    {
      question: "What is the size of an int data type in C (typically)?",
      options: ["4 bytes", "8 bytes", "2 bytes", "1 byte"],
      correct: 0,
    },
    {
      question: "How do you declare a pointer in C?",
      options: ["int *p;", "int p*;", "*int p;", "int p[];"],
      correct: 0,
    },
    {
      question: "What is used to end every statement in C?",
      options: ["Period", "Comma", "Semicolon", "Colon"],
      correct: 2,
    },
    {
      question: "Which function is used to allocate memory dynamically?",
      options: ["malloc", "calloc", "free", "Both malloc and calloc"],
      correct: 3,
    },
    {
      question: "What does the 'continue' keyword do in C?",
      options: [
        "Terminates the loop",
        "Skips the current iteration",
        "Exits the program",
        "Restarts the loop",
      ],
      correct: 1,
    },
    {
      question: "What is the output of 10 % 3 in C?",
      options: ["0", "1", "3", "10"],
      correct: 1,
    },
    {
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "None of the above"],
      correct: 2,
    },
  ],
  java: [
    {
      question: "What is the default value of a boolean variable in Java?",
      options: ["true", "false", "0", "null"],
      correct: 1,
    },
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "Class", "struct", "define"],
      correct: 0,
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: ["start()", "run()", "main()", "init()"],
      correct: 2,
    },
    {
      question: "What is the size of a char data type in Java?",
      options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
      correct: 1,
    },
    {
      question:
        "Which exception is thrown when an array is accessed with an invalid index?",
      options: [
        "ArrayIndexOutOfBoundsException",
        "NullPointerException",
        "ClassCastException",
        "IllegalStateException",
      ],
      correct: 0,
    },
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["extends", "implements", "inherits", "super"],
      correct: 0,
    },
    {
      question: "Which package is imported by default in every Java program?",
      options: ["java.lang", "java.util", "java.io", "java.net"],
      correct: 0,
    },
    {
      question: "What does JVM stand for?",
      options: [
        "Java Virtual Machine",
        "Java Variable Machine",
        "Java Version Manager",
        "Java Vector Model",
      ],
      correct: 0,
    },
    {
      question:
        "Which access modifier allows visibility within the same package?",
      options: ["private", "public", "protected", "default"],
      correct: 3,
    },
    {
      question: "What is the return type of the compareTo() method in Java?",
      options: ["boolean", "int", "String", "void"],
      correct: 1,
    },
  ],
  python: [
    {
      question: "Which of the following is used to start a function in Python?",
      options: ["def", "func", "function", "lambda"],
      correct: 0,
    },
    {
      question: "What is the output of print(2 ** 3)?",
      options: ["6", "8", "9", "16"],
      correct: 1,
    },
    {
      question: "Which of the following is a mutable data type in Python?",
      options: ["tuple", "list", "string", "int"],
      correct: 1,
    },
    {
      question: "What is the correct file extension for Python files?",
      options: [".py", ".python", ".pt", ".txt"],
      correct: 0,
    },
    {
      question: "How do you insert comments in Python?",
      options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
      correct: 2,
    },
    {
      question: "Which method is used to add an element to a list?",
      options: ["append()", "add()", "insert()", "push()"],
      correct: 0,
    },
    {
      question: "What is the output of print(len('hello'))?",
      options: ["3", "4", "5", "6"],
      correct: 2,
    },
    {
      question: "What is the purpose of the pass statement in Python?",
      options: [
        "Break the loop",
        "Continue to the next iteration",
        "Do nothing",
        "Exit the program",
      ],
      correct: 2,
    },
    {
      question: "What does the range(5) function return?",
      options: [
        "[0, 1, 2, 3, 4, 5]",
        "[1, 2, 3, 4, 5]",
        "[0, 1, 2, 3, 4]",
        "[5, 4, 3, 2, 1]",
      ],
      correct: 2,
    },
    {
      question: "What is the output of print(type([]))?",
      options: [
        "<class 'list'>",
        "<class 'dict'>",
        "<class 'tuple'>",
        "<class 'set'>",
      ],
      correct: 0,
    },
  ],
};

let currentSubject = "";
let currentQuestion = 0;
let userAnswers = [];
let timer;

function showSection(sectionId) {
  document
    .querySelectorAll(
      ".instructions-page, .container, #exam-interface, .results-page"
    )
    .forEach((section) => section.classList.add("hidden"));

  if (sectionId === "subject-selection") {
    document.getElementById("subject-selection").classList.remove("hidden");
  } else {
    document.getElementById(sectionId).classList.remove("hidden");
  }
}

function startExam(subject) {
  currentSubject = subject;
  currentQuestion = 0;
  userAnswers = new Array(questionBank[subject].length).fill(null);
  showSection("exam-interface");
  setupQuestionGrid();
  showQuestion(0);
  startTimer();
}

function setupQuestionGrid() {
  const grid = document.getElementById("question-grid");
  grid.innerHTML = "";
  for (let i = 0; i < questionBank[currentSubject].length; i++) {
    const btn = document.createElement("div");
    btn.className = "question-number";
    btn.textContent = i + 1;
    btn.onclick = () => showQuestion(i);
    grid.appendChild(btn);
  }
}

function showQuestion(index) {
  currentQuestion = index;
  const question = questionBank[currentSubject][index];
  const container = document.getElementById("question-container");

  let html = `
        <h2>Question ${index + 1}</h2>
        <p class="question-text">${question.question}</p>
        <div class="options-list">
    `;

  question.options.forEach((option, i) => {
    html += `
            <label class="option">
                <input type="radio" name="question" value="${i}" 
                    ${userAnswers[index] === i ? "checked" : ""}>
                ${option}
            </label>
        `;
  });

  html += `
        </div>
        <div class="navigation-buttons">
            ${
              index > 0
                ? '<button class="btn btn-secondary" onclick="showQuestion(currentQuestion - 1)">Previous</button>'
                : ""
            }
            ${
              index < questionBank[currentSubject].length - 1
                ? '<button class="btn btn-primary" onclick="nextQuestion()">Next</button>'
                : '<button class="btn btn-primary" onclick="submitExam()">Submit Exam</button>'
            }
        </div>
    `;

  container.innerHTML = html;

  // Add event listener for radio buttons to update grid when answer is selected
  const radioButtons = container.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      userAnswers[currentQuestion] = parseInt(radio.value);
      updateQuestionGrid();
    });
  });

  updateQuestionGrid();
}

function nextQuestion() {
  const selected = document.querySelector('input[name="question"]:checked');
  if (selected) {
    userAnswers[currentQuestion] = parseInt(selected.value);
  }
  showQuestion(currentQuestion + 1);
}

function updateQuestionGrid() {
  const buttons = document.querySelectorAll(".question-number");
  buttons.forEach((btn, index) => {
    // Remove all existing status classes
    btn.classList.remove("current", "attempted");

    // Add appropriate classes based on status
    if (index === currentQuestion) {
      btn.classList.add("current");
    }
    if (userAnswers[index] !== null) {
      btn.classList.add("attempted");
    }
  });
}

function startTimer() {
  let timeLeft = 30 * 60; // 30 minutes
  const timerElement = document.getElementById("timer");

  timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time Remaining: ${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (timeLeft === 0) {
      submitExam();
    }
    timeLeft--;
  }, 1000);
}

function submitExam() {
  clearInterval(timer);
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questionBank[currentSubject][index].correct) {
      score++;
    }
  });

  const percentage = (score / questionBank[currentSubject].length) * 100;
  document.getElementById("score-display").innerHTML = `
                <p>Your Score: ${score}/${
    questionBank[currentSubject].length
  }</p>
                <p>Percentage: ${percentage.toFixed(2)}%</p>
                <p>${percentage >= 60 ? "Passed!" : "Failed!"}</p>
            `;

  showSection("results-page");
}

//   Start with instructions
showSection("instructions-page");
