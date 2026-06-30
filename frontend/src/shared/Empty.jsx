// Qayta ishlatiladigan bo'sh-holat (empty state) — chiroyli ikonka + matn.
export default function Empty({ title = "Ma'lumot topilmadi", subtitle }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-[#EEF3F7] flex items-center justify-center mb-4">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9AA7B2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4M8.5 14h7M8.5 17h4" />
        </svg>
      </div>
      <p className="text-[#263039] font-semibold text-[15px] m-0">{title}</p>
      {subtitle && <p className="text-[#81909F] text-sm mt-1 m-0">{subtitle}</p>}
    </div>
  );
}
