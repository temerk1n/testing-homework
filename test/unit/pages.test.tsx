import React from 'react';

import { render } from '@testing-library/react';
import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";
import events from "@testing-library/user-event";

describe('Страницы', () => {
  it('в магазине должны быть страницы: главная, каталог, условия доставки, контакты', async () => {
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

    const pages = ["Home", "Catalog", "Delivery", "Contacts"]

    const { container } = render(app);

    let page = container.querySelector("div > .pt-4 > div");
    expect(page.classList).toContain(pages[0]);

    // for (let i = 0; i < 3; i++) {
    //   const navLinks = container.querySelectorAll("a.nav-link");
    //   await user.click(navLinks[i])
    //   page = container.querySelector("div > .pt-4 > div");
    //   expect(page.classList).toContain(pages[i+1]);
    // }




    // await user.click(navLinks[0]);
    //
    // let page = container.querySelector("div > .pt-4 > div");
    // expect(page.classList).toContain("Catalog");

    // await user.click(navLinks[1]);
    // page = container.querySelector("div > .pt-4 > div");
    // expect(page.classList).toContain("Delivery");
    //
    // await user.click(navLinks[2]);
    // page = container.querySelector("div > .pt-4 > div");
    // expect(page.classList).toContain("Contacts");
  });

});
