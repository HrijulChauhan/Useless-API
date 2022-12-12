const app = require("express")();
const PORT = 8080;
var cors = require("cors");
const puppeteer = require("puppeteer");
const BROWSERLESS_API_KEY = "014a6174-f0fb-4d0e-97c5-8be976eb3e3d";

app.use(cors());
app.listen(PORT, () =>
  console.log(`The server is live at http://localhost:${PORT}`)
);

const arhaan = [
  "https://twitter.com/arhaanbahadur/status/1601585130707234817",
  "https://twitter.com/arhaanbahadur/status/1601552999536807936",
];
const trial = ["yuh", "yuh2"];

const getProfileInfo = async (page) =>
  await page.evaluate(() => {
    const $ = (selector) => document.querySelector(selector);

    return {
      tweet: $("title").innerText,
    };
  });

const getTweetMetrics = async (page) =>
  await page.evaluate(() => {
    return [...document.querySelectorAll("article")].map((el) => {
      return {
        submitted: el.querySelector("time").dateTime,
        replies: el.querySelector('[data-testid="reply"]').innerText,
        retweets: el.querySelector('[data-testid="retweet"]').innerText,
        likes: el.querySelector('[data-testid="like"]').innerText,
      };
    });
  });

const getTwitterData = async (url) => {
  const _browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_API_KEY}`,
  });
  const _page = await _browser.newPage();
  await _page.goto(url);
  await _page.waitForSelector(`article`);

  const profileData = await getProfileInfo(_page);
  const tweetsMetrics = await getTweetMetrics(_page);

  _browser.disconnect();

  return {
    ...profileData,
    tweets: tweetsMetrics,
  };
};

// const url2 = arhaan[Math.floor(Math.random() * 2)];
// const data = getTwitterData(url2);
// var tweet = "";
// data.then(function(result){
//     tweet = (result.tweet.split("/")[0])
//     console.log(tweet);
// })
var url2 = arhaan[Math.floor(Math.random() * 2)];

const tweetFunction = function (req, res, next) {
  console.log("We are in D app.use");
  var url2 = arhaan[Math.floor(Math.random() * 2)];
  var data = getTwitterData(url2);
  var tweet = "";
  data.then(function (result) {
    res.send(result.tweet.split("/ | Twitter ")[0]);
    console.log(res);
  });
};



app.use(tweetFunction);

app.get("/tshirt", (req, res) => {  
  tweetFunction().then(result => res.send(result))
});
