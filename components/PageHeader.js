export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-gradient-to-br from-plum-900 via-plum-900 to-brand-700 px-4 py-14 text-center text-white sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100 sm:text-base">{subtitle}</p>}
    </section>
  );
}