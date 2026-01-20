const BurgerButton = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <button
    onClick={toggle}
    className="flex flex-col gap-1 p-2 hover:bg-zinc-800 rounded-lg transition-colors duration-200"
    aria-label="Toggle mobile menu"
  >
    <div
      className={`w-5 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "rotate-45 translate-y-1.5" : ""
      }`}
    ></div>
    <div
      className={`w-5 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "opacity-0" : ""
      }`}
    ></div>
    <div
      className={`w-5 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "-rotate-45 -translate-y-1.5" : ""
      }`}
    ></div>
  </button>
);

export default BurgerButton;
