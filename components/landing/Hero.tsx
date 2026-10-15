import { DashboardLink } from "./DashboardLink";
import { ArrowUpRight, ChevronRight, PlayCircle } from "@/components/ui/icons";
import { HeroMockup } from "./HeroMockup";

export function Hero() {
  return (
    <>
      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-14 pt-32 text-center sm:px-8 sm:pt-44">
        <a
          href="#support"
          className="group mb-8 inline-flex items-center gap-2.5 rounded-full bg-white/80 py-1.5 pl-3.5 pr-2.5 text-ink shadow-[0_10px_30px_-18px_rgba(54,28,120,0.6)] transition-colors hover:bg-white"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-[12.5px] font-semibold">Mendukung Vercel, Cloudflare Pages, dan Railway</span>
          <ChevronRight size={14} className="text-ink/50 transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1 className="max-w-4xl text-[36px] font-bold leading-[1.04] tracking-[-0.03em] text-ink min-[400px]:text-[44px] sm:text-[76px]">
          Deploy without the
          <br />
          <span className="text-violet-500">hassle.</span>
        </h1>

        <p className="mx-auto mb-10 mt-6 max-w-2xl text-[16px] leading-relaxed text-ink/70 sm:text-[18px]">
          Tempel link GitHub, Depup cek isi repo-nya, lalu deploy ke{" "}
          <b className="font-semibold text-ink">Vercel</b>, <b className="font-semibold text-ink">Cloudflare Pages</b>, atau{" "}
          <b className="font-semibold text-ink">Railway</b> dari satu dashboard. Kalau repo tidak cocok, kamu tahu alasannya
          sebelum membuang waktu.
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <DashboardLink
            href="/dashboard"
            className="btn-primary inline-flex w-full items-center justify-center gap-2.5 !rounded-2xl px-7 py-4 text-[16px] sm:w-auto"
          >
            Deploy repo pertamamu
            <ArrowUpRight size={18} />
          </DashboardLink>
          <a
            href="#cara-kerja"
            className="pill inline-flex w-full items-center justify-center gap-2 !rounded-2xl px-6 py-4 text-[15px] font-medium sm:w-auto"
          >
            <PlayCircle size={18} className="text-lav-text" />
            Lihat cara kerja
          </a>
        </div>
      </section>

      <HeroMockup />
    </>
  );
}
