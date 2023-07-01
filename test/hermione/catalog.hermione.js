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

    await this.browser.assertView('plain', '.ProductItem', {
      ignoreElements: [
        ".card-img-top",
        ".card-title",
        ".card-text",
      ],
    });
  });

  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function({browser}) {
    const url = 'http://localhost:3000/hw/store';

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(url + "/catalog");
    await page.waitForSelector('.card-link');
    await page.click('.card-link');
    await page.waitForSelector('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    await page.click('.ProductDetails-AddToCart');
    await page.reload();
    await page.goto(url + "/cart");

    await this.browser.assertView('plain', '.Cart-Count');
  });

  it('содержимое корзины должно сохраняться между перезагрузками страницы', async function({browser}) {
    const url = 'http://localhost:3000/hw/store';

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(url + "/catalog");
    await page.waitForSelector('.card-link');
    await page.click('.card-link');
    await page.click('.ProductDetails-AddToCart');
    await page.reload();
    await page.goto(url + "/cart");

    await this.browser.assertView('plain', '.Cart-Table', {
      ignoreElements: [
        ".Cart-Name",
        ".Cart-Price",
        ".Cart-Total",
        ".Cart-OrderPrice",
      ]
    });
  });
});
