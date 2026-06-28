interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export const JsonLd = ({ schema }: JsonLdProps) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
);
