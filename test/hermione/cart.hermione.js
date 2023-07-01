
describe('Корзина', function() {
  it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async function({browser}) {
    const url = 'http://localhost:3000/hw/store';

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(url + "/catalog/0");
    await page.waitForSelector('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    await page.goto(url + "/catalog/1");
    await page.waitForSelector('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');

    await this.browser.assertView('plain', '.navbar-nav');
  });

  it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async function({browser}) {
    const url = 'http://localhost:3000/hw/store';

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(url + "/catalog");
    await page.waitForSelector('.card-link');
    await page.click('.card-link');
    await page.waitForSelector('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    await page.goto(url + "/cart");
    await page.waitForSelector('.Cart-Clear');
    await page.click('.Cart-Clear');

    await this.browser.assertView('plain', '.Cart');
  });
});
