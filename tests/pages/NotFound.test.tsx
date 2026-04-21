import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import NotFound from "@/pages/NotFound/NotFound";

describe("NotFound", () => {
  it("renders 404 message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText("Page not found.")).toBeInTheDocument();
  });

  it("contains link to Home", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: /go back home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
