const CTAButton = ({ fullWidth = false }: { fullWidth?: boolean }) => (
  <a
    href="/#waitlist-email-input"
    className={`${
      fullWidth ? "w-full text-center" : "px-5"
    } bg-linear-to-t from-zinc-800 to-zinc-700 border border-zinc-700 hover:from-zinc-900 hover:to-zinc-800 font-semibold text-white py-2 rounded-full transition-all duration-300 inline-block`}
  >
    Join Waitlist
  </a>
);

export default CTAButton;
