import type { JSX } from "solid-js/jsx-runtime";
import { InputProps, Input } from "./Input";

type Props = InputProps;

export const InputNumber = (props: Props) => {
  const PATTERN = /\D/g; // все символы, которые не числа

  const getInputNumbersValue = (value: string) => {
    return value.replace(PATTERN, "");
  };

  const handleInput = (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    const input = event.currentTarget;

    let inputNumbersValue = getInputNumbersValue(input.value);

    const selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
      return;
    }

    let formattedInputValue = inputNumbersValue;

    input.value = formattedInputValue;
  };

  const handleKeyDown = (
    event: KeyboardEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    const input = event.target as HTMLInputElement;
    if (
      event.key === "Backspace" &&
      getInputNumbersValue(input.value).length === 1
    ) {
      input.value = "";
    }

    return input;
  };

  return (
    <Input onInput={handleInput} onKeyDown={(e) => handleKeyDown} {...props} />
  );
};
