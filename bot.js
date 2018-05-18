const twit = require('twit');
const config = require('./config');
var texts = require('./texts');

var Twitter = new twit(config);

var messages = [];

const checkOut = () => {
  if (messages.length > 90)
    messages.length = 0;
};

const makeUp = () => {
  let i = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  let a = Object.keys(texts.pt1[i]).join('');
  let pt1 = texts.pt1[i][a];
  let pt2 = texts.pt2[i][a];

  let str = pt1[Math.floor(Math.random() * pt1.length)] + pt2[Math.floor(Math.random() * pt2.length)];

  checkOut();

  if (messages.indexOf(str) != -1) {
    return makeUp();
  }

  messages.push(str);

  return str;
};

const writeTweet = () => {
  Twitter.post('statuses/update', {
    status: makeUp() + '\n #jokes #jokes4robots'
  }, function(err, data, response) {
    console.log(data);
  });
};

setInterval(writeTweet, 21600000);
