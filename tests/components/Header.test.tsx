import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Header from "@/components/Header/Header";

describe("Header", () => {
  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Items")).toBeInTheDocument();
  });

  it("links point to correct routes", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("Items")).toHaveAttribute("href", "/items");
  });
});
