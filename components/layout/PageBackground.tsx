export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27]" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#3AA7FF]/20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#F5B84B]/20 blur-[120px]" />
    </div>
  );
}
