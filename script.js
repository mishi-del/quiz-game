 var quizData = {
            html: [
                {
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language",
                        "High Tech Modern Language",
                        "Hyper Transfer Markup Language",
                        "Home Tool Markup Language"
                    ],
                    correctAnswer: 0
                },
                {
                    question: "Which tag is used to create a hyperlink?",
                    options: [
                        "<link>",
                        "<a>",
                        "<href>",
                        "<hyperlink>"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which attribute is used to define inline styles?",
                    options: [
                        "class",
                        "styles",
                        "style",
                        "font"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which tag is used to define an image?",
                    options: [
                        "<picture>",
                        "<img>",
                        "<image>",
                        "<src>"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which tag is used to create a numbered list?",
                    options: [
                        "<ul>",
                        "<li>",
                        "<ol>",
                        "<list>"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which character is used to indicate an end tag?",
                    options: [
                        "^",
                        "/",
                        "*",
                        "<"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which tag is used to define a table row?",
                    options: [
                        "<td>",
                        "<tr>",
                        "<th>",
                        "<table-row>"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which tag is used to define important text?",
                    options: [
                        "<important>",
                        "<b>",
                        "<strong>",
                        "<i>"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which tag is used to define a dropdown list?",
                    options: [
                        "<input type='dropdown'>",
                        "<select>",
                        "<list>",
                        "<option>"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which tag is used to define the header of a document?",
                    options: [
                        "<header>",
                        "<head>",
                        "<top>",
                        "<footer>"
                    ],
                    correctAnswer: 1
                }
            ],
            css: [
                {
                    question: "What does CSS stand for?",
                    options: [
                        "Computer Style Sheets",
                        "Creative Style System",
                        "Cascading Style Sheets",
                        "Colorful Style Sheets"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which property is used to change the background color?",
                    options: [
                        "bgcolor",
                        "background-color",
                        "color",
                        "background"
                    ],
                    correctAnswer: 1
                }
            ],
            js: [
                {
                    question: "Which of the following is a JavaScript data type?",
                    options: [
                        "style",
                        "boolean",
                        "div",
                        "class"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How do you create a function in JavaScript?",
                    options: [
                        "function myFunction()",
                        "function:myFunction()",
                        "function = myFunction()",
                        "create myFunction()"
                    ],
                    correctAnswer: 0
                }
            ],
            python: [
                {
                    question: "Which of the following is the correct extension for Python files?",
                    options: [
                        ".pyt",
                        ".pt",
                        ".py",
                        ".python"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "How do you create a variable in Python?",
                    options: [
                        "variable x = 5",
                        "x = 5",
                        "var x = 5",
                        "int x = 5"
                    ],
                    correctAnswer: 1
                }
            ]
        };

        var currentState = {
            currentLanguage: '',
            currentQuestion: 0,
            userAnswers: [],
            score: 0
        };

        var languageSelectionEl = document.getElementById('languageSelection');
        var quizScreenEl = document.getElementById('quizScreen');
        var scoreContainerEl = document.getElementById('scoreContainer');
        var confirmationModalEl = document.getElementById('confirmationModal');
        var selectedLangNameEl = document.getElementById('selectedLangName');
        var selectedLangName2El = document.getElementById('selectedLangName2');
        var progressBarEl = document.getElementById('progressBar');
        var currentQuestionEl = document.getElementById('currentQuestion');
        var questionTextEl = document.getElementById('questionText');
        var optionsContainerEl = document.getElementById('optionsContainer');
        var nextButtonEl = document.getElementById('nextButton');
        var prevButtonEl = document.getElementById('prevButton');
        var finishButtonEl = document.getElementById('finishButton');
        var scoreValueEl = document.getElementById('scoreValue');
        var userNameEl = document.getElementById('userName');

        function initializeApp() {
            var languageCards = document.querySelectorAll('.language-card');
            for (var i = 0; i < languageCards.length; i++) {
                languageCards[i].addEventListener('click', function() {
                    var lang = this.getAttribute('data-lang');
                    showConfirmation(lang);
                });
            }
            document.getElementById('confirmStart').addEventListener('click', startQuiz);
            document.getElementById('cancelStart').addEventListener('click', closeModal);
            document.getElementById('closeModal').addEventListener('click', closeModal);
            nextButtonEl.addEventListener('click', nextQuestion);
            prevButtonEl.addEventListener('click', prevQuestion);
            finishButtonEl.addEventListener('click', finishQuiz);
        }

        function showConfirmation(lang) {
            currentState.currentLanguage = lang;
            var langName = lang.toUpperCase();
            if (lang === 'js') langName = 'JavaScript';
            
            selectedLangNameEl.textContent = langName;
            selectedLangName2El.textContent = langName;
            confirmationModalEl.style.display = 'flex';
        }
        function closeModal() {
            confirmationModalEl.style.display = 'none';
        }
        function startQuiz() {
            closeModal();
            languageSelectionEl.style.display = 'none';
            quizScreenEl.style.display = 'block';
            
            currentState.currentQuestion = 0;
            currentState.userAnswers = [];
            currentState.score = 0;
            
            displayQuestion();
        }
        function displayQuestion() {
            var questionNum = currentState.currentQuestion;
            var questions = quizData[currentState.currentLanguage];
            var question = questions[questionNum];
            var progress = ((questionNum + 1) / questions.length) * 100;
            progressBarEl.style.width = progress + '%';
            
            currentQuestionEl.textContent = questionNum + 1;
        
            questionTextEl.textContent = question.question;
        
            optionsContainerEl.innerHTML = '';

            for (var i = 0; i < question.options.length; i++) {
                var optionEl = document.createElement('div');
                optionEl.className = 'option';
                if (i === currentState.userAnswers[questionNum]) {
                    optionEl.classList.add('selected');
                }
                optionEl.textContent = question.options[i];
                optionEl.setAttribute('data-index', i);
                
                optionEl.addEventListener('click', function() {

                    var allOptions = document.querySelectorAll('.option');
                    for (var j = 0; j < allOptions.length; j++) {
                        allOptions[j].classList.remove('selected');
                    }
                    this.classList.add('selected');

                    currentState.userAnswers[currentState.currentQuestion] = parseInt(this.getAttribute('data-index'));
                });
                
                optionsContainerEl.appendChild(optionEl);
            }
            
            prevButtonEl.style.display = (questionNum === 0) ? 'none' : 'block';
            
            if (questionNum === questions.length - 1) {
                nextButtonEl.style.display = 'none';
                finishButtonEl.style.display = 'block';
            } else {
                nextButtonEl.style.display = 'block';
                finishButtonEl.style.display = 'none';
            }
        }

        function nextQuestion() {
            if (currentState.currentQuestion < quizData[currentState.currentLanguage].length - 1) {
                currentState.currentQuestion++;
                displayQuestion();
            }
        }

        function prevQuestion() {
            if (currentState.currentQuestion > 0) {
                currentState.currentQuestion--;
                displayQuestion();
            }
        }
        function finishQuiz() {
            var questions = quizData[currentState.currentLanguage];
            for (var i = 0; i < questions.length; i++) {
                if (currentState.userAnswers[i] === questions[i].correctAnswer) {
                    currentState.score++;
                }
            }
            
            scoreValueEl.textContent = currentState.score;
            userNameEl.textContent = "Abiha";

            quizScreenEl.style.display = 'none';
            scoreContainerEl.style.display = 'block';
        }

        window.onload = initializeApp;