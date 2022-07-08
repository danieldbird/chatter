import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the chatter page title", () => {
  render(<App />);
  const pageTitle = screen.getByText(/chatter/i);
  expect(pageTitle).toBeInTheDocument();
});
