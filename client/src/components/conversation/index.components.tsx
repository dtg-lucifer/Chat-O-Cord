import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

const inputCVA = cva("outline-none text-sm w-full", {
  variants: {
    variant: {
      filled: ["px-4", "py-3", "bg-gray-200"],
      outlined: ["border", "px-4", "py-3", "border-gray-200"],
      sideBarSearch: [
        "bg-[#101010]",
        "border-none",
        "rounded-[0.5rem]",
        "text-[#f8f9fa]",
        "px-4",
        "py-3",
      ],
    },
    size: {
      sm: "px-2 py-1",
      md: "px-3 py-2",
      lg: "px-4 py-3",
    },
  },
});

const buttonCVA = cva("outline-none text-sm", {
  variants: {
    variant: {
      filled: ["px-4", "py-2", "bg-gray-200", "hover:bg-gray-300"],
      outlined: [
        "border",
        "px-4",
        "py-2",
        "border-gray-200",
        "hover:border-gray-300",
        "transition",
        "ease-in-out",
        "duration-200",
      ],
      sideBarFilter: [
        "bg-[#333333]",
        "px-3",
        "py-2",
        "hover:bg-[#444444]",
        "transition",
        "ease-in-out",
        "duration-200",
        "rounded-[3px]",
      ],
    },
  }
});

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputCVA> {
  emojiPanel?: boolean;
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonCVA> {
  children: React.ReactNode;
}

export const TextField = ({
  variant,
  size,
  emojiPanel,
  ...props
}: TextFieldProps) => {
  if (!emojiPanel) {
    return <input className={inputCVA({ variant, size })} {...props} />;
  } else {
    // TODO: Add emoji panel
    return (
      <span>
        <input className={inputCVA({ variant, size })} {...props} />
      </span>
    );
  }
};

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={buttonCVA({ variant })} {...props}>
      {children}
    </button>
  );
};
