//import Navigation from './modules/nav.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'


//Helper classes to HTML for styling of nojs version
const html = document.querySelector('html');
html.classList.remove('no-js');
html.classList.add('js');

//taken from http://youmightnotneedjquery.com/
function ready(fn) {
	'use strict';

	if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function() {
	'use strict';

	console.log('DOM is ready!');

	const swiper = new Swiper('.swiper', {
		// Optional parameters
		loop: true,
	
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	
		// Navigation arrows
		navigation: false
	});
});

