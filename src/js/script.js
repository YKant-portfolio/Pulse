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


$(document).ready(function () {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function () {
		$(this)
			.addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
	});


	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list-active');
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');

			});
		});
	};
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');


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
		})
	});

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
	};

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
		} else { $('.pageup').fadeOut(); }
	});

	$("a[href^='#']").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});

});