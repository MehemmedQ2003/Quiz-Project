const questionsData = {
    questions: {
        category: {
            img: "category_image.jpg",
            category: "Category Name",
            questions: [
                {
                    id: 1,
                    questionTitle: "Birinci sual",
                    answers: ["Cavab 1", "Cavab 2", "Cavab 3"],
                    correctAnswers: ["Cavab 1"]
                },
                {
                    id: 2,
                    questionTitle: "İkinci sual",
                    answers: ["Cavab A", "Cavab B", "Cavab C"],
                    correctAnswers: ["Cavab B"]
                },
                {
                    id: 3,
                    questionTitle: "Üçüncü sual",
                    answers: ["Cavab A", "Cavab B", "Cavab C"],
                    correctAnswers: ["Cavab B", "Cavab C"]
                }
            ]
        }
    }
};

let userAnswers = {};

function renderQuestions() {
    const questionsContainer = document.getElementById("questions-container");
    const questions = questionsData.questions.category.questions;
    questionsContainer.innerHTML = "";

    questions.forEach((question, index) => {
        const questionCard = document.createElement("div");
        questionCard.classList.add("question-card");
        questionCard.setAttribute("id", `question-card-${index}`);
        questionCard.innerHTML = `
            <h2><b>${question.id}.</b> ${question.questionTitle}</h2>
            <ul class="list-unstyled">
                ${question.answers.map(answer => `
                    <li>
                        <label class="answer-label d-flex align-items-center">
                            <input type="${question.correctAnswers.length === 1 ? "radio" : "checkbox"}"
                                   name="question-${index}"
                                   value="${answer}"
                                   class="mr-2"
                                   onchange="handleAnswerSelect(${index}, '${answer}')">
                            ${answer}
                        </label>
                    </li>`).join("")}
            </ul>
            <div class="result-text mt-3 p-2 bg-light rounded" id="result-${index}" style="display: none;"></div>
        `;
        questionsContainer.appendChild(questionCard);
    });
}

function handleAnswerSelect(questionIndex, answer) {
    if (!userAnswers[questionIndex]) {
        userAnswers[questionIndex] = [];
    }
    const answerIndex = userAnswers[questionIndex].indexOf(answer);
    if (answerIndex > -1) {
        userAnswers[questionIndex].splice(answerIndex, 1);
    } else {
        userAnswers[questionIndex].push(answer);
    }
}

function showResults() {
    const questions = questionsData.questions.category.questions;
    const alert = document.getElementById("alert");
    alert.style.display = Object.keys(userAnswers).length < questions.length ? "block" : "none";

    if (alert.style.display === "none") {
        let correctCount = 0;
        let incorrectCount = 0;

        questions.forEach((question, index) => {
            const correctAnswers = question.correctAnswers.sort().toString();
            const userAnswer = (userAnswers[index] || []).sort().toString();
            const resultText = document.getElementById(`result-${index}`);
            const questionCard = document.getElementById(`question-card-${index}`);
            
            if (userAnswer === correctAnswers) {
                correctCount++;
                resultText.innerText = "Correct";
                resultText.style.display = "block";
                questionCard.classList.add("correct"); // Green background for correct answer
            } else {
                incorrectCount++;
                resultText.innerText = "Incorrect, doğru cavab: " + correctAnswers;
                resultText.style.display = "block";
                questionCard.classList.add("incorrect"); // Red background for incorrect answer
            }
        });

        document.getElementById("correct-count").innerText = `Doğru cavabların sayı: ${correctCount}`;
        document.getElementById("incorrect-count").innerText = `Səhv cavabların sayı: ${incorrectCount}`;
        document.getElementById("results-summary").style.display = "block";
    }
}

window.onload = renderQuestions;