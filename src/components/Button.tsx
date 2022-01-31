import clsx from "clsx";
import * as React from "react";

type Props = {
  className?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  placeholderClassName?: string;
  onClick?: () => void;
};

export function IconWithTextButton({
  icon,
  className: styles,
  placeholder,
  placeholderClassName,
  onClick,
}: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center px-4 py-2 transition ease-in-out delay 100 hover:-translate-y-1 hover:scale-105 hover:shadow-blue-500/50 shadow-md",
        "text-sm leading-4 font-medium rounded-md",
        styles
      )}
      onClick={onClick}
    >
      <span className="-ml-0.5 mr-1 h-4 w-4 ">{icon}</span>

      {placeholder}
    </button>
  );
}
