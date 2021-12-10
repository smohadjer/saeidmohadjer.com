const compilesFile = require('./compile.js');
const fse = require("fs-extra");
const chokidar = require('chokidar');
const src = 'app/content/html/';
const dest = 'public';
const path = require('path');


// using cwd option so instead of path we get filename
const watcher = chokidar.watch('.', {
	ignored: /(^|[\/\\])\../, // ignore dotfiles
	persistent: true,
	cwd: src
});

// Something to use when events are received.
const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', filepath => {
	  log(`File ${filepath} has been added`);
	  copyFile(src + filepath, dest + filepath);
  })
  .on('change', filepath => {
	  log(`File ${filepath} has been changed`);
    const extension = path.extname(filepath);
    const file = 'app/' + path.basename(filepath, extension) + '.hbs';
    compilesFile(file);
	  //copyFile(src + path, dest + path);
  })
  .on('unlink', filepath => {
	  log(`File ${filepath} has been removed`);
	  //fse.unlink(dest + filepath);
  });

function copyFile(source, destination) {
	fse.pathExists(source, (err, exists) => {
		//console.log(err);

		if (exists) {
      console.log(source);
      /*
			fse.copy(source, destination, function (err) {
				if (err){
					console.log('An error occured while copying the folder.')
					return console.error(err)
				}
				console.log(source, ' copy completed!')
			});
      */
		}
	});
}
