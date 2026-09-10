import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Checkout from "./Checkout";

const mockClearCart = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../hooks/useCart", () => ({
  default: () => ({
    cartItems: [
      {
        id: 1,
        name: "Laptop",
        price: 75000,
        quantity: 1,
        stock: 5,
        images: ["/laptop.jpg"],
      },
    ],
    subtotal: 75000,
    clearCart: mockClearCart,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Checkout", () => {
  beforeEach(() => {
    localStorage.clear();
    mockClearCart.mockClear();
    mockNavigate.mockClear();
  });

  it("stores only safe order data and excludes customer details", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Your name"), {
      target: { value: "Test Customer" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("you@example.com"),
      {
        target: { value: "test@example.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("10-digit mobile number"),
      {
        target: { value: "9876543210" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("House / flat / street"),
      {
        target: { value: "123 Test Street" },
      }
    );

    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Pune" },
    });

    fireEvent.change(screen.getByPlaceholderText("State"), {
      target: { value: "Maharashtra" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("6-digit pincode"),
      {
        target: { value: "411001" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Place order/i })
    );

    const savedOrder = JSON.parse(
      localStorage.getItem("novaora_last_order")
    );

    expect(savedOrder).toEqual({
      id: expect.stringMatching(/^NOVA-\d+$/),
      payment: "cod",
      items: [
        {
          id: 1,
          name: "Laptop",
          quantity: 1,
        },
      ],
      total: 75000,
      status: "Confirmed",
    });

    expect(savedOrder.customer).toBeUndefined();
    expect(savedOrder.customer?.email).toBeUndefined();
    expect(savedOrder.customer?.phone).toBeUndefined();
    expect(savedOrder.customer?.address).toBeUndefined();

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/order-success");
  });
});
