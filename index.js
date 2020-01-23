const members = require("./members");
const express = require("express");
const path = require("path");
const logger = require("./Middleware/Logger");
const exphbs = require("express-handlebars");
const app = express();

const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   // res.send(`<h1> Hello Sudhir Jedhe </h1>`);
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: 'main'}));
app.set("view engine", "handlebars");


// home page route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// init middleware
app.use(logger);

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.use('/api/members', require('./routes/apis/members'))
app.use('/api/member', require('./routes/apis/member'))

app.listen(PORT, () => {
  console.log(`Server Started listening at PORT ${PORT}`);
});
