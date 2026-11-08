/**
 * @typedef {Object} Kos
 * @property {number} id                           ID unik kost.
 * @property {string} name                         Nama kost.
 * @property {string} district                     Area/kecamatan, mis. "Tebet".
 * @property {"Putra" | "Putri" | "Campur"} type   Tipe penghuni.
 * @property {number} price                        Harga sewa per bulan dalam Rupiah, sebelum diskon (angka mentah).
 * @property {number} rating                       Rating rata-rata dari penghuni (0-5).
 * @property {number} roomsLeft                    Jumlah kamar yang masih kosong.
 * @property {string[]} facilities                 Daftar fasilitas, mis. ["AC", "WiFi"].
 * @property {string} imageUrl                     Path/URL foto utama kost.
 * @property {string} city                         (tambahan) Kota lokasi kost.
 * @property {number} discount                     (tambahan) Diskon dalam persen, 0 jika tidak ada.
 * @property {boolean} isNew                       (tambahan) Penanda kost baru.
 * @property {number} lat                          Latitude lokasi kost.
 * @property {number} lng                          Longitude lokasi kost.
 * @property {("bulanan" | "tahunan")[]} periods   Periode sewa yang diterima kost ini.
 */

export const CITY_OPTIONS = ["Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Semarang", "Malang"];

const BASE = [
  { id: 1, name: "Kost Melati Asri", district: "Tebet", city: "Jakarta", type: "Putri", price: 1850000, discount: 0, rating: 4.8, roomsLeft: 2, facilities: ["AC", "Kamar mandi dalam", "WiFi"], imageUrl: "/kamar1.jpg", isNew: false },
  { id: 2, name: "Griya Kenanga", district: "Dago", city: "Bandung", type: "Putra", price: 1450000, discount: 15, rating: 4.7, roomsLeft: 5, facilities: ["WiFi", "Parkir motor", "Kamar mandi dalam"], imageUrl: "/kamar2.jpg", isNew: false },
  { id: 3, name: "Kost Sakura Hijau", district: "Seturan", city: "Yogyakarta", type: "Campur", price: 1200000, discount: 0, rating: 4.6, roomsLeft: 4, facilities: ["Kipas angin", "WiFi", "Dapur bersama"], imageUrl: "/kamar3.jpg", isNew: false },
  { id: 4, name: "Rumah Cempaka", district: "Gubeng", city: "Surabaya", type: "Putri", price: 1650000, discount: 20, rating: 4.9, roomsLeft: 1, facilities: ["AC", "WiFi", "CCTV"], imageUrl: "/kamar4.jpg", isNew: false },
  { id: 5, name: "Kost Flamboyan", district: "Tembalang", city: "Semarang", type: "Putra", price: 950000, discount: 0, rating: 4.5, roomsLeft: 6, facilities: ["Kipas angin", "WiFi", "Parkir motor"], imageUrl: "/kamar5.jpg", isNew: false },
  { id: 6, name: "Paviliun Dahlia", district: "Mampang", city: "Jakarta", type: "Campur", price: 2300000, discount: 0, rating: 4.8, roomsLeft: 3, facilities: ["AC", "Water heater", "Laundry"], imageUrl: "/kamar6.jpg", isNew: true },
  { id: 7, name: "Kost Teratai Putih", district: "Condongcatur", city: "Yogyakarta", type: "Putri", price: 1100000, discount: 10, rating: 4.7, roomsLeft: 2, facilities: ["WiFi", "Dapur bersama", "Laundry"], imageUrl: "/kamar7.jpg", isNew: false },
  { id: 8, name: "Wisma Cendana", district: "Cihampelas", city: "Bandung", type: "Putra", price: 1300000, discount: 0, rating: 4.4, roomsLeft: 7, facilities: ["AC", "WiFi", "Parkir motor"], imageUrl: "/kamar8.jpg", isNew: true },
  { id: 9, name: "Kost Bougenville", district: "Rungkut", city: "Surabaya", type: "Campur", price: 1500000, discount: 0, rating: 4.6, roomsLeft: 4, facilities: ["AC", "Kamar mandi dalam", "WiFi"], imageUrl: "/kamar9.jpg", isNew: true },
  { id: 10, name: "Griya Alamanda", district: "Banyumanik", city: "Semarang", type: "Putri", price: 1050000, discount: 0, rating: 4.7, roomsLeft: 3, facilities: ["WiFi", "CCTV", "Dapur bersama"], imageUrl: "/kamar10.jpg", isNew: true },
  { id: 11, name: "Kost Lavender", district: "Lowokwaru", city: "Malang", type: "Putri", price: 900000, discount: 0, rating: 4.5, roomsLeft: 5, facilities: ["Kipas angin", "WiFi", "Laundry"], imageUrl: "/kamar11.jpg", isNew: true },
  { id: 12, name: "Kost Mawar Biru", district: "Kuningan", city: "Jakarta", type: "Putra", price: 2100000, discount: 15, rating: 4.6, roomsLeft: 2, facilities: ["AC", "Kamar mandi dalam", "Parkir mobil"], imageUrl: "/kamar12.jpg", isNew: false },
];

// Koordinat perkiraan per area. Ganti dengan koordinat asli tiap kost nanti.
const COORDS = {
  1: [-6.226, 106.853],
  2: [-6.885, 107.613],
  3: [-7.77, 110.408],
  4: [-7.276, 112.75],
  5: [-7.051, 110.438],
  6: [-6.25, 106.823],
  7: [-7.76, 110.395],
  8: [-6.896, 107.604],
  9: [-7.33, 112.77],
  10: [-7.09, 110.42],
  11: [-7.946, 112.615],
  12: [-6.23, 106.83],
};

// Periode sewa per kost. Yang tidak tercantum dianggap hanya bulanan.
const PERIODS_BY_ID = {
  1: ["bulanan", "tahunan"],
  3: ["bulanan", "tahunan"],
  5: ["bulanan", "tahunan"],
  8: ["bulanan", "tahunan"],
  9: ["tahunan"], // contoh kost yang hanya terima sewa tahunan
  10: ["bulanan", "tahunan"],
  12: ["bulanan", "tahunan"],
};

/** @type {Kos[]} */
export const kosList = BASE.map((k) => ({
  ...k,
  lat: COORDS[k.id][0],
  lng: COORDS[k.id][1],
  periods: PERIODS_BY_ID[k.id] ?? ["bulanan"],
}));