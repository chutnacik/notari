/* eslint-disable */
// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import {
	gsap,
	ScrollTrigger,
	Flip,
	Draggable,
	MotionPathPlugin,
} from "gsap/all";
import { WOW } from "wowjs";

/* The following plugins are Club GSAP perks */
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { SplitText } from "gsap/SplitText";
//
gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);

(function ($) {
	"use strict";
	document.addEventListener("DOMContentLoaded", function () {
		console.log("DOM loaded");
		console.log("menu exists:", $("#menu").length);
	});

	var $window = $(window);
	var $body = $("body");
	/* Preloader Effect */
	$window.on("load", function () {
		$(".preloader").fadeOut(600);
	});

	/* Slick Menu JS */
	$("#menu").slicknav({
		label: "",
		prependTo: ".responsive-menu",
	});

	if ($("a[href='#top']").length) {
		$("a[href='#top']").click(function () {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* testimonial Slider JS */
	if ($(".testimonial-slider").length) {
		const testimonial_slider = new Swiper(".testimonial-slider .swiper", {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".hero-button-next",
				prevEl: ".hero-button-prev",
			},
			breakpoints: {
				768: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 1,
				},
			},
		});
	}

	/* Init Counter */
	if ($(".counter").length) {
		$(".counter").counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if (document.querySelectorAll(".reveal").length) {
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none",
				},
			});
			tl.set(container, {
				autoAlpha: 1,
			});
			tl.from(container, {
				duration: 1,
				xPercent: -100,
				ease: "power2.out", // Používajte easing ako reťazec
			});
			tl.from(image, {
				duration: 1,
				xPercent: 100,
				scale: 1,
				delay: -1,
				ease: "power2.out", // Používajte easing ako reťazec
			});
		});
	}

	/* Text Effect Animation */
	if ($(".text-anime-style-1").length) {
		let staggerAmount = 0.05,
			translateXValue = 0,
			delayValue = 0.5,
			animatedTextElements = document.querySelectorAll(
				".text-anime-style-1",
			);

		// animatedTextElements.forEach((element) => {
		// 	let animationSplitText = new SplitText(element, {
		// 		type: "chars, words",
		// 	});
		// 	gsap.from(animationSplitText.words, {
		// 		duration: 1,
		// 		delay: delayValue,
		// 		x: 20,
		// 		autoAlpha: 0,
		// 		stagger: staggerAmount,
		// 		scrollTrigger: { trigger: element, start: "top 85%" },
		// 	});
		// });
	}

	if ($(".text-anime-style-2").length) {
		let staggerAmount = 0.05,
			translateXValue = 20,
			delayValue = 0.5,
			easeType = "power2.out",
			animatedTextElements = document.querySelectorAll(
				".text-anime-style-2",
			);

		// animatedTextElements.forEach((element) => {
		// 	let animationSplitText = new SplitText(element, {
		// 		type: "chars, words",
		// 	});
		// 	gsap.from(animationSplitText.chars, {
		// 		duration: 1,
		// 		delay: delayValue,
		// 		x: translateXValue,
		// 		autoAlpha: 0,
		// 		stagger: staggerAmount,
		// 		ease: easeType,
		// 		scrollTrigger: { trigger: element, start: "top 85%" },
		// 	});
		// });
	}

	if ($(".text-anime-style-3").length) {
		let animatedTextElements = document.querySelectorAll(
			".text-anime-style-3",
		);

		// animatedTextElements.forEach((element) => {
		// 	//Reset if needed
		// 	if (element.animation) {
		// 		element.animation.progress(1).kill();
		// 		element.split.revert();
		// 	}
		//
		// 	element.split = new SplitText(element, {
		// 		type: "lines,words,chars",
		// 		linesClass: "split-line",
		// 	});
		// 	gsap.set(element, { perspective: 400 });
		//
		// 	gsap.set(element.split.chars, {
		// 		opacity: 0,
		// 		x: "50",
		// 	});
		//
		// 	element.animation = gsap.to(element.split.chars, {
		// 		scrollTrigger: { trigger: element, start: "top 90%" },
		// 		x: "0",
		// 		y: "0",
		// 		rotateX: "0",
		// 		opacity: 1,
		// 		duration: 1,
		// 		ease: Back.easeOut,
		// 		stagger: 0.02,
		// 	});
		// });
	}

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm() {
		/* Initiate Variables With Form Content*/
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var subject = $("#subject").val();
		var message = $("#msg").val();

		$.ajax({
			type: "POST",
			url: "/public/form-process.php",
			data:
				"fname=" +
				fname +
				"&lname=" +
				lname +
				"&email=" +
				email +
				"&phone=" +
				phone +
				"&subject=" +
				subject +
				"&message=" +
				message,
			success: function (text) {
				if (text == "success") {
					formSuccess();
				} else {
					submitMSG(false, text);
				}
			},
		});
	}

	function formSuccess() {
		$contactform[0].reset();
		submitMSG(true, "Správa úspešne odoslaná! Ozeme sa Vám čoskoro.");
	}

	function submitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h3 text-success";
		} else {
			var msgClasses = "h3 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */
	new WOW().init();

	/* Popup Video */
	if ($(".popup-video").length) {
		$(".popup-video").magnificPopup({
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true,
		});
	}

	/* eslint-disable */
	if ($("body").not(".is-mobile").hasClass("tt-magic-cursor")) {
		if ($(window).width() > 1024) {
			$(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');

			if ($("a.magnetic-item").length) {
				$("a.magnetic-item").addClass("not-hide-cursor");
			}

			var $mouse = { x: 0, y: 0 }; // Cursor position
			var $pos = { x: 0, y: 0 }; // Cursor position
			var $ratio = 0.15; // delay follow cursor
			var $active = false;
			var $ball = $("#ball");

			var $ballWidth = 34; // Ball default width
			var $ballHeight = 34; // Ball default height
			var $ballScale = 1; // Ball default scale
			var $ballOpacity = 0.5; // Ball default opacity
			var $ballBorderWidth = 2; // Ball default border width

			gsap.set($ball, {
				// scale from middle and style ball
				xPercent: -50,
				yPercent: -50,
				width: $ballWidth,
				height: $ballHeight,
				borderWidth: $ballBorderWidth,
				opacity: $ballOpacity,
			});

			document.addEventListener("mousemove", mouseMove);

			function mouseMove(e) {
				$mouse.x = e.clientX;
				$mouse.y = e.clientY;
			}

			gsap.ticker.add(updatePosition);

			function updatePosition() {
				if (!$active) {
					$pos.x += ($mouse.x - $pos.x) * $ratio;
					$pos.y += ($mouse.y - $pos.y) * $ratio;

					gsap.set($ball, { x: $pos.x, y: $pos.y });
				}
			}

			$(".magnetic-wrap").mousemove(function (e) {
				parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
				callParallax(e, this);
			});

			function callParallax(e, parent) {
				parallaxIt(
					e,
					parent,
					parent.querySelector(".magnetic-item"),
					25,
				); // magnetic area = higher number is more attractive
			}

			function parallaxIt(e, parent, target, movement) {
				var boundingRect = parent.getBoundingClientRect();
				var relX = e.clientX - boundingRect.left;
				var relY = e.clientY - boundingRect.top;

				gsap.to(target, {
					duration: 0.3,
					x:
						((relX - boundingRect.width / 2) / boundingRect.width) *
						movement,
					y:
						((relY - boundingRect.height / 2) /
							boundingRect.height) *
						movement,
					ease: Power2.easeOut,
				});
			}

			function parallaxCursor(e, parent, movement) {
				var rect = parent.getBoundingClientRect();
				var relX = e.clientX - rect.left;
				var relY = e.clientY - rect.top;
				$pos.x =
					rect.left +
					rect.width / 2 +
					(relX - rect.width / 2) / movement;
				$pos.y =
					rect.top +
					rect.height / 2 +
					(relY - rect.height / 2) / movement;
				gsap.to($ball, { duration: 0.3, x: $pos.x, y: $pos.y });
			}

			// Magic cursor behavior
			// ======================

			// Magnetic item hover.
			$(".magnetic-wrap")
				.on("mouseenter", function (e) {
					gsap.to($ball, {
						duration: 0.3,
						scale: 2,
						borderWidth: 1,
						opacity: $ballOpacity,
					});
					$active = true;
				})
				.on("mouseleave", function (e) {
					gsap.to($ball, {
						duration: 0.3,
						scale: $ballScale,
						borderWidth: $ballBorderWidth,
						opacity: $ballOpacity,
					});
					gsap.to(this.querySelector(".magnetic-item"), {
						duration: 0.3,
						x: 0,
						y: 0,
						clearProps: "all",
					});
					$active = false;
				});

			// Alternative cursor style on hover.
			$(
				".cursor-alter, .tt-main-menu-list > li > a, .tt-main-menu-list > li > .tt-submenu-trigger > a",
			)
				.not(".magnetic-item") // omit from selection.
				.on("mouseenter", function () {
					gsap.to($ball, {
						duration: 0.3,
						borderWidth: 0,
						opacity: 0.2,
						backgroundColor: "#CCC",
						width: "100px",
						height: "100px",
					});
				})
				.on("mouseleave", function () {
					gsap.to($ball, {
						duration: 0.3,
						borderWidth: $ballBorderWidth,
						opacity: $ballOpacity,
						backgroundColor: "transparent",
						width: $ballWidth,
						height: $ballHeight,
						clearProps: "backgroundColor",
					});
				});

			// Overlay menu caret hover.
			$(".tt-ol-submenu-caret-wrap .magnetic-wrap")
				.on("mouseenter", function () {
					gsap.to($ball, {
						duration: 0.3,
						scale: 1.3,
						borderWidth: $ballBorderWidth,
					});
				})
				.on("mouseleave", function () {
					gsap.to($ball, { duration: 0.3, scale: $ballScale });
				});

			// Cursor view on hover (data attribute "data-cursor="...").
			$("[data-cursor]").each(function () {
				$(this)
					.on("mouseenter", function () {
						$ball.append('<div class="ball-view"></div>');
						$(".ball-view").append($(this).attr("data-cursor"));
						gsap.to(ball, {
							duration: 0.3,
							yPercent: -75,
							width: 95,
							height: 95,
							opacity: 1,
							borderWidth: 0,
							backgroundColor: "#FFF",
						});
						gsap.to(".ball-view", {
							duration: 0.3,
							scale: 1,
							autoAlpha: 1,
						});
					})
					.on("mouseleave", function () {
						gsap.to(ball, {
							duration: 0.3,
							yPercent: -50,
							width: $ballWidth,
							height: $ballHeight,
							opacity: $ballOpacity,
							borderWidth: $ballBorderWidth,
							backgroundColor: "transparent",
						});
						gsap.to(".ball-view", {
							duration: 0.3,
							scale: 0,
							autoAlpha: 0,
							clearProps: "all",
						});
						$ball.find(".ball-view").remove();
					});
				$(this).addClass("not-hide-cursor");
			});

			// Cursor drag on hover (class "cursor-drag"). For Swiper sliders.
			$(".swiper-container").each(function () {
				if ($(this).parent().attr("data-simulate-touch") == "true") {
					if ($(this).parent().hasClass("cursor-drag")) {
						$(this)
							.on("mouseenter", function () {
								$ball.append('<div class="ball-drag"></div>');
								gsap.to($ball, {
									duration: 0.3,
									width: 60,
									height: 60,
									opacity: 1,
								});
							})
							.on("mouseleave", function () {
								$ball.find(".ball-drag").remove();
								gsap.to($ball, {
									duration: 0.3,
									width: $ballWidth,
									height: $ballHeight,
									opacity: $ballOpacity,
								});
							});
						$(this).addClass("not-hide-cursor");

						// Ignore "data-cursor" on hover.
						$(this)
							.find("[data-cursor]")
							.on("mouseenter mouseover", function () {
								$ball.find(".ball-drag").remove();
								return false;
							})
							.on("mouseleave", function () {
								$ball.append('<div class="ball-drag"></div>');
								gsap.to($ball, {
									duration: 0.3,
									width: 60,
									height: 60,
									opacity: 1,
								});
							});
					}
				}
			});

			// Cursor drag on mouse down / click and hold effect (class "cursor-drag-mouse-down"). For Swiper sliders.
			$(".swiper-container").each(function () {
				if ($(this).parent().attr("data-simulate-touch") == "true") {
					if ($(this).parent().hasClass("cursor-drag-mouse-down")) {
						$(this)
							.on("mousedown pointerdown", function (e) {
								if (e.which === 1) {
									// Affects the left mouse button only!
									gsap.to($ball, {
										duration: 0.2,
										width: 60,
										height: 60,
										opacity: 1,
									});
									$ball.append(
										'<div class="ball-drag"></div>',
									);
								}
							})
							.on("mouseup pointerup", function () {
								$ball.find(".ball-drag").remove();
								if (
									$(this).find("[data-cursor]:hover").length
								) {
								} else {
									gsap.to($ball, {
										duration: 0.2,
										width: $ballWidth,
										height: $ballHeight,
										opacity: $ballOpacity,
									});
								}
							})
							.on("mouseleave", function () {
								$ball.find(".ball-drag").remove();
								gsap.to($ball, {
									duration: 0.2,
									width: $ballWidth,
									height: $ballHeight,
									opacity: $ballOpacity,
								});
							});

						// Ignore "data-cursor" on mousedown.
						$(this)
							.find("[data-cursor]")
							.on("mousedown pointerdown", function () {
								return false;
							});

						// Ignore "data-cursor" on hover.
						$(this)
							.find("[data-cursor]")
							.on("mouseenter mouseover", function () {
								$ball.find(".ball-drag").remove();
								return false;
							});
					}
				}
			});

			// Cursor close on hover.
			$(".cursor-close").each(function () {
				$(this).addClass("ball-close-enabled");
				$(this)
					.on("mouseenter", function () {
						$ball.addClass("ball-close-enabled");
						$ball.append('<div class="ball-close">Close</div>');
						gsap.to($ball, {
							duration: 0.3,
							yPercent: -75,
							width: 80,
							height: 80,
							opacity: 1,
						});
						gsap.from(".ball-close", {
							duration: 0.3,
							scale: 0,
							autoAlpha: 0,
						});
					})
					.on("mouseleave click", function () {
						$ball.removeClass("ball-close-enabled");
						gsap.to($ball, {
							duration: 0.3,
							yPercent: -50,
							width: $ballWidth,
							height: $ballHeight,
							opacity: $ballOpacity,
						});
						$ball.find(".ball-close").remove();
					});

				// Hover on "cursor-close" inner elements.
				$(
					".cursor-close a, .cursor-close button, .cursor-close .tt-btn, .cursor-close .hide-cursor",
				)
					.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
					.on("mouseenter", function () {
						$ball.removeClass("ball-close-enabled");
					})
					.on("mouseleave", function () {
						$ball.addClass("ball-close-enabled");
					});
			});

			// Portfolio interactive title link hover.
			$(".portfolio-interactive-item").each(function () {
				var $piItem = $(this);
				if ($(this).find(".pi-item-image").length) {
					$piItem
						.find(".pi-item-title-link")
						.on("mouseenter mouseover", function () {
							$("#magic-cursor").addClass(
								"portfolio-interactive-hover-on",
							);
							$piItem.find(".pi-item-image").appendTo($ball);
							gsap.to($ball, {
								duration: 0.3,
								width: "20vw",
								height: "20vw",
								opacity: 1,
							});
							$ball
								.find(".pi-item-image video")
								.each(function () {
									$(this).get(0).play();
								});
						})
						.on("mouseleave", function () {
							$("#magic-cursor").removeClass(
								"portfolio-interactive-hover-on",
							);
							$ball.find(".pi-item-image").appendTo($piItem);
							gsap.to($ball, {
								duration: 0.3,
								width: $ballWidth,
								height: $ballHeight,
								opacity: $ballOpacity,
							});
							$piItem
								.find(".pi-item-image video")
								.each(function () {
									$(this).get(0).pause();
								});
						});
					$(this)
						.find(".pi-item-title-link")
						.addClass("not-hide-cursor");
				}
			});

			// Blog interactive title link hover.
			$(".blog-interactive-item").each(function () {
				var $biItem = $(this);
				if ($biItem.find(".bi-item-image").length) {
					$biItem
						.find(".bi-item-title a")
						.on("mouseenter mouseover", function () {
							$("#magic-cursor").addClass(
								"blog-interactive-hover-on",
							);
							$biItem.find(".bi-item-image").appendTo($ball);
							gsap.to($ball, {
								duration: 0.3,
								width: "20vw",
								height: "20vw",
								opacity: 1,
							});
						})
						.on("mouseleave", function () {
							$("#magic-cursor").removeClass(
								"blog-interactive-hover-on",
							);
							$ball.find(".bi-item-image").appendTo($biItem);
							gsap.to($ball, {
								duration: 0.3,
								width: $ballWidth,
								height: $ballHeight,
								opacity: $ballOpacity,
							});
						});
					$biItem
						.find(".bi-item-title a")
						.addClass("not-hide-cursor");
					$biItem.addClass("bi-item-image-on");
				}
			});

			// Page nav hover.
			$(".tt-page-nav").each(function () {
				if ($(this).find(".tt-pn-image").length) {
					$(this)
						.find(".tt-pn-link")
						.on("mouseenter mouseover", function () {
							$("#magic-cursor").addClass("tt-pn-hover-on");
							$(this)
								.parent()
								.find(".tt-pn-image")
								.appendTo($ball);
							gsap.to($ball, {
								duration: 0.3,
								width: "20vw",
								height: "20vw",
								opacity: 1,
							});
							$ball.find(".tt-pn-image video").each(function () {
								$(this).get(0).play();
							});
						})
						.on("mouseleave", function () {
							$("#magic-cursor").removeClass("tt-pn-hover-on");
							$ball.find(".tt-pn-image").appendTo(this);
							gsap.to($ball, {
								duration: 0.3,
								width: $ballWidth,
								height: $ballHeight,
								opacity: $ballOpacity,
							});

							$(this)
								.parent()
								.find(".tt-pn-image video")
								.each(function () {
									$(this).get(0).pause();
								});
						});
					$(this).find(".tt-pn-link").addClass("not-hide-cursor");
				} else {
					$(this).find(".tt-pn-link").removeClass("not-hide-cursor");
				}
			});

			// Page nav title hover.
			if ($(".tt-pn-image").length) {
				$(".tt-page-nav").each(function () {
					$(this)
						.find(".tt-pn-link")
						.on("mouseenter mouseover", function () {
							$("#magic-cursor").addClass("tt-page-nav-hover-on");
							$(this)
								.parent()
								.find(".tt-pn-image")
								.appendTo($ball);
							gsap.to($ball, {
								duration: 0.3,
								width: "20vw",
								height: "20vw",
								opacity: 1,
							});
							if ($(".tt-pn-image video").length) {
								$(".tt-pn-image video").get(0).play();
							}
						})
						.on("mouseleave", function () {
							$("#magic-cursor").removeClass(
								"tt-page-nav-hover-on",
							);
							$ball.find(".tt-pn-image").appendTo(this);
							gsap.to($ball, {
								duration: 0.3,
								width: $ballWidth,
								height: $ballHeight,
								opacity: $ballOpacity,
							});

							if ($(".tt-pn-image video").length) {
								$(".tt-pn-image video").get(0).pause();
							}
						});
				});
				$(".tt-pn-link").addClass("not-hide-cursor");
			} else {
				$(".tt-pn-link").removeClass("not-hide-cursor");
			}

			// Show/hide magic cursor
			// =======================

			// Hide on hover.
			$(
				"a, button, .tt-btn, .tt-form-control, .tt-form-radio, .tt-form-check, .hide-cursor",
			) // class "hide-cursor" is for global use.
				.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
				.not(".cursor-alter") // omit from selection
				.not(".tt-main-menu-list > li > a") // omit from selection
				.not(".tt-main-menu-list > li > .tt-submenu-trigger > a") // omit from selection
				.on("mouseenter", function () {
					gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
				})
				.on("mouseleave", function () {
					gsap.to($ball, {
						duration: 0.3,
						scale: $ballScale,
						opacity: $ballOpacity,
					});
				});

			// Hide on click.
			$("a")
				.not('[target="_blank"]') // omit from selection.
				.not('[href^="#"]') // omit from selection.
				.not('[href^="mailto"]') // omit from selection.
				.not('[href^="tel"]') // omit from selection.
				.not(".lg-trigger") // omit from selection.
				.on("click", function () {
					gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
				});

			// Show/hide on document leave/enter.
			$(document)
				.on("mouseleave", function () {
					gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
				})
				.on("mouseenter", function () {
					gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
				});

			// Show as the mouse moves.
			$(document).mousemove(function () {
				gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
			});
		}
	}
})(jQuery);
