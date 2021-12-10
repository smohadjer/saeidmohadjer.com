const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const files = fs.readdirSync('./app');
const targetFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === '.hbs';
});
const registerContent = function(filename) {
  const path = 'app/content/' + filename + '.html';
  handlebars.registerPartial(
    'content',
    fs.readFileSync(path, 'utf8')
  )
}

const compileFile = function(pathToFile) {
  console.log('file: ', pathToFile);
  const extension = path.extname(pathToFile);
  const filename = path.basename(pathToFile, extension);
  console.log('filename: ', filename);
  const template = fs.readFileSync(pathToFile, 'utf8');
  registerContent(filename);
  const compiled = handlebars.compile(template);
  const html = compiled({});
  const dir = 'public';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  fs.writeFile('public/' + filename + '.html', html, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('public/' + filename + ' was saved');
  });
};

handlebars.registerPartial(
  'header',
  fs.readFileSync('app/content/header.html', 'utf8')
);
handlebars.registerPartial(
  'footer',
  fs.readFileSync('app/content/footer.html', 'utf8')
);
handlebars.registerPartial(
  'meta',
  fs.readFileSync('app/content/meta.html', 'utf8')
);
handlebars.registerPartial(
  'styles',
  fs.readFileSync('app/includes/styles.html', 'utf8')
);
handlebars.registerPartial(
  'scripts',
  fs.readFileSync('app/includes/scripts.html', 'utf8')
);

targetFiles.forEach(function(file) {
  compileFile('app/' + file);
});

module.exports = compileFile;





