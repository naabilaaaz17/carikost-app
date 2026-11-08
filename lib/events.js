// Penghubung antar komponen client tanpa state global.
export const SURVEY_EVENT = "carikost:open-survey";
export const SEARCH_EVENT = "carikost:search";
export const LOGIN_EVENT = "carikost:open-login";

export function openSurvey() {
  window.dispatchEvent(new Event(SURVEY_EVENT));
}

export function openLogin() {
  window.dispatchEvent(new Event(LOGIN_EVENT));
}

export function runSearch(filter) {
  window.dispatchEvent(new CustomEvent(SEARCH_EVENT, { detail: filter }));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("rekomendasi")
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}