interface CanonicalUrlProps {
  url: string;
}

export function CanonicalUrl({ url }: CanonicalUrlProps) {
  return <link rel="canonical" href={url} />;
}
