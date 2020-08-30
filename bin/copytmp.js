var fs = require("fs-extra");
var path = require('path');
var content = fs.readFileSync("projectConfig.json");
var jsonContent = JSON.parse(content);

function copyDependencies(type) {
	jsonContent.dependencies[type].forEach(function(source) {
		var filename = path.basename(source);
		var destination = `.tmp/resources/${type}/${filename}`;

		fs.copy(source, destination, function (err) {
		    if (err){
		        console.log('An error occured while copying the folder.')
		        return console.error(err)
		    }
		});
	});
}

copyDependencies('css');
copyDependencies('js');
