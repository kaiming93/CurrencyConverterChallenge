import React from "react";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import Image from "./Image";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays an image", () => {
  test("loads correct props with invalid src", () => {
    const { container } = render(
      <Image src="https://flagcdn.com/48x36/an.png" />
    );
    expect(screen.getByTestId("image")).toBeInTheDocument();
    const image = getByRole(container, "img");
    fireEvent.load(image);
    fireEvent.error(image);
  });
  test("loads correct props with valid src", () => {
    const { container } = render(
      <Image src="https://flagcdn.com/48x36/gb.png" />
    );
    expect(screen.getByTestId("image")).toBeInTheDocument();
    const image = getByRole(container, "img");
    fireEvent.load(image);
    fireEvent.error(image);
  });
});
