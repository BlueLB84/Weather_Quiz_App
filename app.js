const STATE = {
    questions: [
        {
        question: 'What type of cloud signifies a thunderstorm?',
        answers: ['nimbostratus','alto cumulus','cumulonimbus','cirrus'],
        correctIndex: 2,
        img: 'images/cumulonimbus_img.jpg',
        alt: 'cumulonimbus cloud'
        },
        {
        question: 'What is the name of a scientist who studies weather?',
        answers: ['cloudologist','weatherologist','stormologist','meteorologist'],
        correctIndex: 3,
        img: 'images/meteorologist_img.jpg',
        alt: 'news meteorologist'
        },
        {
        question: 'What does an anemometer measure?',
        answers: ['precipitation','wind','air pressure','temperature'],
        correctIndex: 1,
        img: 'images/anemometer_img.jpg',
        alt: 'anemometer'
        },
        {
        question: 'What do you call the well-known radar signature for tornadic supercells?',
        answers: ['hook echo','bow echo','tornado echo','storm echo'],
        correctIndex: 0,
        img: 'images/radar_img.png',
        alt: 'weather radar hook echo'
        },
        {
        question: 'What measurement is defined as the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature?',
        answers: ['temperature','relative humidity','dew point depression','station pressure'],
        correctIndex: 1,
        img: 'images/watervapor_img.jpg',
        alt: 'condensation on glass'
        },
        {
        question: 'What do you call a large tropical storm system with high-powered circular winds?',
        answers: ['tornado','cold front','tempest','hurricane'],
        correctIndex: 3,
        img: 'images/hurricane_img.jpg',
        alt: 'hurricane in Gulf of Mexico'
        },
        {
        question: 'What is the colloquial term for the area of the United States where tornadoes are most frequent?',
        answers: ['tornado gutter','tornado alley','tornado street','tornado highway'],
        correctIndex: 1,
        img: 'images/tornado_map_img.jpg',
        alt: 'density map of tornados in United States'
        },
        {
        question: 'What term is defined as a rising of the sea as a result of atmospheric pressure changes and wind associated with a storm?',
        answers: ['storm attack','storm flood','storm surge','storm wave'],
        correctIndex: 2,
        img: 'images/stormsurge_img.jpg',
        alt: 'storm surge along coastal town'
        },
        {
        question: 'What is the common term for a sky with rows of cirrocumulus or altocumulus clouds displaying an undulating, rippling pattern similar in appearance to fish scales?',
        answers: ['fisherman\'s sky','bubblegum sky','mackerel sky','popcorn sky'],
        correctIndex: 2,
        img: 'images/sunset_img.jpg',
        alt: 'mackerel sky at sunset'
        },
        {
        question: 'What do you call a sudden electrostatic discharge that occurs during a thunderstorm?',
        answers: ['thunder','static boom','flashbang','lightning'],
        correctIndex: 3,
        img: 'images/lightning_img.jpg',
        alt: 'lightning at night over city'
        },
    ],
    questionOrder: randomArrayGenerator(),
    currentQuestion: 0,
    userScore: 0,
    lastQuestionCorrect: null,
    route: 'start'
};

function randomArrayGenerator(){
    let tempArray = [];
    for (let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], i = a.length; i--;) {
        let random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        tempArray.push(random);
    }
    return tempArray;
}

const PAGE_VIEWS = {
    'start': $('.js-start-page'),
    'questions': $('.js-question-page'),
    'answer-feedback': $('.js-feedback-page'),
    'final-feedback': $('.js-results-page')
};

function renderQuiz(state, elements) {
    Object.keys(elements).forEach(function(route) {
        elements[route].hide();
    });
    elements[state.route].show();

    switch (state.route) {
        case 'start':
            document.getElementById('start-button').focus();
            break;
        case 'questions':
            renderQuestionPage(state, elements[state.route]);
            break;
        case 'answer-feedback':
            renderAnswerFeedbackPage(state, elements[state.route]);
            break;
        case 'final-feedback':
            renderFinalFeedbackPage(state, elements[state.route]);
    }
}


$('.js-start-button').on('click', event => {
    event.preventDefault();
    STATE.route = 'questions';
    renderQuiz(STATE, PAGE_VIEWS);
});

function renderQuestionPage (state, element) {
    let currentQuestion = state.questions[state.questionOrder[state.currentQuestion]];
    let choices = currentQuestion.answers.map(function(answer, index) {
        return (
            `
            <input type="radio" name="weather-answer" value="${index}" id="choice-${index}" required/><label for="choice-${index}" class="answer-input"> ${answer}</label>
            <br>
            `
        );
    });
    $('.js-current-question-index').text(`${state.currentQuestion + 1}`);
    $('.js-current-question').text(`${currentQuestion.question}`);
    $('.js-answer-choices').html(choices);
    $('.js-answer-choices input:first-child').attr('checked', true);
    document.getElementById("choice-0").focus();
}

$('.js-answer-submit').click(function(event) {
    event.preventDefault();
    let currentQuestion = STATE.questions[STATE.questionOrder[STATE.currentQuestion]];
    let answer = $('input[name=\'weather-answer\']:checked').val();
    answer = parseInt(answer, 10);
    STATE.lastQuestionCorrect = (answer === STATE.questions[STATE.questionOrder[STATE.currentQuestion]].correctIndex);
    STATE.route = 'answer-feedback';
    renderQuiz(STATE, PAGE_VIEWS);
});

function updateImgAttributes (src, alt) {
    $('.answer-feedback-image').attr('src', src).attr('alt', alt);
}

function renderAnswerFeedbackPage (state, element) {
    let currentQuestion = state.questions[state.questionOrder[state.currentQuestion]];
    if (state.lastQuestionCorrect) {
        let correct = `Correct!<br>The answer is ${currentQuestion.answers[currentQuestion.correctIndex]}!`;
        $('.js-answer-feedback').html(correct);
        state.userScore++;
    } else {
        let incorrect = `Incorrect<br>The correct answer is ${currentQuestion.answers[currentQuestion.correctIndex]}!`;
        $('.js-answer-feedback').html(incorrect);
    }
    $('.js-current-score').text(`${state.userScore}`);
    state.currentQuestion = (state.currentQuestion)+1;
    const SRC = currentQuestion.img;
    const ALT = currentQuestion.alt;
    updateImgAttributes(SRC, ALT);
    document.getElementById('next-button').focus();
}

$('.js-next-submit').click(function(event) {
    if (STATE.currentQuestion <= 9) {
        STATE.route = 'questions';
    } else {
        STATE.route = 'final-feedback';
    }
    renderQuiz(STATE, PAGE_VIEWS);
})

function renderFinalFeedbackPage (state, element) {
    $('.js-final-score').text(`${STATE.userScore}`)
}

function handleRestartQuiz() {
    STATE.questionOrder = randomArrayGenerator();
    STATE.currentQuestion = 0;
    STATE.userScore = 0;
    STATE.lastQuestionCorrect = null;
    document.getElementById('current-question').reset();
}

$('.js-restart-quiz-submit').click(function(event) {
    event.preventDefault();
    handleRestartQuiz();
    STATE.route = 'start';
    renderQuiz(STATE, PAGE_VIEWS);
});

$(document).ready(function() {
    renderQuiz(STATE, PAGE_VIEWS);
});