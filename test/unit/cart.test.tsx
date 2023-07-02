import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import React from "react";
import events from "@testing-library/user-event";
import {Cart} from "../../src/client/pages/Cart";
import '@testing-library/jest-dom'

describe('Корзина', () => {

  it('если корзина пустая, должна отображаться ссылка на каталог товаров', async function () {
    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const CartPage = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </BrowserRouter>
    );

    const { container } = render(CartPage);

    const cartPage = container.querySelector(".Cart");
    const link = cartPage.querySelector('a');

    expect(link.getAttribute("href")).toBe(basename + "/catalog");
  });

  // it('оформление заказа проходит успешно', async function () {
  //   const user = events.setup();
  //
  //   const basename = '/hw/store';
  //
  //   const api = new ExampleApi(basename);
  //   const cart = new CartApi();
  //   const store = initStore(api, cart);
  //
  //   store.dispatch({
  //     type: "ADD_TO_CART",
  //     product: {
  //       id: 27,
  //       name: "Test",
  //       price: 100,
  //       description: "a",
  //       material: "stone",
  //       color: "blue"
  //     }
  //   })
  //
  //   const cartPage = (
  //     <BrowserRouter basename={basename}>
  //       <Provider store={store}>
  //         <Cart />
  //       </Provider>
  //     </BrowserRouter>
  //   );
  //
  //   const { getByTestId } = render(cartPage);
  //
  //   await user.type(getByTestId("name-input"), "name");
  //   await user.type(getByTestId("phone-input"), "53253464363");
  //   await user.type(getByTestId("address-input"), "test");
  //
  //   await user.click(getByTestId("checkout-btn"));
  //
  //   expect(getByTestId("checkout-alert")).toBeInTheDocument();
  // });
});
