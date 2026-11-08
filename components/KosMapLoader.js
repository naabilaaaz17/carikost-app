"use client";

import dynamic from "next/dynamic";

const KosMap = dynamic(() => import("./KosMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-brand-50" />,
});

export default KosMap;