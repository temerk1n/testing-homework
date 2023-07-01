import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";
import {render} from "@testing-library/react";
import React from "react";
import events from "@testing-library/user-event";

describe('Корзина', () => {
  it('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async function () {
    const user = events.setup();

    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    const { container } = render(app);


  });

  it('если корзина пустая, должна отображаться ссылка на каталог товаров', async function () {
    const user = events.setup();

    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    const { container } = render(app);

    const pages = container.querySelectorAll('.nav-link');
    await user.click(pages[3]);
    const cartPage = container.querySelector(".Cart");
    const link = cartPage.querySelector('a');

    expect(link.getAttribute("href")).toBe(basename + "/catalog");
  });
});
