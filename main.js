const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//  Змінні гри

// Знаходим елементи
const  headerContainer = document.querySelector('#header')
const  listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

let score = 0; // Кількість відповідей
let questionIndex = 0; // Поточне запитання

// Функція яка очищає запитання
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}
function showQuestion(){

	//  Заитання
	
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question'] );

	headerContainer.innerHTML = title

	// Варіанти відповіді
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
		console.log(answerNumber, answerText);
		const questionTemplate = 
		   `<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
	        </li>`;
		const  answerHTML = questionTemplate
					.replace('%answer%', answerText)
					.replace('%number%', answerNumber)
					
					
		
	
	listContainer.innerHTML +=  answerHTML;
	answerNumber++;
	
	}

}

function checkAnswer() {
	


// Находимо вибрану радіо кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
	

// Якщо відповідь не вибрана то нічого не виртаємо виходимо з функції
	if (!checkedRadio) {
		submitBtn.blur();
		return
	}
// взнаєм номер відаовіді користувача
	const userAnswer = parseInt(checkedRadio.value)

// Якщо відповідь вірна - збільшуємо рахунок

    if (userAnswer === questions[questionIndex]['correct']){
		score++;
  }
	console.log('score' , score);
	if (questionIndex !==  questions.length -1){
		questionIndex++;
		clearPage();
		showQuestion();
		return;

	}else {
		clearPage();
		showResults();

	}
}

function showResults (){
	console.log('showResults started!');

	const resultsTemplate = 
	   `<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>`

		let title, message;
		//Варянти заголовків і тексту
		if(score === questions.length) {
			title = 'Вітаємо!';
			message = 'Ви відповіли вірно на всі запитання!';
		} else if ((score * 100)/ questions.length >= 50) {
			title = 'Не поганий результат!';
			message = 'Ви дали більше половини вірних відповідей!';
		} else {
			title = 'Варто постаратись!';
			message = 'Ви дали менше половини вірних відповідей!';
		}

		// Результат
		let result = `${score} із ${questions.length}`;

		//Фінальна  відповідь, підставляємо дані в шаблон
		
		const finalMessage = resultsTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result)

		headerContainer.innerHTML = finalMessage;

// Зміфнюємо кнопку грати знову
		submitBtn.blur();
		submitBtn.innerText = 'Почати заново';
		submitBtn.onclick = function() {
			history.go()
		}; 
}





