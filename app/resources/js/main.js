$(document).ready(function() {
	//example of calling a jQuery plugin
	$('body').defaultPluginName();

	//example of using a handlebars template
	Handlebars.registerPartial('myPartial', MyApp.templates.myPartial);
	var template = MyApp.templates.helloWorld;
	var html = template({
		'title': 'Hello World',
		'subtitle': 'Supports Sass and Handlebars!'
	});
	$('body').append(html);
});
