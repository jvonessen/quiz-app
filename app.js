// state
var state = {
  questions: [
    {question: "Boxer engines are unique in that they are what?",
    answers: ["Oriented horizontally", "Named after a dog", "Also used in 80's E-series BMW cars", "French Engineered"],
    correct: "Oriented horizontally",
    explanation: "As opposed to most which have all cylinders oriented along the same axis."},

    {question: "Which of the following can be used to substitute hydraulic fluid?",
    answers: ["Baby oil", "Engine oil", "Bacon grease", "Brake fluid"],
    correct: "Baby oil",
    explanation: "Any mineral oil will work, but baby oil is typically \
    only mineral oil with fragrance. Using it can lead to rose scented clutch levers."},

    {question: "Which is not a common style of motorcycle?",
    answers: ["Weasel", "Naked", "Rat", "Supermotard"],
    correct: "Weasel",
    explanation: "Unlike Firefox, there are no motorcycle forks with the name Ice Weasel."},

    {question: "Which is not a leading cause of motorcycle crashes?",
    answers: ["Prius drivers", "Target fixation", "Wet leaves", "Low-siding"],
    correct: "Prius drivers",
    explanation: "Slightly trick question, because this will depend entirely on who you ask."},

    {question: "Which is an acceptable valve shim size?",
    answers: ["1.7mm", "17mm", ".17mm", ".017mm"],
    correct: "1.7mm",
    explanation: "Motorcycles can be shimmed with anything from 1.2 to 3.5 \
    depending on the style of bike and age of the engine, but 1.4 to 2.2 is most common"},

    {question: "Which car manufacturer does not also make motorcycles?",
    answers: ["Fiat", "Honda", "BMW", "Mercedes"],
    correct: "Fiat",
    explanation: "While they sponsor a Yamaha MotoGP bike, Fiat has never produced it’s own motorcycle."},

    {question: "Complete the title for the following movie, 'The World's Fastest ___'",
    answers: ["Indian", "Man", "Sunday", "Turtle"],
    correct: "Indian",
    explanation: "Anthony Hopkins stared in this 2005 movie."},

    {question: "What motorcycle is commonly accepted as indestructible?",
    answers: ["KLR650", "DR650", "SV650", "XT650"],
    correct: "KLR650",
    explanation: "So long as you do the doohickey."},

    {question: "There is an obstacle in the road that is unavoidable, what should you do?",
    answers: ["Speed up and stand up", "Speed up", "Stand up", "Slow down"],
    correct: "Speed up and stand up",
    explanation: "If you are going to die, do it will style."},

    {question: "Which animal is associated with sport bike riders?",
    answers: ["Squid", "Bear", "Cheetah", "Opposum"],
    correct: "Squid",
    explanation: "Calamari Race Team for the win!"},

    {question: "Medical professionals refer to motorcyclists as what?",
    answers: ["Organ donors", "Job security", "Walking accidents", "Death traps"],
    correct: "Organ donors",
    explanation: "Do you have the dot?"},
  ],
  score: 0,
  current: 1
};




// manipulating functions
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var checkAnswer = function(state, element){
  var currentQuestion = $(element).closest(".question-block").children(".question").html();
  var correctAnswer = _.findWhere(state.questions, {question: currentQuestion}).correct;
  var currentExplanation = _.findWhere(state.questions, {question: currentQuestion}).explanation;
  var correctLi = $(element).siblings("li:contains('" + correctAnswer + "')");
  var clicked = $(element).html()
  if (clicked === correctAnswer) {
    $(element).addClass("correct");
    $(element).append("<br /> " + currentExplanation);
    state.score += 1;
  } else {
    $(element).addClass("incorrect");
    $(correctLi).addClass("correct");
    $(correctLi).append("<br /> " + currentExplanation);
  }
};




// rendering functions
var renderQuestions = function(state, element) {
  var randQuestions = shuffle(state.questions);
  var questionHTML = []
  for (i=0; i<=4; i++) {
    var randAnswers = shuffle(state.questions[i].answers)
    questionHTML.push(
      '<section class="question-block hidden"><span class="question">' +
      state.questions[i].question +'</span><ul class="answers"> \
      <li class="answer">' + randAnswers[0] + '</li> \
      <li class="answer">' + randAnswers[1] + '</li> \
      <li class="answer">' + randAnswers[2] + '</li> \
      <li class="answer">' + randAnswers[3] + '</li></ul> \
      <button class="next-question hidden"><span class="button-label"> \
      Next Question</span></button></section>'
    )
  };
  element.html(questionHTML);
};

var advanceQuestion = function(state, element) {
  state.current += 1;
  if (state.current < 5) {
    $(".next-question").addClass("hidden");
    $(element).closest(".question-block").addClass("hidden");
    $(element).closest(".question-block").next().removeClass("hidden");
  } else if (state.current == 5) {
    $(".question-page").addClass("hidden");
    $(".score-page").removeClass("hidden");
    renderScore(state, $(".score-page"));
    state.current = 1;
  }
};

var renderScore = function(state, element){
  $('.final-score').html(state.score);
}




// event listeners
$('#start-button').click(function(event) {
  renderQuestions(state, $('.question-list'));
  $(".start-quiz").addClass("hidden");
  $(".question-page").removeClass("hidden");
  $(".question-page section:nth-child(1)").removeClass("hidden")
});

$('#restart-quiz').click(function(event) {
  $(".score-page").addClass("hidden");
  renderQuestions(state, $('.question-list'));
  $(".question-page").removeClass("hidden");
  $(".question-page section:nth-child(1)").removeClass("hidden")
});

$('.answer').on("click touchstart", ".answer", function(event) {
  checkAnswer(state, this);
  $(".next-question").removeClass("hidden");
});

$(".question-list").on("click touchstart", ".next-question", function(event) {
  advanceQuestion(state, this);
});
