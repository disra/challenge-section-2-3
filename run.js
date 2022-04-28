import puppeteer from "puppeteer";

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  const params = [];
  process.argv.forEach((val) => {
    params.push(val);
  });

  await page.goto("https://codequiz.azurewebsites.net/");
  await page.click('input[value="Accept"]');
  await page.waitForSelector("table", { visible: true, timeout: 0 });
  let table = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("table tbody tr"));
    return tds.map((td) => td.innerText.split("\t"));
  });
  table.forEach((e) => {
    if (e[0] === params[2]) console.log(e[1]) 
  });
  browser.close();
}

scrape();
