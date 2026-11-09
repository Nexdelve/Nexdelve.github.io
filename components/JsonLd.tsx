type JsonLdProps = {
  /** A schema.org object. Serialised into a JSON-LD script tag. */
  data: Record<string, unknown>;
};

/**
 * Emits structured data. Kept as a component so every page uses the same
 * serialisation path and no page can accidentally ship a stringified string.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Content is generated from typed objects in lib/schema.ts, never raw input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
