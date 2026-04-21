import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Items from "@/pages/Items/Items";

function renderItems() {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Items />
    </MemoryRouter>,
  );
  return { user };
}

describe("Items", () => {
  it("renders empty state when no items", () => {
    renderItems();
    expect(screen.getByText(/No items yet/)).toBeInTheDocument();
  });

  it("adds an item via form", async () => {
    const { user } = renderItems();

    await user.type(screen.getByPlaceholderText("Item name"), "Apple");
    await user.type(screen.getByPlaceholderText("Price"), "1.50");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText(/Apple/)).toBeInTheDocument();
    expect(screen.getByText(/\$1\.50/)).toBeInTheDocument();
  });

  it("adds multiple items in order", async () => {
    const { user } = renderItems();

    await user.type(screen.getByPlaceholderText("Item name"), "Apple");
    await user.type(screen.getByPlaceholderText("Price"), "1.50");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await user.type(screen.getByPlaceholderText("Item name"), "Banana");
    await user.type(screen.getByPlaceholderText("Price"), "0.75");
    await user.click(screen.getByRole("button", { name: "Add" }));

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Apple");
    expect(items[1]).toHaveTextContent("Banana");
  });

  it("clears form after submission", async () => {
    const { user } = renderItems();
    const nameInput = screen.getByPlaceholderText("Item name");
    const priceInput = screen.getByPlaceholderText("Price");

    await user.type(nameInput, "Apple");
    await user.type(priceInput, "1.50");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(nameInput).toHaveValue("");
    expect(priceInput).toHaveValue(null);
  });

  it("removes an item", async () => {
    const { user } = renderItems();

    await user.type(screen.getByPlaceholderText("Item name"), "Apple");
    await user.type(screen.getByPlaceholderText("Price"), "1.50");
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText(/Apple/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.queryByText(/Apple/)).not.toBeInTheDocument();
    expect(screen.getByText(/No items yet/)).toBeInTheDocument();
  });

  it("does not submit with empty name", async () => {
    const { user } = renderItems();

    await user.type(screen.getByPlaceholderText("Price"), "1.50");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText(/No items yet/)).toBeInTheDocument();
  });
});
