import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toBeVisible } from "@testing-library/jest-dom/matchers";
// import userEvent from "@testing-library/user-event";

import Basic from "../components/Basic";

expect.extend({ toBeVisible });

describe("<Basic />", () => {
  test("shows big buttons and balance", () => {
    // const { container } = render(<Basic />);
    render(<Basic />);

    const moneys = screen.getByTestId("moneys");
    const minusButton = screen.getByText("-");
    const plusButton = screen.getByText("+");

    expect(moneys).toHaveTextContent("Balance");
    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
  });

  test("balance modal opens", async () => {
    render(<Basic />);

    // const user = userEvent;

    const minusButton = screen.getByText("-");
    const plusButton = screen.getByText("+");
    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();

    expect(minusButton).toBeVisible();
    expect(plusButton).toBeVisible();

    const balanceButton = screen.getByTestId("balance");
    fireEvent.click(balanceButton);

    await waitFor(() => {
      expect(minusButton).not.toBeVisible();
    });

    await waitFor(() => {
      expect(plusButton).not.toBeVisible();
    });
  });
});
