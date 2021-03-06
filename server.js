const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     welcomeMessage: 'We will be right back!',
//     currentYear: new Date().getFullYear()
//   })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to home page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Something is wrong',
    status: 500
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    projects: {project1:"project1",project2:"project2"},
    currentYear: new Date().getFullYear()
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
