import Image from "next/image";
import { DashboardLink } from "./DashboardLink";

export function Footer() {
  return (
    <footer className="text-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" />
            <span className="text-[18px] font-bold tracking-tight">Depup</span>
          </div>
          <p className="max-w-sm text-[13px] leading-relaxed text-ink/85">
            Dashboard untuk deploy dan kelola project di Vercel, Cloudflare Pages, dan Railway.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] font-medium text-ink/90">
          <DashboardLink href="/dashboard" className="transition-colors hover:text-ink">Panduan</DashboardLink>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">GitHub</a>
          <a href="/donate" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">Dukung lewat Saweria</a>
        </nav>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 py-4 text-[12px] text-ink/80 sm:px-8">© {new Date().getFullYear()} Depup</div>
      </div>
    </footer>
  );
}
