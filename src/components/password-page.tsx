import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header, Footer, AnnouncementBar } from "@/components/site-chrome";
import { StoreImage } from "@/components/store-image";
import background from "@/assets/register-wallpaper.jpg.asset.json";
import logo from "@/assets/nip_logo.png.asset.json";
import { Button } from "@/components/ui/button";

export function PasswordPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <AnnouncementBar />
      <main className="relative isolate flex min-h-[660px] flex-1 items-center justify-center overflow-hidden px-5 py-12 sm:min-h-[740px]">
        <StoreImage src={background.url} alt="" aria-hidden="true" loading="eager" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-foreground/25" aria-hidden="true" />
        <section className="w-full max-w-[420px] border border-foreground/70 bg-background p-1 shadow-xl">
          <div className="border border-foreground/35 px-6 py-8 sm:px-8">
            <StoreImage src={logo.url} alt="Notions in Pattern" className="mx-auto h-24 w-auto object-contain" />
            <h1 className="mb-7 text-center font-serif text-3xl leading-tight">{title}</h1>
            {children}
            <Button asChild variant="link" className="mt-5 w-full text-xs">
              <Link to="/login" search={{ redirect: "/cart" }}><ArrowLeft /> Back to login</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}