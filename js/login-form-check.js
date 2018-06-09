$(document).ready(function() {

	var loginFormValidate = (function(){

		// Переменные модуля
		var _loginForm = $('#login-form'),
			_patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			_inputLogin = $('[name="name"]'),//поле ввода логина
			_inputPassword = $('[name="password"]'),// поле ввода пароля
			_errorEmail = $("#error-email"), //блок с ошибкой Введите email
			_errorFormatEmail = $("#error-format-email"), // блок с ошибкой Неверный формат email
			_errorPassword = $("#error-password"),// блок с ошибкой пароля
			_errorEmailPassword = $("#error-email-password"),//блок с ошибкой Неверный email или пароль
			_errorMessage = $("#error-message");// блок с сообщением об ошибке ввода 

		// Метод инициализации (запуска) модуля
		var init = function(){
			_setUpListeners(); // Запускаем прослушку событий
		}

		var _setUpListeners = function(){
			_loginForm.on('submit', function(event){
				_actionOnSubmit(event);
			});
		}

		var _actionOnSubmit = function (event) {

			var _inputLoginValue = _inputLogin.val().trim(),//value поля ввода логина
				_inputPasswordValue = _inputPassword.val(),//value поля ввода пароля
				valid = true;
    		
    		// если в поле ввода логина нет символов
    		if (_inputLoginValue.length === 0) {

    			_errorEmail.fadeIn();//показываем блок с ошибкой Введите email
    			event.preventDefault();//отменяем стандартное поведение 

    			// если формат логина неверен и есть введенные символы
    		} else if (!(_patternEmail.test(_inputLoginValue)) && _inputLoginValue.length > 0) {

    			_errorFormatEmail.fadeIn();// показываем блок с ошибкой Неверный формат email
    			event.preventDefault();

    		}

    		// если в поле пароля нет символов
    		if (_inputPasswordValue.length === 0) {
    			_errorPassword.fadeIn();// показываем блок с ошибкой пароля
    			event.preventDefault();
    		}

    		// если логин или пароль не соответствует 
    		if (_inputLoginValue != "mail@mail.com" || _inputPasswordValue != 123) {
    			_errorEmailPassword.fadeIn();// показываем блок с ошибкой Неверный email или пароль
    			_errorMessage.fadeIn(); // показываем блок с сообщением об ошибке ввода
    			event.preventDefault();
    		}

    		// по фокусу в поле логина убираем блоки с ошибками
    		_inputLogin.on("focus", function(){
    			_errorEmail.fadeOut(1000);
    			_errorFormatEmail.fadeOut(1000);
    		});

    		// по фокусу в поле пароля убираем блоки с ошибками
    		_inputPassword.on("focus", function(){
    			_errorPassword.fadeOut();
    		});
		
		}

		return {
			init
		}
	
	}());
  
	// Запускаем модуль
	loginFormValidate.init();

});


