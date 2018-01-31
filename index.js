
var express = require('express');
var app = express();
var router = express.Router();
app.get('/', (req, res) => res.send('Hello World! My first App!'));
app.listen(8080, () => console.log('Your App is listening on port 8080!'));
router.get('/about', (req, res)=> res.send('This is the abaout section fo your application'));
