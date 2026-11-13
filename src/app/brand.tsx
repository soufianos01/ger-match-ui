type BrandProps = {
  className?: string;
};

export function Brand({ className = "" }: BrandProps) {
  return (
    <a className={`brand ${className}`.trim()} href="#top" aria-label="GerMatch home">
      <svg className="brand-symbol" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path className="brand-symbol-primary" d="M8 9 19 20 8 31" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path className="brand-symbol-secondary" d="M32 9 21 20 32 31" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path className="brand-symbol-core" d="m20 14 6 6-6 6-6-6z" />
      </svg>
      <span className="brand-word">Ger<span>Match</span></span>
    </a>
  );
}
