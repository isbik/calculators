import type { JSX } from "solid-js/jsx-runtime";

export type InputProps = {} & JSX.InputHTMLAttributes<HTMLInputElement>;
export const Input = (props: InputProps) => (
  <div class="flex gap-1 flex-col">
    {props.placeholder}
    <input {...props} class="form-input rounded" />
  </div>
);
