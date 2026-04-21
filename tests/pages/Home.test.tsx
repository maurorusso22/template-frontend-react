import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Home from "@/pages/Home/Home";

describe("Home", () => {
  it("renders welcome heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
  });

  it("contains expected content", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(/React frontend template/)).toBeInTheDocument();
  });
});
