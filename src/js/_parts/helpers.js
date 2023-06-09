const helpers = {
	html: document.querySelector('html'),
	body: document.querySelector('body'),

	topScroll: 0,
	isScrollDisabled: false,
	disabledScrollClass: 'scroll-disabled',

	init: function() {
		// Check if touch device for hover functionality
		if ('ontouchstart' in window || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints) {
			this.html.classList.add('touch');
		} else {
			this.html.classList.add('no-touch');
		}

		// Add loaded class to html, to enable transitions
		window.addEventListener('load', () => {
			setTimeout(() => {
				this.html.classList.add('loaded');
			}, 10);
		});
		this.detectFocusOnKeyPress();
		// this.skipToContent();
	},
	//Detect key press and add class to body
	detectFocusOnKeyPress: function() {
		const activeFocus = 'active-focus';
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Tab') {
				this.body.classList.add(activeFocus);
			}
		});
		document.addEventListener('mousedown', () => {
			if (this.body.classList.contains(activeFocus)) {
				this.body.classList.remove(activeFocus);
			}
		});
	},
	//skip heder and focus on first next link or button
	skipToContent: function() {
		const skipLink = document.querySelector('.skip-link');
		const focusableElements = document.querySelector('main').querySelector('a, button');
		skipLink.addEventListener('keyup', (e) => {
			if (e.code === 'Enter' || e.code === 'NumpadEnter') {
				if (!focusableElements) return;
				focusableElements.focus({ preventScroll: false });
			}
		});
	},
	// Disable window scroll when popups, navigation and similar are opened
	disableScroll: function() {
		if (!this.isScrollDisabled) {
			this.topScroll = document.documentElement.scrollTop;
			this.body.style.top = `-${this.topScroll}px`;
			this.body.classList.add(this.disabledScrollClass);
			this.isScrollDisabled = true;
		}
	},

	// Enable back window scroll when closing the opened overlays
	enableScroll: function() {
		this.body.removeAttribute('style');
		this.body.classList.remove(this.disabledScrollClass);
		document.documentElement.scrollTop = this.topScroll;
		this.isScrollDisabled = false;
	},

	// Equal heights function should be best used on window load, and with debounce function on window resize
	/**     window.addEventListener('load', () => {
	 *          this.setEqualHeights(document.querySelectorAll('.js-equal-item'), 2);
	 *      });
	 *
	 *      # This will wait for a tenth of a second, when the window has finished resizing, and then the function will be called
	 *      window.addEventListener('resize', this.debounce(() => {
	 *          this.setEqualHeights(document.querySelectorAll('.js-equal-item'), 2);
	 *      }, 100));
	 *
	 *      # This function will be executed 4 times in a second during the event (without throttle, the function is called more than 100 times)
	 *      window.addEventListener('resize', this.throttle(() => {
	 *          this.setEqualHeights(document.querySelectorAll('.js-equal-item'), 2);
	 *      }, 250));
	 *
	 *      # Recommended events to be throttled or debounced are window scroll, resize, mousemove
	 */

	setEqualHeights: function(arrayItems, count) {
		const convertedElements = [...arrayItems];

		if (convertedElements !== undefined && convertedElements.length > 0) {
			convertedElements.forEach((element) => element.removeAttribute('style'));
			if (window.innerWidth > 767) {
				let maxH = 0;

				if (count) {
					const arrays = [];
					while (convertedElements.length > 0) {
						arrays.push(convertedElements.splice(0, count));
					}

					for (let i = 0; i < arrays.length; i += 1) {
						const data = arrays[i];
						maxH = 0;
						for (let j = 0; j < data.length; j += 1) {
							const currentH = data[j].offsetHeight;
							if (currentH > maxH) {
								maxH = currentH;
							}
						}

						for (let k = 0; k < data.length; k += 1) {
							data[k].style.height = `${maxH}px`;
						}
					}
				} else {
					convertedElements.forEach((element) => {
						const currentH2 = element.offsetHeight;
						if (currentH2 > maxH) {
							maxH = currentH2;
						}
					});

					convertedElements.forEach((element) => element.style.height = `${maxH}px`);
				}
			}
		}
	},

	throttle: function(func, interval) {
		let timeout;
		return function() {
			const _this = this;
			const args = arguments;
			const later = function() {
				timeout = false;
			};
			if (!timeout) {
				func.apply(_this, args);
				timeout = true;
				setTimeout(later, interval || 250);
			}
		};
	},

	debounce: function(func, interval) {
		let timeout;
		return function() {
			const _this = this;
			const args = arguments;
			const later = function() {
				timeout = null;
				func.apply(_this, args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, interval || 100);
		};
	},
};

export default helpers;
