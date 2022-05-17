var express = require('express');
var router = express.Router();

const OAuth = require('oauth-1.0a');
const axios = require('axios');
const crypto = require("crypto");
const { response } = require('express');

var consumer_key = '';  // API Key
var application_secret = '';  // API Secret
var access_token = '';  // Access Token
var user_secret = '';  // Access Token Secret

const oauth = OAuth({
	consumer: {
		key: consumer_key,
		secret: application_secret
	},
	signature_method: 'HMAC-SHA1',
	hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

const token = {
	key: access_token,
	secret: user_secret
};

const authHeader = oauth.toHeader(oauth.authorize({
	url: 'https://api.twitter.com/2/tweets',
	method: 'POST'
}, token));



const data = { "text": "Hello world!!" };


/* GET home page. */
router.get('/',async function(req, res, next) {
  var response = "bobby";
  try {
    response = await axios.post('https://api.twitter.com/2/tweets',
      data,
      {
        headers: {
          Authorization: authHeader["Authorization"],
          'user-agent': "v2CreateTweetJS",
          'content-type': "application/json",
          'accept': "application/json"
        }
      });
    console.log(response);
  }
  catch(err){
    console.log(err);
  }
  res.render('index',{John: response});
});

module.exports = router;
