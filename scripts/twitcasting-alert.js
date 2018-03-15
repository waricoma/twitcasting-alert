'use strict';

const client = require('cheerio-httpcli');
let   twCasCrawl = null;
let   twCasStatus     = "";
let   twCasStatusNote = "現在オフラインです";
let   cryWord         = "";
const crys = [
  'にゃーん',
  'うにゃー',
  'おなかすいたった',
  'ggg',
  '🐟',
  '👍',
  '(ΦωΦ)',
  '(=^・・^=)'
];
const crysLen = crys.length;

module.exports = (robot) => { robot.hear(/!START-TWICAS-CRAWLING>/i, (msg) => {
  twCasStatusNote = "現在オフラインです";
  const messageText = msg.message.text;
  const infoText    = messageText.replace('!START-TWICAS-CRAWLING>' , '');
  msg.send(`https://twitcasting.tv/${infoText}`);

  if(twCasCrawl != null) clearInterval( twCasCrawl );

  twCasCrawl = setInterval(function() {
    client.fetch(`https://twitcasting.tv/${infoText}`, function (err, $, res) {
      twCasStatus = $('#movietitle').text().trim();
      if(twCasStatus != twCasStatusNote) msg.send(`@channel ${twCasStatus}`);
      twCasStatusNote = twCasStatus;
    });
    cryWord = crys[Math.floor(Math.random() * (crysLen * 6))];
    if(cryWord != undefined) msg.send(cryWord);
  }, 10000);
}); }
