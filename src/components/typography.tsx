import { cn } from "@/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  typoType?: "h1" | "h2" | "h3" | "h4" | "p" | "code" | "small";
  variant?: "default" | "muted" | "destructive";
  className?: string;
};

function variantHandler(
  defaultClass: string,
  variant: "default" | "muted" | "destructive" = "default",
  className?: string,
) {
  return cn(
    defaultClass,
    {
      "text-primary": variant === "default",
      "text-muted": variant === "muted",
      "text-destructive": variant === "destructive",
    },
    className,
  );
}

export const Typography = ({
  children,
  typoType,
  ...addOn
}: TypographyProps) => {
  switch (typoType) {
    case "h1":
      return <Heading1 {...addOn}>{children}</Heading1>;
    case "h2":
      return <Heading2 {...addOn}>{children}</Heading2>;
    case "h3":
      return <Heading3 {...addOn}>{children}</Heading3>;
    case "h4":
      return <Heading4 {...addOn}>{children}</Heading4>;
    case "p":
      return <Paragraph {...addOn}>{children}</Paragraph>;
    case "code":
      return <InlineCode {...addOn}>{children}</InlineCode>;
    case "small":
      return <SmallText {...addOn}>{children}</SmallText>;
    default:
      return <Paragraph {...addOn}>{children}</Paragraph>;
  }
};

export const Heading1 = ({ children, variant, className }: TypographyProps) => {
  return (
    <h1
      className={variantHandler(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        variant,
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const Heading2 = ({ children, variant, className }: TypographyProps) => {
  return (
    <h2
      className={variantHandler(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        variant,
        className,
      )}
    >
      {children}
    </h2>
  );
};

export function Heading3({ children, variant, className }: TypographyProps) {
  return (
    <h3
      className={variantHandler(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        variant,
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Heading4({ children, variant, className }: TypographyProps) {
  return (
    <h4
      className={variantHandler(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        variant,
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function Paragraph({ children, variant, className }: TypographyProps) {
  return (
    <p
      className={variantHandler(
        "leading-7 [&:not(:first-child)]:mt-6",
        variant,
        className,
      )}
    >
      {children}
    </p>
  );
}

export function InlineCode({ children, variant, className }: TypographyProps) {
  return (
    <code
      className={variantHandler(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        variant,
        className,
      )}
    >
      {children}
    </code>
  );
}

export function SmallText({ children, variant, className }: TypographyProps) {
  return (
    <small
      className={variantHandler(
        "text-sm font-medium leading-none",
        variant,
        className,
      )}
    >
      {children}
    </small>
  );
}
