import { SiteHeader } from "@/components/banhu/site-header";
import { PageViews } from "@/components/banhu/page-views";
import { SiteFooter } from "@/components/banhu/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <PageViews />
      </main>
      <SiteFooter />
    </div>
  );
}
