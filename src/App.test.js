import { render, screen } from "@testing-library/react";
import App from "./App";

test("Debounce Input Is present", () => {
  const { getByTestId } = render(<App />);
  const searchBar = getByTestId("search-bar");
  expect(searchBar).toBeTruthy();
});

test("There are three radio filter buttons", () => {
  render(<App />);
  expect(screen.getAllByRole("radio")).toHaveLength(3);
});

it("App Renders with a className equal to the variant", () => {
  const { container } = render(<App />);

  expect(container.firstChild).toHaveClass("app-container");
});

test("Debounce Input has class search bar", () => {
  const { getByTestId } = render(<App />);
  const searchBar = getByTestId("search-bar");
  expect(searchBar).toHaveClass("search-bar");
});
