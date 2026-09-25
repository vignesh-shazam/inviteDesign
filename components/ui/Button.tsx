type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "rounded-full px-7 py-3 font-semibold transition duration-200";

  const variants = {
    primary: "bg-violet-500 hover:bg-violet-400 text-white",
    secondary:
      "border border-slate-700 hover:bg-slate-900 text-white",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}