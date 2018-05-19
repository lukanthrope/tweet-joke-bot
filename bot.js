const http = require('http');
const twit = require('twit');
const config = require('./config');
var texts = require('./texts');
texts.pt1[1].robJok[0] = Math.random().toString(26).substring(2, 10) + Math.random().toString(26).substring(2, 10);

var Twitter = new twit(config);

var messages = [];

const checkOut = () => {
  if (messages.length > 140)
    messages.length = 0;
};

const makeUp = () => {
  let i = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  let a = Object.keys(texts.pt1[i]).join('');
  let pt1 = texts.pt1[i][a];
  let pt2 = texts.pt2[i][a];
  console.log(pt1.robJok);

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

const d = () => {
  try {
    writeTweet();
  } catch(e) {
    console.log(e);
  }
};

function tick()
{
    var mins = new Date().getMinutes();
    if(mins == "00"){
      d();
     }
}

setInterval(function() { tick(); }, 40000);

//setInterval(d, 40000);

const server = http.createServer((req, res) => {});
server.listen(3000, () => {
  console.log('3000 is listening..')
});
