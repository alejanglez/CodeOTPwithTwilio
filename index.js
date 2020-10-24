const accountSid = 'ACe92938df06ff69acc249d47c1465bfab'; // Your Account SID from www.twilio.com/console
const authToken = 'aef8de1ac5dcdf32365f4b0df4da9259';   // Your Auth Token from www.twilio.com/console

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const client = new twilio(accountSid, authToken);
const app = express();

let randomCode = null;
randomCode = Math.floor(Math.random() * 10000);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.render('step1');
});
app.post('/step2',function(req,res){
    client.messages.create({
        body: 'Your code is: '+ randomCode,
        to: '+84396653521',  // Text this number
        from: '+12513063938' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
    res.render('step2');
})
app.post('/step3', function(req, res) {
    var code = req.body.code;
    console.log("Test", randomCode , code);
    if(code == randomCode) 
    {
        randomCode = null;
        res.render('step3');
    }
    else {
        res.render('step2', {
            error: "Wrong code",
        });
    }
})
app.listen(3000);



