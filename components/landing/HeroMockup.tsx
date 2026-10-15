"use client";

import * as React from "react";
import Image from "next/image";
import { Check, FolderKanban, GitBranch, GitCommitHorizontal, Globe2, LayoutDashboard, Minus, RefreshCw, Rocket, Search, TriangleAlert } from "@/components/ui/icons";

type Level = "ok" | "warn" | "blocked";
type Platform = "Vercel" | "Cloudflare Pages" | "Railway";

/** Contoh nyata dari aturan pengecekan repo Depup (lihat lib/deploy-guides.ts). */
const SAMPLES: {
  tab: string;
  repo: string;
  type: string;
  verdict: Record<Platform, [Level, string]>;
}[] = [
  {
    tab: "HTML biasa",
    repo: "tokokopi/landing",
    type: "HTML statis",
    verdict: {
      Vercel: ["ok", "Siap deploy, tanpa package.json"],
      "Cloudflare Pages": ["ok", "Siap deploy, tanpa build"],
      Railway: ["ok", "Siap deploy"],
    },
  },
  {
    tab: "Vue + TypeScript",
    repo: "studio/portfolio",
    type: "Vue + Vite (TypeScript)",
    verdict: {
      Vercel: ["ok", "Build otomatis"],
      "Cloudflare Pages": ["ok", "Output dist/ diatur otomatis"],
      Railway: ["ok", "Siap deploy"],
    },
  },
  {
    tab: "Express",
    repo: "dimas/api-toko",
    type: "Express (server Node.js)",
    verdict: {
      Vercel: ["warn", "Butuh penyesuaian serverless"],
      "Cloudflare Pages": ["blocked", "Server Node.js tidak jalan di Pages"],
      Railway: ["ok", "Cocok untuk server"],
    },
  },
  {
    tab: "Python",
    repo: "rani/bot-flask",
    type: "Python",
    verdict: {
      Vercel: ["blocked", "Hanya untuk situs web"],
      "Cloudflare Pages": ["blocked", "Hanya untuk situs web"],
      Railway: ["ok", "Dibangun otomatis"],
    },
  },
];

const ICON = { ok: Check, warn: TriangleAlert, blocked: Minus } as const;
const TONE: Record<Level, string> = {
  ok: "text-emerald-700",
  warn: "text-amber-700",
  blocked: "text-ink/45",
};
const LABEL: Record<Level, string> = { ok: "Cocok", warn: "Dengan catatan", blocked: "Tidak cocok" };

/** Warna kartu pastel per platform, supaya tiap kolom mudah dikenali. */
const PLATFORM_TONE: Record<Platform, string> = {
  Vercel: "bg-violet-100",
  "Cloudflare Pages": "bg-mist",
  Railway: "bg-lime-100",
};

const DEPLOYS = [
  { name: "tokokopi-landing", platform: "VERCEL", ref: "main", when: "2 mnt lalu", status: "ready", link: "tokokopi.id" },
  { name: "api-toko", platform: "RAILWAY", ref: "main", when: "baru saja", status: "building", link: "sedang berjalan" },
  { name: "studio-portfolio", platform: "CLOUDFLARE", ref: "main", when: "18 mnt lalu", status: "ready", link: "studio.pages.dev" },
  { name: "bot-flask", platform: "RAILWAY", ref: "fix/webhook", when: "1 jam lalu", status: "failed", link: "Lihat log" },
] as const;

const STATUS = {
  ready: { label: "Ready", dot: "bg-emerald-500" },
  building: { label: "Building", dot: "bg-amber-500" },
  failed: { label: "Failed", dot: "bg-red-500" },
} as const;

const SIDE_ICONS = [LayoutDashboard, FolderKanban, Rocket, Globe2];

export function HeroMockup() {
  const [i, setI] = React.useState(0);
  const s = SAMPLES[i];
  const platforms = Object.keys(s.verdict) as Platform[];

  return (
    <section className="relative mx-auto mb-8 w-full max-w-6xl px-3 sm:px-8" id="dashboard" aria-label="Contoh tampilan dashboard">
      <div className="lp-device isolate overflow-hidden">
        <div className="flex gap-3 p-2.5 sm:gap-4 sm:p-4">
          {/* Sidebar hitam mini (hanya hiasan) */}
          <div className="hidden w-[68px] shrink-0 flex-col items-center gap-3 rounded-[26px] bg-ink py-5 md:flex" aria-hidden="true">
            <Image src="/logo.png" alt="" width={36} height={36} className="mb-3 h-9 w-9" />
            {SIDE_ICONS.map((Ic, k) => (
              <span
                key={k}
                className={`grid h-11 w-11 place-items-center rounded-2xl ${k === 2 ? "bg-white text-ink" : "text-white/60"}`}
              >
                <Ic size={19} />
              </span>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
            {/* Bar atas */}
            <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
              <span className="select-none text-[13px] font-semibold text-ink/50 font-mono">depup / cek-repo</span>
              <div className="flex w-full items-center gap-2 truncate rounded-xl bg-violet-50 px-3.5 py-2.5 sm:w-96">
                <Search size={15} className="shrink-0 text-ink/50" aria-hidden="true" />
                <span key={s.repo} className="truncate font-mono text-[12.5px] text-ink">
                  github.com/{s.repo}
                </span>
              </div>
            </div>

            {/* Pilih contoh repo */}
            <div role="tablist" aria-label="Contoh repo" className="flex flex-wrap gap-1.5 self-start rounded-full bg-violet-50 p-1">
              {SAMPLES.map((x, idx) => (
                <button
                  key={x.tab}
                  role="tab"
                  aria-selected={idx === i}
                  onClick={() => setI(idx)}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                    idx === i ? "bg-ink text-white" : "text-ink/60 hover:bg-white hover:text-ink"
                  }`}
                >
                  {x.tab}
                </button>
              ))}
            </div>

            {/* Hasil pengecekan */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
              <div className="flex flex-col gap-1 rounded-[22px] bg-ink p-4 text-left text-white">
                <span className="text-[12px] font-medium text-white/55">Terdeteksi</span>
                <span key={s.type} className="mt-1 text-[21px] font-bold leading-tight tracking-[-0.02em]">
                  {s.type}
                </span>
                <span className="text-[12.5px] text-white/50">dibaca dari isi repo</span>
              </div>
              {platforms.map((name) => {
                const [level, note] = s.verdict[name];
                const Icon = ICON[level];
                return (
                  <div key={name} className={`flex flex-col gap-1 rounded-[22px] p-4 text-left ${PLATFORM_TONE[name]}`}>
                    <span className="text-[12px] font-medium text-ink/60">{name}</span>
                    <span className={`mt-1 flex items-center gap-1.5 text-[18px] font-bold tracking-[-0.01em] ${TONE[level]}`}>
                      <Icon size={17} strokeWidth={level === "ok" ? 3 : 2} aria-hidden="true" />
                      {LABEL[level]}
                    </span>
                    <span className="text-[12.5px] text-ink/60">{note}</span>
                  </div>
                );
              })}
            </div>

            {/* Daftar deploy (contoh) */}
            <div className="flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-[18px] font-bold tracking-[-0.02em] text-ink">Deploy terakhir</span>
                  <span className="rounded-full bg-[#ede8ff] px-2.5 py-0.5 text-[11px] font-medium text-ink/70">contoh data</span>
                </div>
                <span className="hidden items-center gap-1 text-[13px] font-medium text-ink/60 sm:flex">
                  <RefreshCw size={14} aria-hidden="true" /> Redeploy
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {DEPLOYS.map((d) => {
                  const st = STATUS[d.status];
                  return (
                    <li
                      key={d.name}
                      className="grid grid-cols-12 items-center gap-2 rounded-2xl bg-white p-3.5"
                    >
                      <div className="col-span-12 flex items-center gap-3 md:col-span-4">
                        <span className="truncate font-mono text-[13px] font-semibold text-ink">{d.name}</span>
                        <span className="rounded-md bg-violet-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-ink/60">
                          {d.platform}
                        </span>
                      </div>
                      <div className="col-span-7 flex items-center gap-1.5 text-ink/60 md:col-span-3">
                        {d.ref === "main" ? <GitCommitHorizontal size={15} aria-hidden="true" /> : <GitBranch size={15} aria-hidden="true" />}
                        <span className="font-mono text-[12.5px]">{d.ref}</span>
                        <span className="text-[12.5px] text-ink/45">· {d.when}</span>
                      </div>
                      <div className="col-span-5 md:col-span-3">
                        <span className="chip">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${st.dot} ${d.status === "building" ? "animate-pulse" : ""}`}
                            aria-hidden="true"
                          />
                          {st.label}
                        </span>
                      </div>
                      <div className="col-span-12 truncate font-mono text-[12px] text-ink/60 md:col-span-2 md:text-right">{d.link}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
