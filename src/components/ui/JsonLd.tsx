/** Renders JSON-LD. "<" is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | null | (Record<string, unknown> | null)[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!items.length) return null;
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
