import SiteNav from './modules/nav.js';

//Helper classes to HTML for styling of nojs version
const html = document.querySelector('html');
html.classList.remove('no-js');
html.classList.add('js');

//taken from http://youmightnotneedjquery.com/
function ready(fn) {
	'use strict';

	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function() {
	'use strict';

	console.log('DOM is ready!');

	//initialize site navigation
	const navigation = new SiteNav({
		element: document.querySelector('header > nav')
	});

	//hamburger button
	const hamburger = document.querySelector('button.hamburger');
	if (hamburger) {
		hamburger.addEventListener('click', function() {
			hamburger.classList.toggle('is-active');
			if (navigation.nav) {
				navigation.nav.classList.toggle('is-visible');
			}
		});
	}

	/*
	const langs = document.querySelector('.langs');
	if (langs) {
		langs.addEventListener('click', (e) => {
			console.log(e.target);
			e.target.nextElementSibling.classList.toggle('hidden');
		});
	}
	*/
});

