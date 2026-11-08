import { kosList } from "./kos";

/**
 * @typedef {Object} KosDetail
 * @property {string} roomSize            Ukuran kamar.
 * @property {boolean} electricityIncluded Listrik sudah termasuk harga.
 * @property {string[]} roomFacilities    Fasilitas kamar.
 * @property {string[]} bathroomFacilities Fasilitas kamar mandi.
 * @property {string[]} commonFacilities  Fasilitas umum.
 * @property {string[]} parking           Fasilitas parkir.
 * @property {string[]} rules             Peraturan kost.
 * @property {number} deposit             Deposit dalam Rupiah.
 * @property {string} owner               Nama pengelola.
 * @property {string} story               Cerita pemilik tentang kost.
 * @property {string[]} extraCosts        Biaya tambahan.
 */

const ROOM_KEYS = ["AC", "Kipas angin", "Water heater"];
const COMMON_KEYS = ["WiFi", "Dapur bersama", "Laundry", "CCTV"];
const PARKING_KEYS = ["Parkir motor", "Parkir mobil"];

const DEFAULT = {
  roomSize: "3 x 3,5 meter",
  electricityIncluded: false,
  roomExtras: ["Kasur", "Meja", "Lemari / Storage", "Ventilasi", "Jendela", "Bantal", "Kursi"],
  bathroomExtras: ["Kloset Duduk", "Wastafel", "Shower"],
  rules: [
    "Maks. 2 orang/kamar",
    "Tidak boleh bawa anak",
    "Dilarang merokok di kamar",
    "Lawan jenis dilarang ke kamar",
    "Tamu boleh menginap",
  ],
  deposit: 200000,
  owner: "Pengelola kost",
  story:
    "Warna sprei dan tata letak furnitur pada tiap kamar mungkin berbeda dari foto. Waktu kunjungan survei tersedia pukul 09.00-20.00 WIB.",
  extraCosts: ["Parkir motor GRATIS", "Tamu menginap +Rp70.000/hari"],
};

// Isi di sini kalau ada kost yang datanya beda dari DEFAULT. Contoh:
const OVERRIDES = {
  1: { owner: "Bu Rina", roomSize: "4 x 3,5 meter", electricityIncluded: true },
};

/** @param {number} id @returns {(import("./kos").Kos & KosDetail) | undefined} */
export function getKosDetail(id) {
  const kos = kosList.find((k) => k.id === id);
  if (!kos) return undefined;

  const d = { ...DEFAULT, ...OVERRIDES[id] };
  const has = (keys) => kos.facilities.filter((f) => keys.includes(f));

  return {
    ...kos,
    roomSize: d.roomSize,
    electricityIncluded: d.electricityIncluded,
    roomFacilities: [...has(ROOM_KEYS), ...d.roomExtras],
    bathroomFacilities: [
      ...(kos.facilities.includes("Kamar mandi dalam") ? ["K. Mandi Dalam"] : ["K. Mandi Luar"]),
      ...d.bathroomExtras,
    ],
    commonFacilities: has(COMMON_KEYS),
    parking: has(PARKING_KEYS),
    rules: d.rules,
    deposit: d.deposit,
    owner: d.owner,
    story: d.story,
    extraCosts: d.extraCosts,
  };
}