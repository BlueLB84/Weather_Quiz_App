var Quiz = function(elSelector, ansSelector, questions, answers, correctAnswers) {
    this.elSelector = elSelector;
    this.ansSelector = ansSelector;
    this.questions = questions;
    this.answers = answers;
    this.currentQuestion = 0;
    
    this.renderQuestion = function(questionId) {
      this.elSelector.html(this.questions[questionId]);
    }
    
    this.renderQuestionAnswers = function(questionId) {
      let choices = this.answers[questionId].map(function(answer, index) {
          return (
              `
              <input type="radio" name="weather-answer" value="${index}" id="choice-${index}" required/><label for="choice-${index}" class="answer-input"> ${answer}</label>
              <br>
              `
          );
      });
      this.ansSelector.html(choices);
    }
    
    this.incrementCurrentQuestion = function() {
      this.currentQuestion++;
    }
    
    this.renderQuestion(this.currentQuestion);
    this.renderQuestionAnswers(this.currentQuestion);
  }
  
    
  
  var myQuestions = [
    'What type of cloud signifies a thunderstorm?',
    'What is the name of a scientist who studies weather?',
    'What does an anemometer measure?'
  ];
  
  var myAnswers = [
      ['nimbostratus','alto cumulus','cumulonimbus','cirrus'],
      ['cloudologist','weatherologist','stormologist','meteorologist'],
      ['precipitation','wind','air pressure','temperature']
  ];
  
  var correctIndex = [2,3,1];
  
  var myQuiz = new Quiz($('.js-current-question'), $('.js-answer-choices'), myQuestions, myAnswers, correctIndex)
  
  myQuiz.incrementCurrentQuestion();
  
  $('.js-current-question-index').text(myQuiz.currentQuestion);
  
  $('.js-answer-submit').click(function(event) {
      event.preventDefault();
      let currentQuestion = STATE.questions[STATE.questionOrder[STATE.currentQuestion]];
      let answer = $('input[name=\'weather-answer\']:checked').val();
      answer = parseInt(answer, 10);
      STATE.lastQuestionCorrect = (answer === STATE.questions[STATE.questionOrder[STATE.currentQuestion]].correctIndex);
      STATE.route = 'answer-feedback';
      renderQuiz(STATE, PAGE_VIEWS);
  });
  
  
  
  
  
  
  