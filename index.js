const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 15, // change this for speed adjustments
    defaultViewport: null,
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto("https://monkeytype.com", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("#words");

  // Those three lines are  useless you can get rid of them if you want, they just change the theme
  await page.keyboard.press("Escape");
  await page.keyboard.type("next random theme");
  await page.keyboard.press("Enter");

  const wordsDiv = await page.$("#words");

  for (var i = 0; i < 1000; i++) {
    var activeWord = await wordsDiv.$eval(".active", (word) => word.innerText);
    await page.keyboard.type(activeWord);
    await page.keyboard.type(" ");
  }
})();
