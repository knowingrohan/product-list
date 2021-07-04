import { render } from "@testing-library/react";
import ProductList from "./ProductList";

test("Product List is Initially empty", () => {
  const { getByTestId } = render(<ProductList />);
  const productList = getByTestId("productlist");
  expect(productList).toBeEmptyDOMElement();
});
