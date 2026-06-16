const puppeteer = require("puppeteer");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
  await sleep(1000);
  // Those three lines are  useless you can get rid of them if you want, they just change the theme
  await page.keyboard.press("Escape");
  await sleep(1000);
  await page.keyboard.type("words 25");
  await page.keyboard.press("Enter");

  const wordsDiv = await page.$("#words");

  for (let i = 0; i < 1000; i++) {
    const activeWordSelector = await page.locator('#words .active').waitHandle();
    const activeWord = await activeWordSelector?.evaluate((el) => el.textContent);
    await page.keyboard.type(activeWord);
    await page.keyboard.type(' ');
  }
})();
