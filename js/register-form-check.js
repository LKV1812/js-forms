$(document).ready(function() {

	var registrFormValidate = (function(){

		// Переменные модуля
		var _registerForm = $('#register-form'),
			_patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
			_inputLogin = $('[name="email"]'),//поле ввода логина
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
				_tooltip = $('<div class="error error-hide"></div>'),
				_errorText = "",
				_emailBusy = $('<div class="error error--with-desc error-hide">Данный email уже занят</div><div class="error-description"><p>Используйте другой email чтобы создать новый аккаунт.</p><p>Или воспользуйтесь <a href="#">восстановлением пароля</a>, чтобы войти на сайт.</p></div>');	

			if (_inputLoginValue.length === 0) {
				
				_errorText = _inputLogin.data('email-error');
				var errorEmailEmpty = _tooltip.clone().text(_errorText);
				$(".plate__heading").after(errorEmailEmpty);
				errorEmailEmpty.fadeIn();
				event.preventDefault();

				// по сабмиту удаляем ошибку, чтобы она не множилась
				_registerForm.on("submit", function(){
					errorEmailEmpty.remove();
				});

				_inputLogin.on("focus", function(){
					errorEmailEmpty.fadeOut();
				});

			} else if (!(_patternEmail.test(_inputLoginValue) && _inputLoginValue.length > 0)) {

				_errorText = _inputLogin.data("email-error-format");
				var errorEmailFormat = _tooltip.clone().text(_errorText);
				$(".plate__heading").after(errorEmailFormat);
				errorEmailFormat.fadeIn();
				event.preventDefault();

				// по сабмиту удаляем ошибку, чтобы она не множилась
				_registerForm.on("submit", function(){
					errorEmailFormat.remove();
				});

				_inputLogin.on("focus", function(){
					errorEmailFormat.fadeOut();
				});

			} 

			if (_inputPasswordValue.length === 0) {
				
				_errorText = _inputPassword.data('password-error');
				var errorPasswordEmpty = _tooltip.clone().text(_errorText);
				_inputLogin.before(errorPasswordEmpty);
				errorPasswordEmpty.fadeIn();
				event.preventDefault();

				// по сабмиту удаляем ошибку, чтобы она не множилась
				_registerForm.on("submit", function(){
					errorPasswordEmpty.remove();
				});

				_inputPassword.on("focus", function(){
					errorPasswordEmpty.fadeOut();
				});

			}

			if (_inputLoginValue == "mail@mail.com" && _inputPasswordValue.length > 0) {
				
				_inputLogin.before(_emailBusy);
				_emailBusy.fadeIn();
				event.preventDefault();

				_registerForm.on("submit", function(){
					_emailBusy.remove();
				});

			} else {
				
				_emailBusy.fadeOut();

			}
		
		}

		return {
			init
		}
	
	}());
  
	// Запускаем модуль
	registrFormValidate.init();

});
