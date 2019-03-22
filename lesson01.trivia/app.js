const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const btn = document.querySelector('#btn');

let acceptAnswer = false;

const currentQuestion = {
    question: 'How do you write "Hello World" in an alert box?',
    choice1: 'msg("Hello World")',
    choice2: 'alertBox("Hello World")',
    choice3: 'msgBox("Hello World")',
    choice4: 'alert("Hello World")',
    answer: 4
};

initQuiz = () => {
    getNewQuestion();
};

const getNewQuestion = () => {
    question.textContent = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.textContent = currentQuestion['choice' + number];
    });

    acceptAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', event => {
        if (!acceptAnswer) return;

        acceptAnswer = false;
        const selectedChoice = event.target;
        console.log(selectedChoice);
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);

        if (!(selectedAnswer == currentQuestion.answer)) {
            btn.classList.toggle('hidden');
            btn.classList.add('visible');
        }
    });
});

const newQuiz = () => {
    window.location.assign('./');
};

btn.addEventListener('click', () => {
    newQuiz();
});

initQuiz();
