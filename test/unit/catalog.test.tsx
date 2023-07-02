import {render} from "@testing-library/react";
import React from "react";
import {ProductItem} from "../../src/client/components/ProductItem";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";

describe('Каталог', () => {
  it('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', function () {

    const product = {
      id: 1,
      name: "test",
      price: 100,
    }
    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductItem product={product}/>
        </Provider>
      </BrowserRouter>
    )

    const name = container.querySelector(".card-title").textContent;
    const price = container.querySelector(".card-text").textContent;
    const link = container.querySelector(".card-link");

    expect(name).toBe(product.name);
    expect(price).toBe(`$${product.price}`);
    expect(link.getAttribute("href")).toBe(`/catalog/${product.id}`)

  });
});
