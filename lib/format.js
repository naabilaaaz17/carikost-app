const rupiah = new Intl.NumberFormat("id-ID");

/** @param {number} value Harga dalam Rupiah. @returns {string} mis. "Rp 1.200.000" */
export const formatRupiah = (value) => `Rp ${rupiah.format(value)}`;

/** @param {number} value @returns {string} mis. "4,8" */
export const formatRating = (value) => value.toFixed(1).replace(".", ",");

/** @param {{ price: number, discount: number }} kos @returns {number} Harga setelah diskon, dibulatkan. */
export const getFinalPrice = ({ price, discount }) => Math.round(price * (1 - discount / 100));
export const PERIODS = {
  bulanan: { label: "Bulanan", months: 1, unit: "bulan" },
  tahunan: { label: "Tahunan", months: 12, unit: "tahun" },
};

/** Harga setelah diskon untuk periode tertentu. */
export const getPeriodPrice = (kos, period = "bulanan") =>
  getFinalPrice(kos) * PERIODS[period].months;