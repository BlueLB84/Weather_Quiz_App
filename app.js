const STATE = {
    questions: [
        {
        question: 'What type of cloud signifies a thunderstorm?',
        answers: ['nimbostratus','alto cumulus','cumulonimbus','cirrus'],
        correctIndex: 2,
        img: 'http://static.wixstatic.com/media/6bc624_aae337b704db450794c1f4c4e35e2285~mv2.jpg',
        alt: 'cumulonimbus cloud'
        },
        {
        question: 'What is the name of a scientist who studies weather?',
        answers: ['cloudologist','weatherologist','stormologist','meteorologist'],
        correctIndex: 3,
        img: 'http://www.adweek.com/tvspy/wp-content/uploads/sites/4/2016/12/578982397_1280x720-862x485.jpg',
        alt: 'news meteorologist'
        },
        {
        question: 'What does an anemometer measure?',
        answers: ['precipitation','wind','air pressure','temperature'],
        correctIndex: 1,
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Wea00920.jpg',
        alt: 'anemometer'
        },
        {
        question: 'What do you call the well-known radar signature for tornadic supercells?',
        answers: ['hook echo','bow echo','tornado echo','storm echo'],
        correctIndex: 0,
        img: 'http://3.bp.blogspot.com/-t13hMqAP0XU/TbpWV697WPI/AAAAAAAABrg/Ul0vY81X2Zw/s1600/720AL.png',
        alt: 'weather radar hook echo'
        },
        {
        question: 'What measurement is defined as the amount of water vapor present in air expressed as a percentage of the amount needed for saturation at the same temperature?',
        answers: ['temperature','relative humidity','dew point depression','station pressure'],
        correctIndex: 1,
        img: 'https://aos.iacpublishinglabs.com/question/aq/1400px-788px/happens-water-vapor-cools_b93d1ab57cba68ad.jpg?domain=cx.aos.ask.com',
        alt: 'condensation on glass'
        },
        {
        question: 'What do you call a large tropical storm system with high-powered circular winds?',
        answers: ['tornado','cold front','tempest','hurricane'],
        correctIndex: 3,
        img: 'https://bloximages.newyork1.vip.townnews.com/theadvocate.com/content/tncms/assets/v3/editorial/9/67/96768492-2da4-5ac6-b50c-3996195717e6/57742e8d07e21.image.jpg',
        alt: 'hurricane in Gulf of Mexico'
        },
        {
        question: 'What is the colloquial term for the area of the United States where tornadoes are most frequent?',
        answers: ['tornado gutter','tornado alley','tornado street','tornado highway'],
        correctIndex: 1,
        img: 'http://modernsurvivalblog.com/wp-content/uploads/2017/05/tornado-map-usa.jpg',
        alt: 'density map of tornados in United States'
        },
        {
        question: 'What term is defined as a rising of the sea as a result of atmospheric pressure changes and wind associated with a storm?',
        answers: ['storm attack','storm flood','storm surge','storm wave'],
        correctIndex: 2,
        img: 'https://news.agu.org/files/2015/02/1938-Woods-Hole.jpg',
        alt: 'storm surge along coastal town'
        },
        {
        question: 'What is the common term for a sky with rows of cirrocumulus or altocumulus clouds displaying an undulating, rippling pattern similar in appearance to fish scales?',
        answers: ['fisherman\'s sky','bubblegum sky','mackerel sky','popcorn sky'],
        correctIndex: 2,
        img: 'http://photos.capturewisconsin.com/photos/M-y4htsYyuo-LZPbxOjN8Q/showcase.jpg',
        alt: 'mackerel sky at sunset'
        },
        {
        question: 'What do you call a sudden electrostatic discharge that occurs during a thunderstorm?',
        answers: ['thunder','static boom','flashbang','lightning'],
        correctIndex: 3,
        img: 'http://cdn.inquisitr.com/wp-content/uploads/2016/05/lightning-storm-deaths.jpg',
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
    // default to hiding all routes, then show the current route
    Object.keys(elements).forEach(function(route) {
        elements[route].hide();
    });
    elements[state.route].show();

    switch (state.route) {
        case 'start':
            console.log('start page rendered');
            break;
        case 'questions':
            console.log('question page rendered');
            renderQuestionPage(state, elements[state.route]);
            break;
        case 'answer-feedback':
            console.log('feedback page rendered');
            renderAnswerFeedbackPage(state, elements[state.route]);
            break;
        case 'final-feedback':
            console.log('final page rendered');
            renderFinalFeedbackPage(state, elements[state.route]);
    }
}

// js-start-button quiz start listener
$('.js-start-button').on('click', event => {
    event.preventDefault();
    console.log('quiz start button clicked');
    STATE.route = 'questions';
    renderQuiz(STATE, PAGE_VIEWS);
});

function renderQuestionPage (state, element) {
    let currentQuestion = state.questions[state.questionOrder[state.currentQuestion]];
    let choices = currentQuestion.answers.map(function(answer, index) {
        return (
            `
            <input type="radio" name="weather-answer" value="${index}" id="choice-${index} required/><label for="choice-${index}" class="answer_input"> ${answer}</label>
            <br>
            `
        );
    });
    $('.js-current-question-index').text(`${state.currentQuestion + 1}`);
    $('.js-current-question').text(`${currentQuestion.question}`);
    $('.js-answer-choices').html(choices);
}

$('.js-answer-submit').click(function(event) {
    event.preventDefault();
    console.log('js-answer-submit clicked');
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
        let correct = `<img src="images/smiley_glasses_img.jpg" alt="smiley face with glasses" id="smiley_glasses"> Correct!  The answer is ${currentQuestion.answers[currentQuestion.correctIndex]}!`;
        $('.js-answer-feedback').html(correct);
        state.userScore++;
    } else {
        let incorrect = `<img src="images/smiley_goofy_img.jpg" alt="goofy smiley face" id="smiley_goofy"> Incorrect.  The correct answer is ${currentQuestion.answers[currentQuestion.correctIndex]}!`;
        $('.js-answer-feedback').html(incorrect);
    }
    $('.js-current-score').text(`${state.userScore}`);
    state.currentQuestion = (state.currentQuestion)+1;
    const SRC = currentQuestion.img;
    const ALT = currentQuestion.alt;
    updateImgAttributes(SRC, ALT);
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
    console.log('js restart clicked');
    event.preventDefault();
    handleRestartQuiz();
    STATE.route = 'start';
    renderQuiz(STATE, PAGE_VIEWS);
});

$(document).ready(function() {
    renderQuiz(STATE, PAGE_VIEWS);
});