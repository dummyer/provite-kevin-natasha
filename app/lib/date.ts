function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"; // 11th, 12th, 13th (exception)
  switch (day % 10) {
    case 1: return "st";  // 1st, 21st, 31st
    case 2: return "nd";  // 2nd, 22nd
    case 3: return "rd";  // 3rd, 23rd
    default: return "th"; // 4th, 5th, ..., 25th
  }
}
/* Format tanggal ISO jadi teks Indonesia, contoh: "SELASA, 25 AGUSTUS 2026" */
export function formatEventDate(
  dateStr: string | null | undefined,
  defaultDate: string = "2026-08-25T00:00:00"
): string {
  const target = dateStr || defaultDate;
  const d = new Date(target);

  const formatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).formatToParts(d);

  const weekday = formatted.find((part) => part.type === "weekday")?.value;
  const day = formatted.find((part) => part.type === "day")?.value;
  const month = formatted.find((part) => part.type === "month")?.value;
  const year = formatted.find((part) => part.type === "year")?.value;

  return `${weekday}, ${day} ${month} ${year}`.toUpperCase();
}

export function formatEventDateParts(
  dateStr: string | null | undefined,
  defaultDate: string = "2026-08-25T00:00:00"
): { weekday: string; day: string; month: string; year: string } {
  const target = dateStr || defaultDate;
  const d = new Date(target);

  const formatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric", // ganti dari "2-digit" ke "numeric", biar dapet angka murni (25, bukan "25")
    month: "long",
    year: "numeric",
  }).formatToParts(d);

  const weekday = formatted.find((part) => part.type === "weekday")?.value ?? "";
  const dayNum = Number(formatted.find((part) => part.type === "day")?.value ?? "0");
  const month = formatted.find((part) => part.type === "month")?.value ?? "";
  const year = formatted.find((part) => part.type === "year")?.value ?? "";

  const dayWithSuffix = `${dayNum}${getOrdinalSuffix(dayNum)}`; // "25th"

  return {
    weekday,
    day: `${dayWithSuffix} of ${month}`, // "25th of October"
    month, // tetep disediain terpisah kalau butuh
    year,
  };
}
/* Ambil timestamp (ms) dari tanggal ISO, buat dipakai di countdown. */
export function getEventTimestamp(
    dateStr: string | null | undefined,
    defaultDate: string = "2026-08-25T00:00:00"
): number {
    const target = dateStr || defaultDate;
    return new Date(target).getTime();
}