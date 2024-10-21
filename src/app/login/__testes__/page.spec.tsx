import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../page";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { describe, it, expect, beforeEach } from "vitest";
import { vi, Mock } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("login page tests", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });

    vi.spyOn(Cookies, "set").mockImplementation(vi.fn());
    vi.clearAllMocks();
  });

  it("should render login page", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("should show error when credentials are incorrect", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/usuário/i), {
      target: { value: "wrong" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(
      screen.getByText(/usuário ou senha incorretos/i)
    ).toBeInTheDocument();
    expect(Cookies.set).not.toBeCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should redirect to dashboard when credentials are correct", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/usuário/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "admin" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(Cookies.set).toHaveBeenCalledWith("auth", "true");
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
    expect(
      screen.queryByText(/usuário ou senha incorretos/i)
    ).not.toBeInTheDocument();
  });
});
