$(document).ready(function() {

	var registrFormValidate = (function(){

		// Переменные модуля
		var _registerForm = $('#register-form'),
			_patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
			_inputLogin = $('[name="name"]'),//поле ввода логина
			_inputPassword = $('[name="password"]');// поле ввода пароля
			
		// Метод инициализации (запуска) модуля
		var init = function(){
			_setUpListeners(); // Запускаем прослушку событий
		}

		var _setUpListeners = function(){
			_registerForm.on('submit', function(event){
				_actionOnSubmit(event);
			});
		}

		var _actionOnSubmit = function (event) {
			
			var _inputLoginValue = _inputLogin.val().trim(),//value поля ввода логина
				_inputPasswordValue = _inputPassword.val(),//value поля ввода пароля
				_errorText = "",
				_tooltipe = $('<div class="error error-hide"></div>'),
				_emailBusy = $('<div class="error error--with-desc error-hide">Данный email уже занят</div><div class="error-description"><p>Используйте другой email чтобы создать новый аккаунт.</p><p>Или воспользуйтесь <a href="#">восстановлением пароля</a>, чтобы войти на сайт.</p></div>');
			if (_inputLoginValue.length === 0) {
				
				$(".error").remove();
				_errorText = _inputLogin.data('email-error');
				_tooltipe.text(_errorText);
				$('.plate__heading').after(_tooltipe);
				_tooltipe.fadeIn();
				event.preventDefault();

			} else if (!(_patternEmail.test(_inputLoginValue) && _inputLoginValue.length > 0)) {
				
				$(".error").remove();
				_errorText = "Неверный формат email";
				_tooltipe.text(_errorText);
				_inputLogin.before(_tooltipe);
				event.preventDefault();

			}

			if (_inputPasswordValue.length === 0) {
				
				$(".error").remove();
				_errorText = _inputPassword.data('password-error');
				_tooltipe.text(_errorText);
				_inputLogin.before(_tooltipe);
				_tooltipe.fadeIn();
				event.preventDefault();

			}

			if (_inputLoginValue == "mail@mail.com" && _inputPasswordValue.length > 0) {
				
				$(".error").remove();
				$(".error-description").remove();
				_inputLogin.before(_emailBusy);
				_emailBusy.fadeIn();
				event.preventDefault();

			} else {
				
				$(".error--with-desc").remove();
				$(".error-description").remove();

			}

			_inputLogin.on("focus", function(){
				
				_tooltipe.remove();

			});

			_inputPassword.on("focus", function(){

				_tooltipe.remove();
				
			});
		
		}

		return {
			init
		}
	
	}());
  
	// Запускаем модуль
	registrFormValidate.init();

});
