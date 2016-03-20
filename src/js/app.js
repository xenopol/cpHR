var $ = require('jquery');

'use strict';

$(document).ready(function () {
	var flag = $('.flag-active');
	var langChoice = $('.lang-choice');
	var burgerMenu = $('.burger-menu');
	var mainNav = $('.main-nav');

	var formHeadline = $('.form-headline');
	var workTypesHeadline = $('#send-email-form input[name="workTypes[]"]').closest(".form-section").find(".form-headline");
	var numberOfWorkersHeadline = $('#send-email-form input[name="numberOfWorkers"]').closest(".form-section").find(".form-headline");
	var textarea = $('#send-email-form textarea');
	var textareaHeadline = textarea.closest(".form-section").find(".form-headline");
	var userName = $('#send-email-form input[name="userInfo[name]"]');
	var userInfoHeadline = userName.closest(".form-section").find(".form-headline");
	var userPhone = $('#send-email-form input[name="userInfo[phone]"]');
	var userEmail = $('#send-email-form input[name="userInfo[email]"]');

	flag.on('click', function () {
		langChoice.toggleClass('active');
	});

	burgerMenu.on('click', function () {
		mainNav.toggleClass('active');
	});

	$('.form-button').on("click", function (e) {
		e.preventDefault();
		var error = false;
		var workTypes = $('#send-email-form input[name="workTypes[]"]:checked');
		var numberOfWorkers = $('#send-email-form input[name="numberOfWorkers"]:checked');
		formHeadline.removeClass('form-fail-highlight');
		$('.form-success').removeClass('active');
		$('.form-fail').removeClass('active');
		if(!workTypes.prop("checked")){
			error = true;
			workTypesHeadline.addClass('form-fail-highlight');
		}
		if(!numberOfWorkers.prop("checked")){
			error = true;
			numberOfWorkersHeadline.addClass('form-fail-highlight');
		}
		if(textarea.val().trim() == ''){
			error = true;
			textareaHeadline.addClass('form-fail-highlight');
		}
		if(userName.val().trim() == ''){
			error = true;
			userInfoHeadline.addClass('form-fail-highlight');
		}
		if(userPhone.val().trim() == ''){
			error = true;
			userInfoHeadline.addClass('form-fail-highlight');
		}
		if(userEmail.val().trim() == ''){
			error = true;
			userInfoHeadline.addClass('form-fail-highlight');
		}

		if(!error){
			$.post('/php/mail.php', $('#send-email-form').serialize())
				.done(function (data) {
					if(data == 'Success'){
						$('.form-success').addClass('active');
					}else{
						$('.form-fail').addClass('active');
					}
				})
		}
	});
});

