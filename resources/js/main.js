(function () {
	'use strict';

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
	  new Swiper('.swiper', {
	    // Optional parameters
	    loop: true,
	    speed: 750,
	    /*
	    autoplay: {
	    	delay: 3000,
	    	disableOnInteraction: true,
	    },
	    */
	    pagination: {
	      el: '.swiper-pagination',
	      clickable: true
	    },
	    // Navigation arrows
	    navigation: false
	  });
	});

})();