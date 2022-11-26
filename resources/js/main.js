(function (Swiper) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Swiper__default = /*#__PURE__*/_interopDefaultLegacy(Swiper);

	//import Navigation from './modules/nav.js';

	//Helper classes to HTML for styling of nojs version
	var html = document.querySelector('html');
	html.classList.remove('no-js');
	html.classList.add('js');

	//taken from http://youmightnotneedjquery.com/
	function ready(fn) {

	  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	}
	ready(function () {

	  console.log('DOM is ready!');
	  new Swiper__default["default"]('.swiper', {
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

})(Swiper);
