import { VariantProps, cva } from "class-variance-authority";
import React, {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
} from "react";

const inputCVA = cva("outline-none text-sm w-full", {
  variants: {
    variant: {
      base: [
        "bg-[#101010]",
        "border-none",
        "rounded-[0.5rem]",
        "text-[#f8f9fa]",
        "px-4",
        "py-3",
      ],
      chat: [
        "bg-[#1f1f1f]",
        "border-none",
        "rounded-[0.5rem]",
        "text-[#f8f9fa]",
        "px-4",
        "py-3",
      ],
    },
    size: {
      lg: ["px-5", "py-4", "text-[15px]"],
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
        "bg-[#101010]",
        "px-3",
        "py-2",
        "hover:bg-[#444444]",
        "transition",
        "ease-in-out",
        "duration-200",
        "rounded-[3px]",
      ],
      active: [
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
  },
});

const messageCVA = cva("", {
  variants: {
    variant: {
      withImg: ["flex", "gap-2", "items-start"],
      withoutImg: ["flex", "gap-2", "items-start"],
    },
  },
});

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputCVA> {
  ref?: React.Ref<HTMLInputElement>;
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonCVA> {
  children: React.ReactNode;
}

interface MessageProps
  extends AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageCVA> {
  children: React.ReactNode[];
}

export const TextField = ({ variant, size, ...props }: TextFieldProps) => {
  return <input className={inputCVA({ variant, size })} {...props} />;
};

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={buttonCVA({ variant })} {...props}>
      {children}
    </button>
  );
};

export const Message = ({ variant, children, ...props }: MessageProps) => {
  return (
    <div className={messageCVA({ variant })} {...props}>
      {children.map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </div>
  );
};
