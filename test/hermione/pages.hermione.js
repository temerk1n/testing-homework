describe('Страницы', async function() {
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
