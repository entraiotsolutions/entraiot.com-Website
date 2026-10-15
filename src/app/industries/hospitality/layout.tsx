import { JsonLd } from "@/components/seo/json-ld";
import { industryStructuredData } from "@/lib/structured-data";

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  const data = industryStructuredData("hospitality");
  return (
    <>
      {data && <JsonLd data={data} />}
      {children}
    </>
  );
}
