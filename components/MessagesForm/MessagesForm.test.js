import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessagesForm from "./index.js";
import userEvent from "@testing-library/user-event";

test("calls the onAddMovie handler function with inputs on submit", async () => {
    const user = userEvent.setup();
    const handleOnSubmit = jest.fn();
    render(<MessagesForm onSubmit={handleOnSubmit} />);
    const nameInput = screen.getByLabelText("Your Name (optional):");
    const textInput = screen.getByLabelText("Your message:");
    const submitButton = screen.getByRole("button", { name: "Save" });
  
    await user.type(nameInput, "Alex");
    await user.type(textInput, "Hello");
    await user.click(submitButton);
  
    expect(handleOnSubmit).toHaveBeenCalledWith({
      name: "Alex",
      text: "Hello",
    });
  });