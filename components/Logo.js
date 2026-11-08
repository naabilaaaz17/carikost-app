import Image from "next/image";

export default function Logo({ light = false, className = "h-8 w-auto" }) {
  return (
    <Image
      src={light ? "/logo-carikost-putih.png" : "/logo-carikost.png"}
      alt="Carikost"
      width={1285}
      height={379}
      priority
      className={className}
    />
  );
}