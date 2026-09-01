// Data fallback per sesi event, dicocokkan berdasarkan `name`.
// Dipakai buat isi field yang kosong/null dari API (misal `imageUrl`
// yang memang tidak ada di response API, atau field lain yang
// kebetulan kosong untuk event tertentu).
export const eventDataHelper = [
  {
    name: "HOLY MATRIMONY",
    date: "2026-10-03T12:00:26",
    address: "Jl. Sudirman No.193-197, Bandung, Jawa Barat",
    addressName: "GKI ANUGERAH",
    imageUrl: "/images/venue_1_a.png",
    urlAdress: "https://maps.app.goo.gl/5eej7ebxUzoRXscj9",
  },
  {
    name: "WEDDING RECEPTION",
    date: "2026-10-03T18:00:26",
    address: "Jl. Parahyangan Raya KM 1, Cipeundeuy, Padalarang, Jawa Barat",
    addressName: "MASON PINE HOTEL MASON BALLROOM",
    imageUrl: "/images/venue_2_a.png",
    urlAdress: "https://maps.app.goo.gl/YCuGJqE1hpVoHqPz6",
  },
];

type EventHelperItem = (typeof eventDataHelper)[number];

// Field yang di daftar ini SELALU dipaksa pakai value dari
// eventDataHelper, walaupun API punya isi buat field itu.
// Field lain di luar daftar ini tetap pakai logika normal: pakai API
// kalau ada isinya, fallback ke helper cuma kalau API-nya kosong.
const ALWAYS_USE_HELPER_FIELDS: (keyof EventHelperItem)[] = ["address"];

/**
 * Cari data fallback di eventDataHelper berdasarkan `name`
 * (case-insensitive, biar "Wedding Reception" vs "WEDDING RECEPTION"
 * tetap match).
 */
function findHelperByName(name?: string): EventHelperItem | undefined {
  if (!name) return undefined;
  return eventDataHelper.find(
    (item) => item.name.trim().toLowerCase() === name.trim().toLowerCase()
  );
}

/**
 * Merge satu event dari API dengan data fallback di eventDataHelper.
 * - Field di ALWAYS_USE_HELPER_FIELDS: selalu pakai value dari helper
 *   (kalau ada match by name), walau API punya isi.
 * - Field lain: pakai API kalau ada isinya, fallback ke helper cuma
 *   kalau API-nya kosong/null/undefined.
 * Field API yang tidak ada di helper (id, eventSessionId, dst) tetap
 * dipertahankan apa adanya.
 */
export function mergeEventWithHelper<T extends { name?: string }>(apiEvent: T): T {
  const helperMatch = findHelperByName(apiEvent.name);
  if (!helperMatch) return apiEvent;

  const merged = { ...apiEvent } as Record<string, unknown>;

  (Object.keys(helperMatch) as (keyof EventHelperItem)[]).forEach((key) => {
    const forceFromHelper = ALWAYS_USE_HELPER_FIELDS.includes(key);

    if (forceFromHelper) {
      merged[key] = helperMatch[key];
      return;
    }

    const apiValue = merged[key];
    const isEmpty = apiValue === null || apiValue === undefined || apiValue === "";
    if (isEmpty) {
      merged[key] = helperMatch[key];
    }
  });

  return merged as T;
}

/**
 * Loop semua event dari API, merge tiap item sama data fallback-nya.
 * Urutan & jumlah data tetap ikut API — helper cuma dipakai buat
 * nambal field yang kosong (atau override paksa untuk field di
 * ALWAYS_USE_HELPER_FIELDS).
 */
export function mergeEventListWithHelper<T extends { name?: string }>(apiEvents: T[]): T[] {
  return apiEvents.map((event) => mergeEventWithHelper(event));
}