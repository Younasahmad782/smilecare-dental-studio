import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({ title, intro, crumbs }: { title: string; intro?: string; crumbs: { name: string; href: string }[] }) {
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-700 py-14 text-white sm:py-20">
      <div className="wrap">
        <Breadcrumbs items={crumbs} light />
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold !text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/85">{intro}</p>}
      </div>
    </section>
  );
}
