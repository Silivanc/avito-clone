import clsx from "clsx";
import { FC } from "react";

interface ButtonProps {
  text: string;
  fn: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  styles?: string;
}

export const Button: FC<ButtonProps> = ({
  text,
  fn,
  styles,
  type = "button",
}) => {
  return (
    <button
      className={clsx("px-3 rounded-2xl cursor-pointer", styles)}
      type={type}
      onClick={() => {
        fn();
      }}
    >
      {text}
    </button>
  );
};
