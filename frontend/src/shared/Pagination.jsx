// Qayta ishlatiladigan paginatsiya — Figma o'qituvchilar sahifasi (oqituvchilar.png).
// 1 · 2 · 3 … 40 · 41 ko'rinishida, prev/next o'qlar bilan.
export default function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = pageList(page, totalPages);

  const Btn = ({ children, disabled, active, onClick, label }) => (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium border transition flex items-center justify-center
        ${active
          ? "bg-[#125DAC] text-white border-[#125DAC]"
          : "bg-white text-[#465566] border-[#E1EAF1] hover:bg-[#F4F7F9]"}
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-2 py-6 flex-wrap">
      <Btn disabled={page <= 1} onClick={() => onChange(page - 1)} label="Oldingi">
        ‹
      </Btn>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="px-1 text-[#81909F]">…</span>
        ) : (
          <Btn key={p} active={p === page} onClick={() => onChange(p)}>
            {p}
          </Btn>
        )
      )}
      <Btn disabled={page >= totalPages} onClick={() => onChange(page + 1)} label="Keyingi">
        ›
      </Btn>
    </div>
  );
}

// Sahifa raqamlari ro'yxati (… bilan qisqartirilgan)
function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("...");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("...");
  out.push(total);
  return out;
}
