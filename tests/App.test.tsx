import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import Layout from "@/components/Layout/Layout";
import Home from "@/pages/Home/Home";
import Items from "@/pages/Items/Items";
import NotFound from "@/pages/NotFound/NotFound";

const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/items", element: <Items /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

describe("App", () => {
  it("renders without crashing", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Template Frontend React")).toBeInTheDocument();
  });

  it("shows Home page as the default route", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByRole("heading", { name: "Welcome" })).toBeInTheDocument();
  });
});
