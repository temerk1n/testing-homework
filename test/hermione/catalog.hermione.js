describe('Каталог', function() {
  it('если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async function({ browser }) {
    const url = 'http://localhost:3000/hw/store';

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(url + "/catalog");
    await page.waitForSelector('.card-link');
    await page.click('.card-link');
    await page.waitForSelector('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    await page.goto(url + "/catalog");
    await page.waitForSelector('.card-body');

    await expect(browser.$('.CartBadge')).toHaveText("Item in cart");
  });

  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function({browser}) {
    const url = 'http://localhost:3000/hw/store';

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(url + "/cart");

    let count = 0;
    if (await browser.$(".Cart-Count").isExisting()) {
      count = await browser.$(".Cart-Count").getText();
    }

    await page.goto(url + "/catalog");
    await page.waitForSelector('.card-link');
    await page.click('.card-link');
    await page.waitForSelector('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    await page.goto(url + "/cart");

    const result = +count + 2;
    await expect(browser.$('.Cart-Count')).toHaveText(result.toString());
  });

  it('содержимое корзины должно сохраняться между перезагрузками страницы', async function({browser}) {
    const url = 'http://localhost:3000/hw/store';

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    let productName;

    await page.goto(url + "/catalog");
    await page.waitForSelector('.card-link');
    await page.click('.card-link');
    await page.waitForSelector('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    productName = await browser.$(".ProductDetails-Name").getText();
    await page.reload();
    await page.goto(url + "/cart");
    await page.waitForSelector('.Cart');

    await expect(browser.$('.Cart-Name')).toHaveText(productName);
  });

  // it('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка * * "добавить в корзину"', async function({browser}) {
  //   const url = `http://localhost:3000/hw/store/catalog`;
  //
  //   const puppeteer = await browser.getPuppeteer();
  //   const [page] = await puppeteer.pages();
  //
  //   await page.goto(url);
  //   await page.waitForSelector('.card-link');
  //   await page.click('.card-link');
  //
  //   await this.browser.assertView('plain', '.ProductDetails');
  // });
});
