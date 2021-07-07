window.addEventListener('DOMContentLoaded', function () {
	//slider
	const slider = tns({
		container: '.carousel__inner',
		items: 1,
		slideBy: 'page',
		autoplay: false,
		controls: false,
		nav: true,
		navPosition: 'bottom',
		autoHeight: false,

		responsive: {
			320: {
				nav: true,
				navPosition: 'bottom',
				edgePadding: 20,
				gutter: 20,
				items: 1,
			},
			991: {
				nav: false,
			}
		}
	});
	document.querySelector('.prev').addEventListener('click', function () {
		slider.goTo('prev');
	});
	document.querySelector('.next').addEventListener('click', function () {
		slider.goTo('next');
	});

	//tabs
	const tabs = document.querySelectorAll('.catalog__tab'),
		tabsClick = document.querySelectorAll('.catalog__click'),
		catalogContent = document.querySelectorAll('.catalog__content'),
		parentTabs = document.querySelector('.catalog__tabs');


	function hiddenTabContent() {
		catalogContent.forEach(item => {
			item.classList.remove('catalog__content-active');
		});
		tabs.forEach(tab => {
			tab.classList.remove('catalog__tab-active');
		});
	}

	function showTabContent(i = 1) {
		catalogContent[i].classList.add('catalog__content-active');
		tabs[i].classList.add('catalog__tab-active');
	}

	hiddenTabContent();
	showTabContent();

	parentTabs.addEventListener('click', function (event) {
		const target = event.target;
		if (target && target.classList.contains('catalog__click')) {
			tabsClick.forEach((item, i) => {
				if (target == item) {
					hiddenTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//product cards toggleSlide
	const items = document.querySelectorAll('.catalog-item'),
		itemContent = document.querySelectorAll('.catalog-item__content'),
		itemList = document.querySelectorAll('.catalog-item__list'),
		link = document.querySelectorAll('.catalog-item__link'),
		back = document.querySelectorAll('.catalog-item__back');

	function itemsToggle(i) {
		itemContent[i].classList.toggle('catalog-item__content-active');
		itemList[i].classList.toggle('catalog-item__list-active');
	}

	items.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault();
			const target = event.target;
			link.forEach((item, i) => {
				if (target == item) {
					itemsToggle(i);
				}
			});
			back.forEach((item, i) => {
				if (target == item) {
					itemsToggle(i);
				}
			});
		});
	});
});





$(document).ready(function () {
	/* 	//the tabs were created using jquery, I rewrote them in javascript line 33
		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function () {
			$(this)
				.addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
				.closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
		}); */

	/* 	function toggleSlide(item) {
			$(item).each(function (i) {
				$(this).on('click', function (e) {
					e.preventDefault();
					$('.catalog-item__list').eq(i).toggleClass('catalog-item__list-active');
					$('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');

				});
			});
		}
		toggleSlide('.catalog-item__link');
		toggleSlide('.catalog-item__back'); */




	//Modal

	$('[data-modal="consultation"]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__clouse').on('click', function () {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button-mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});


	//validate
	function validateForms(form) {
		$(form).validate({
			rules: {
				name: 'required',
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свой e-mail",
					email: "Неправильно введен адресс почты"
				}
			}
		});
	}

	validateForms('#consultation form');
	validateForms('#consultation-form');
	validateForms('#order-form');


	$('input[name=phone]').mask("+7(999) 999-9999");


	$('form').submit(function (e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});


	//scroll
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#']").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(_href).offset().top + "px"
		});
		return false;
	});

});