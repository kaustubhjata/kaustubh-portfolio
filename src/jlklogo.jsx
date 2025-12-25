export default function Logo() {
  return (
    <svg
      width="70"
      height="32"
      viewBox="0 0 70 32"
      className="cursor-pointer text-white"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <text
        x="0"
        y="24"
        fontSize="24"
        fontFamily="serif"
        fontWeight="700"
        letterSpacing="-0.05em"
        fill="currentColor"
      >
        JLK.
      </text>
    </svg>
  );
}
