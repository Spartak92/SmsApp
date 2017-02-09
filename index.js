var express = require('express')
var app = express()
var twilio = require('twilio');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
 
// Find your account sid and auth token in your Twilio account Console.
var client = twilio('ACc0b5d8449a391a62c6e0201b3b70490e', 'c82b93f09aa043dfc23fd8ae0420a247');
 
app.post('/api/sms-promotion', function (req, res) {

	var d = new Date();
	var h = d.getHours();

	client.messages.create({
	  to: req.body.phone,
	  from: '+14697891779',
	  body: h >= 5 && h <= 12 ? 'Good Morning! Your promocode is AM123' : 'Hello! Your promocode is PM456'
    }, function (err, message) {
        if (err)
        {
        	res.status(err.status).json(err);
        }
        else
        {
        	res.send();
        }
    });
})

app.get('/', function(req, res)
{
     res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})