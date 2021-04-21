;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				// $("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		// $("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});

	$(document).ready(function() {
		$('#portfolio-cont-lagility').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
			  enabled: true,
			  navigateByImgClick: true,
			  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
			  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			  titleSrc: function(item) {
				return item.el.attr('title') + '<small>'+ item.el.attr('description') +'</small>';
			  }
			},
			callbacks: {
			  elementParse: function(item) {
		   // the class name
				if(item.el.context.className == 'video-link') {
					item.type = 'iframe';
				} else {
					item.type = 'image';
				}
			  }
			},
		});
		$('#portfolio-cont-scantool').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
			  enabled: true,
			  navigateByImgClick: true,
			  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
			  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			  titleSrc: function(item) {
				return item.el.attr('title') + '<small>'+ item.el.attr('description') +'</small>';
			  }
			},
			callbacks: {
			  elementParse: function(item) {
		   // the class name
				if(item.el.context.className == 'video-link') {
					item.type = 'iframe';
				} else {
					item.type = 'image';
				}
			  }
			},
		});
		$('#portfolio-cont-freelance').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
			  enabled: true,
			  navigateByImgClick: true,
			  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
			  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			  titleSrc: function(item) {
				return item.el.attr('title') + '<small>'+ item.el.attr('description') +'</small>';
			  }
			},
			callbacks: {
			  elementParse: function(item) {
		   // the class name
				if(item.el.context.className == 'video-link') {
					item.type = 'iframe';
				} else {
					item.type = 'image';
				}
			  }
			},
		});
		$('#portfolio-cont-hobby').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
			  enabled: true,
			  navigateByImgClick: true,
			  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
			  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			  titleSrc: function(item) {
				return item.el.attr('title') + '<small>'+ item.el.attr('description') +'</small>';
			  }
			},
			callbacks: {
			  elementParse: function(item) {
		   // the class name
				if(item.el.context.className == 'con video-link') {
					item.type = 'iframe';
				} else {
					item.type = 'image';
				}
			  }
			},
		});
	});

	$(document).ready(function() {
		var activetab = $(".work-menu .active").attr("id");
		$(".work-gallery").hide(); $(".work-desc").hide();
		switch(activetab) {
			case 'lagility-tasks':
				$(".tab-lagility-desc").show();
				$("#portfolio-cont-lagility").show();
				break;
			default:
				$("#lagility-tasks").addClass( "active" );
				$(".tab-lagility-desc").show();
				$("#portfolio-cont-lagility").show();
				break;
		}
		$( ".work-tab" ).click(function() {
			var tab = $(this).attr("worktab");
			if(!$("."+tab).hasClass( "active" )){
				$(".work-gallery").hide();
				$(".work-desc").hide();
				$(".work-tab").removeClass("active");
				switch(tab) {
					case 'tab-lagility':
						$("."+tab+"-desc").show();
						$("#portfolio-cont-lagility").show();
						$("."+tab).addClass( "active" );
					  break;
					case 'tab-scantool':
						$("."+tab+"-desc").show();
						$("#portfolio-cont-scantool").show();
						$("."+tab).addClass( "active" );
					  break;
					case 'tab-freelance':
						$("."+tab+"-desc").show();
						$("#portfolio-cont-freelance").show();
						$("."+tab).addClass( "active" );
						break;
					case 'tab-hobby':
						$("."+tab+"-desc").show();
						$("#portfolio-cont-hobby").show();
						$("."+tab).addClass( "active" );
						break;
				}
				counterWayPoint();
			}
		});
	});

	$(document).ready(function() {
		$( "#submit" ).click(function() {
			var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
			if ($('#name').val() == '') {
				$('#name').css('border', '2px solid red');
				$('.error-msg-1').css('color', 'red').text("Name Field is Required");
				return;
			}else{
				$('#name').css('border', 'none');
				$('.error-msg-1').text("");
			}
			if ($('#email').val() == '') {
				$('#email').css('border', '2px solid red');
				$('.error-msg-2').css('color', 'red').text("Email Field is Required");
				return;
			}else{
				$('#email').css('border', 'none');
				$('.error-msg-2').text("");
			}
			if (pattern.test($('#email').val()) == false) {
				$('#email').css('border', '2px solid red');
				$('.error-msg-2').css('color', 'red').text("Invalid Email Format");
				return;
			}else{
				$('#email').css('border', 'none');
				$('.error-msg-2').text("");
			}
			if ($('#subject').val() == '') {
				$('#subject').val("Hello Francisco!");
			}
			if ($('#message').val() == '') {
				$('#message').css('border', '2px solid red');
				$('.error-msg-3').css('color', 'red').text("Message Field is Required");
				return;
			}else{
				$('#message').css('border', 'none');
				$('.error-msg-3').text("");
			}
			Email.send({
				SecureToken : "73e82032-8362-459b-baff-6ab15fbc68c6",
				To : $('#email').val(),
				From : "franciscopnd1014@outlook.com",
				Subject : $('#subject').val(),
				Body : $('#name').val() +" - " + $('#message').val()
			}).then(
			  message => alert(message)
			);
		  });
		// 3a4fd08d-3b14-4e64-9808-2e31fcbb4800
	});

}());