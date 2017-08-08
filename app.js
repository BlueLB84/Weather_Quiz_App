const STATE = {
    questions: [],
    currentQuestion: 0,
    userScore: 0,
    lastQuestionCorrect: null,
    route: 'start'
};

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

function renderQuestionPage (state, element) {
    // renders question page
}

function renderAnswerFeedbackPage (state, element) {
    // renders answer feedback page
}

function renderFinalFeedbackPage (state, element) {
    // renders final feedback page
}

function handleRestartQuiz() {
    // handles restarting the quiz
}

$(document).ready(function() {
    renderQuiz(STATE, PAGE_VIEWS);
});