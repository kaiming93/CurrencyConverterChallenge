import React from "react";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import Image from "./Image";
import "@testing-library/jest-dom/extend-expect";

describe("loads and displays an image", () => {
  test("loads correct props", () => {
    const { container } = render(
      <Image src="https://flagcdn.com/48x36/gb.png" alt="image"/>
    );
    expect(screen.getByTestId("image")).toBeInTheDocument();
    const image = getByRole(container, "img");
    fireEvent.load(image);
    expect(image).toHaveAttribute('src', 'https://flagcdn.com/48x36/gb.png')
    expect(image).toHaveAttribute('alt', 'image')
    fireEvent.error(image);
  });
});
