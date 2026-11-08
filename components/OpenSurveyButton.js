"use client";

import { openSurvey } from "../lib/events";

export default function OpenSurveyButton({ children, className = "" }) {
  return (
    <button type="button" onClick={openSurvey} className={className}>
      {children}
    </button>
  );
}