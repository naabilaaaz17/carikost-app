const PALETTES = [
  { wall: "#f3e8ff", floor: "#d9bf94", accent: "#a78bfa" },
  { wall: "#e0f2fe", floor: "#cfb58a", accent: "#38bdf8" },
  { wall: "#fef3c7", floor: "#d4b183", accent: "#f59e0b" },
  { wall: "#dcfce7", floor: "#d2b88e", accent: "#34d399" },
  { wall: "#fce7f3", floor: "#d8bc92", accent: "#f472b6" },
  { wall: "#ede9fe", floor: "#cdb28a", accent: "#818cf8" },
];

export default function KosRoomIllustration({ id = 0, ac = false, className = "" }) {
  const c = PALETTES[id % PALETTES.length];

  return (
    <svg viewBox="0 0 320 144" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      {/* dinding & lantai */}
      <rect width="320" height="104" fill={c.wall} />
      <rect y="104" width="320" height="40" fill={c.floor} />
      <rect y="102" width="320" height="4" fill="#00000014" />

      {/* jendela + tirai */}
      <rect x="28" y="22" width="62" height="52" rx="3" fill="#bfe3f7" stroke="#ffffff" strokeWidth="4" />
      <path d="M59 22v52M28 48h62" stroke="#ffffff" strokeWidth="3" />
      <rect x="20" y="16" width="20" height="64" rx="3" fill={c.accent} opacity="0.85" />
      <rect x="78" y="16" width="20" height="64" rx="3" fill={c.accent} opacity="0.85" />

      {/* AC (hanya kalau fasilitas ada AC) */}
      {ac && (
        <g>
          <rect x="120" y="12" width="96" height="18" rx="5" fill="#ffffff" />
          <path d="M130 24h76" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="206" cy="18" r="2" fill="#4ade80" />
        </g>
      )}

      {/* karpet */}
      <ellipse cx="168" cy="120" rx="82" ry="12" fill={c.accent} opacity="0.25" />

      {/* kasur */}
      <rect x="116" y="50" width="104" height="38" rx="5" fill="#8b6b4a" />
      <rect x="110" y="78" width="116" height="26" rx="5" fill="#ffffff" />
      <rect x="110" y="86" width="116" height="18" rx="4" fill={c.accent} />
      <rect x="118" y="68" width="38" height="13" rx="6" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="116" y="104" width="6" height="10" fill="#8b6b4a" />
      <rect x="214" y="104" width="6" height="10" fill="#8b6b4a" />

      {/* meja kecil + lampu */}
      <rect x="234" y="84" width="22" height="22" rx="2" fill="#a3825c" />
      <rect x="241" y="70" width="8" height="14" rx="2" fill="#ffffff" />
      <path d="M237 72l8-10 8 10z" fill="#fde68a" />

      {/* lemari */}
      <rect x="266" y="32" width="46" height="74" rx="3" fill="#a3825c" />
      <path d="M289 32v74" stroke="#7c5f3e" strokeWidth="2" />
      <circle cx="284" cy="70" r="2" fill="#fde68a" />
      <circle cx="294" cy="70" r="2" fill="#fde68a" />
    </svg>
  );
}