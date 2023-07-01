import React from 'react';

import { render } from '@testing-library/react';
import events from '@testing-library/user-event';
import {Application} from "../../src/client/Application";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";

describe('Общие требования', () => {
  it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
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
    const navLinks = container.querySelectorAll("a.nav-link");

    // Received
    const paths: string[] = [];
    navLinks.forEach((link) => {
      paths.push(link.getAttribute('href'));
    })

    // Expected
    let pages: string[] = ["/catalog", "/delivery", "/contacts", "/cart"];
    pages = pages.map((page) => basename + page);

    expect(paths).toEqual(pages);
  });

  it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
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

    const link = container.querySelector(".navbar-brand").getAttribute("href");

    expect(link).toBe('/hw/store/');
  });

  it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
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

    const menu = container.querySelector(".navbar-collapse");
    const link = menu.querySelector(".nav-link");

    const toggler = container.querySelector(".navbar-toggler");

    await user.click(toggler);

    await user.click(link);

    expect(menu.classList.contains('collapse')).toBe(true);
  });
});
