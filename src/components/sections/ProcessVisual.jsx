// Original schematic illustrations: no client data, stock images or external assets.
function Frame({ children }) {
  return (
    <div aria-hidden="true" className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#11100F]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#EB5002]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-auto text-[0.6rem] uppercase tracking-[0.16em] text-white/45">Process sketch</span>
      </div>
      <svg viewBox="0 0 480 300" fill="none" className="block w-full" focusable="false" style={{ fontFamily: "inherit" }}>{children}</svg>
    </div>
  );
}

export default function ProcessVisual({ phase }) {
  if (phase === "understand") return <Frame>
    <path d="M204 64H246V150H292M204 150H292M204 236H246V150" stroke="#EB5002" strokeWidth="2" />
    {["Purpose", "Audience", "Requirements"].map((label, index) => <g key={label}>
      <rect x="32" y={36 + index * 86} width="172" height="56" rx="12" fill="#0A0A0A" stroke="white" strokeOpacity="0.15" />
      <text x="52" y={70 + index * 86} fill="#FAF7F2" fontSize="16">{label}</text>
    </g>)}
    <rect x="292" y="104" width="156" height="92" rx="18" fill="#EB5002" fillOpacity="0.08" stroke="#EB5002" />
    <circle cx="318" cy="132" r="4" fill="#EB5002" />
    <text x="316" y="165" fill="#FAF7F2" fontSize="22">Scope</text>
  </Frame>;
  if (phase === "design") return <Frame>
    <rect x="32" y="28" width="416" height="244" rx="12" fill="#FAF7F2" />
    <rect x="48" y="44" width="384" height="24" rx="6" fill="#1A1613" fillOpacity="0.09" />
    <rect x="60" y="52" width="42" height="8" rx="4" fill="#EB5002" />
    <path d="M330 56H350M364 56H384M398 56H418" stroke="#1A1613" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
    <rect x="52" y="92" width="196" height="14" rx="4" fill="#1A1613" />
    <rect x="52" y="118" width="160" height="6" rx="3" fill="#1A1613" fillOpacity="0.3" />
    <rect x="52" y="132" width="128" height="6" rx="3" fill="#1A1613" fillOpacity="0.2" />
    <rect x="52" y="154" width="96" height="22" rx="11" fill="#EB5002" />
    <rect x="290" y="86" width="136" height="94" rx="12" fill="#1A1613" fillOpacity="0.06" stroke="#EB5002" strokeDasharray="4 5" />
    {[52, 180, 308].map(x => <rect key={x} x={x} y="202" width="114" height="48" rx="8" fill="#1A1613" fillOpacity="0.07" />)}
  </Frame>;
  if (phase === "build") return <Frame>
    <rect x="32" y="30" width="416" height="138" rx="12" fill="#0A0A0A" stroke="white" strokeOpacity="0.12" />
    <text x="52" y="62" fill="#EB5002" fontSize="14">Interface + logic + data</text>
    <path d="M52 88H124M138 88H246M68 110H184M198 110H306M68 132H142M156 132H260" stroke="#FAF7F2" strokeOpacity="0.3" strokeWidth="7" strokeLinecap="round" />
    <path d="M154 226H186M294 226H326" stroke="#EB5002" strokeWidth="2" />
    {["UI", "API", "Data"].map((label, index) => <g key={label}>
      <rect x={46 + index * 140} y="196" width="108" height="60" rx="12" fill="#EB5002" fillOpacity="0.06" stroke="#EB5002" strokeOpacity="0.6" />
      <text x={100 + index * 140} y="233" textAnchor="middle" fill="#FAF7F2" fontSize="18">{label}</text>
    </g>)}
  </Frame>;
  return <Frame>
    <path d="M274 162H308V92H356" stroke="#EB5002" strokeWidth="2" />
    <path d="M346 82L356 92L346 102" stroke="#EB5002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="30" y="40" width="244" height="220" rx="16" fill="#0A0A0A" stroke="white" strokeOpacity="0.15" />
    {["Review", "Deploy", "Handover"].map((label, index) => <g key={label}>
      <circle cx="62" cy={88 + index * 62} r="10" stroke="#EB5002" />
      <text x="88" y={94 + index * 62} fill="#FAF7F2" fontSize="18">{label}</text>
    </g>)}
    <rect x="356" y="56" width="96" height="168" rx="14" fill="#FAF7F2" />
    <rect x="369" y="78" width="70" height="54" rx="8" fill="#EB5002" fillOpacity="0.15" />
    <path d="M369 152H432M369 168H418" stroke="#1A1613" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
    <rect x="369" y="188" width="48" height="15" rx="7.5" fill="#EB5002" />
  </Frame>;
}
