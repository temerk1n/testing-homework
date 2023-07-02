describe('Страницы', async function() {
  it('в магазине должны быть страницы: главная, каталог, условия доставки, контакты', async function({ browser }) {
    const url = 'http://localhost:3000/hw/store';

    await this.browser.url(url);
    await expect(browser.$('.display-3')).toHaveText('Welcome to Example store!');

    await this.browser.url(url + "/catalog");
    await expect(browser.$('h1')).toHaveText('Catalog');

    await this.browser.url(url + '/delivery');
    await expect(browser.$('h1')).toHaveText('Delivery');

    await this.browser.url(url + '/contacts');
    await expect(browser.$('h1')).toHaveText('Contacts');
  });

  it('главная страница должна иметь статическое содержимое', async function() {
    const url = 'http://localhost:3000/hw/store/';

    await this.browser.url(url);
    await this.browser.assertView('plain', '.Home');
  });

  it('страница условия доставки должна иметь статическое содержимое', async function() {
    const url = 'http://localhost:3000/hw/store/delivery';

    await this.browser.url(url);
    await this.browser.assertView('plain', '.Delivery');
  });

  it('страница контакты должна иметь статическое содержимое', async function() {
    const url = 'http://localhost:3000/hw/store/contacts';

    await this.browser.url(url);
    await this.browser.assertView('plain', '.Contacts');
  });
});
