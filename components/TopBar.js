import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-brand-700 text-xs text-brand-50">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-5 px-4 py-1.5">
        <a href="#download" className="hover:underline">Download App</a>
        <Link href="/sewa" className="hover:underline">Sewa Kost</Link>
        <Link href="/promosikan-iklan" className="hover:underline">Promosikan Iklan Anda</Link>
      </div>
    </div>
  );
}