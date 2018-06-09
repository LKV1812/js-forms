$(document).ready(function(){


	var commentsValidation = (function(){

		// Переменные модуля
		var _formComments = $('#form-comments');

		// Метод инициализации (запуска) модуля
		var init = function(){
			_setUpListeners(); // Запускаем прослушку событий
		}

		// Метод прослушки событий
		// В нем прослушиваем события на странице, например клики по кнопкам, и при срабатывании события запускаем нужный метод нашего модуля
		var _setUpListeners = function(){
			_formComments.on('submit', function(event){
				_actionOnSubmit(event);
			});
		}

		// Приватные методы

		var _actionOnSubmit = function (event) {
			var _textarea = $("#textarea"),
				_textareaValue = _textarea.val(),
				_error = $("#error");

			if(_textareaValue.trim() == "") {
				_error.fadeIn();
    			event.preventDefault();	
			}

			_textarea.on("focus", function() {
				_error.fadeOut();
			});
		}

		// Возвращаем публичные медоты, которые будут доступны снаружи
		return {
			init
		}
	
	}());
  
	// Запускаем модуль
	commentsValidation.init();

});