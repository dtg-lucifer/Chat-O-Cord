import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const inputCVA = cva("outline-none text-sm w-full", {
  variants: {
    variant: {
      filled: "px-4 py-2 bg-gray-200",
      outlined: "border px-4 py-2 border-gray-200",
      sideBarSearch:
        "bg-[#101010] border-none rounded-[0.5rem] text-[#f8f9fa] px-4 py-3",
    },
    size: {
      sm: "px-2 py-1",
      md: "px-3 py-2",
      lg: "px-4 py-3",
    },
  },
});

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputCVA> {
  emojiPanel?: boolean;
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
