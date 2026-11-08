import PageShell from "../../components/PageShell";
import KosExplorer from "../../components/KosExplorer";

export const metadata = { title: "Cari Kost" };

export default function KosPage() {
  return (
    <PageShell>
      <KosExplorer />
    </PageShell>
  );
}