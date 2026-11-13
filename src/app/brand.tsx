export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="GerMatch home">
      <svg className="brand-symbol" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M8 9 19 20 8 31" stroke="#285BDB" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 9 21 20 32 31" stroke="#153B9E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m20 14 6 6-6 6-6-6z" fill="#FFD860" />
      </svg>
      <span className="brand-word">Ger<span>Match</span></span>
    </a>
  );
}
