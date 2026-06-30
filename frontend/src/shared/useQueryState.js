import { useSearchParams } from "react-router-dom";

/* ============================================================
   URL query-param bilan sinxron holat.
   Maqsad: filter/qidiruv/sahifa raqami refreshda (F5) yo'qolmasin —
   ular manzil satriga yoziladi (?page=2&q=Ali&class=9).
   Ulashilgan havola ham o'sha holatni ochadi.
   ============================================================ */

// Matnli query-param (qidiruv, filter)
export function useQueryParam(key, defaultValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get(key);
  const value = raw === null ? defaultValue : raw;

  const setValue = (next) => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        if (next === "" || next === null || next === undefined || String(next) === String(defaultValue)) {
          p.delete(key);
        } else {
          p.set(key, String(next));
        }
        return p;
      },
      { replace: true }
    );
  };

  return [value, setValue];
}

// Raqamli query-param (pagination uchun)
export function useQueryNumber(key, defaultValue = 1) {
  const [value, setValue] = useQueryParam(key, String(defaultValue));
  const num = parseInt(value, 10);
  return [Number.isNaN(num) ? defaultValue : num, (n) => setValue(n)];
}
