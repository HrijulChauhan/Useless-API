const puppeteer = require('puppeteer')
const BROWSERLESS_API_KEY = "014a6174-f0fb-4d0e-97c5-8be976eb3e3d";
  
const getProfileInfo = async (page) =>
  await page.evaluate(() => {
    const $ = (selector) => document.querySelector(selector);
 
    return {
      tweet: $('title').innerText,
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
 
const data = getTwitterData("https://twitter.com/HrijulChauhan/status/1601683668581646336");
data.then(function(result){
    console.log(result.tweet.slice(27))
})
 