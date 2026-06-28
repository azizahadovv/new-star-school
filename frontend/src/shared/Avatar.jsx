import { useState } from "react";

// Qayta ishlatiladigan avatar — rasm bo'lsa rasm, bo'lmasa/buzilsa initials.
// Jadval va kartochkalarda ishlatiladi (Figma o'qituvchilar/o'quvchilar).
export default function Avatar({ src, name, size = 40 }) {
  const [broken, setBroken] = useState(false);
  const initials =
    (name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase() || "?";

  if (src && !broken) {
    return (
      <img
        src={src}
        onError={() => setBroken(true)}
        alt=""
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full bg-[#E1EAF1] text-[#465566] flex items-center justify-center font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
    >
      {initials}
    </div>
  );
}
