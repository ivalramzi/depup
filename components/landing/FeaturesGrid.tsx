import * as React from "react";
import { GlyphText, InlineIcon } from "@/components/ui/Icon";
import { Globe, History, KeyRound, LayoutGrid, Layers, RefreshCw, ScanSearch, ShieldCheck } from "@/components/ui/icons";

function Icon({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`mb-5 grid h-11 w-11 place-items-center rounded-2xl ${dark ? "bg-white/10 text-lime-500" : "bg-white/75 text-ink"}`}
    >
      {children}
    </div>
  );
}

function Mini({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white/75 p-3 font-mono text-[12px] text-ink ${className}`}>{children}</div>;
}

const CARD = "flex flex-col justify-between rounded-[28px] p-6";
const H3 = "mb-2 text-[20px] font-bold tracking-[-0.025em] text-ink";
const P = "mb-5 text-[13.5px] leading-relaxed text-ink/65";

export function FeaturesGrid() {
  return (
    <section id="fitur" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[46px]">
          Setelah website live, semuanya tetap di satu tempat.
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-ink/60">
          Domain, environment variables, dan riwayat deploy dari tiga platform, tanpa pindah tab.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Besar: satu dashboard, tiga platform */}
        <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-7 md:col-span-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 200 90"
            className="pointer-events-none absolute right-6 top-6 hidden h-20 w-44 sm:block"
            fill="none"
            stroke="#C6F432"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 60 C 18 60, 20 30, 32 30 S 44 74, 56 74 S 66 18, 80 18 S 92 66, 104 66 S 116 38, 128 38 S 140 58, 152 54 S 168 20, 196 12" />
          </svg>
          <div>
            <Icon dark>
              <Layers size={22} />
            </Icon>
            <h3 className="mb-3 text-[26px] font-bold tracking-[-0.03em] text-white">Satu dashboard, tiga platform</h3>
            <p className="mb-7 max-w-xl text-[15px] leading-relaxed text-white/60">
              Project dari Vercel, Cloudflare Pages, dan Railway tampil dalam satu daftar, lengkap dengan status dan tombol
              redeploy.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["VERCEL", "Situs web & framework", "bg-violet-100"],
              ["CLOUDFLARE PAGES", "Situs statis & SPA", "bg-mist"],
              ["RAILWAY", "Server, Docker, bahasa lain", "bg-lime-100"],
            ].map(([name, note, tone]) => (
              <div key={name} className={`flex flex-col gap-1 rounded-2xl p-3.5 ${tone}`}>
                <span className="font-mono text-[10px] font-semibold text-ink/55">{name}</span>
                <span className="text-[13px] font-medium text-ink">{note}</span>
                <span className="font-mono text-[12px] font-semibold text-emerald-700"><GlyphText>✓ Terhubung</GlyphText></span>
              </div>
            ))}
          </div>
        </div>

        {/* Pengecekan repo */}
        <div className={`${CARD} bg-mist`}>
          <div>
            <Icon>
              <ScanSearch size={22} />
            </Icon>
            <h3 className="mb-3 text-[24px] font-bold tracking-[-0.03em] text-ink">Cek repo dulu</h3>
            <p className="mb-6 text-[14.5px] leading-relaxed text-ink/65">
              Depup membaca isi repo dan memberi tahu platform mana yang cocok sebelum deploy dimulai.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 rounded-2xl bg-white/75 p-3.5 font-mono text-[12px] leading-[18px] text-ink/60">
            <div className="mb-1 flex items-center gap-1.5 pb-1">
              <span className="h-2 w-2 rounded-full bg-red-400" aria-hidden="true" />
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span className="ml-2 text-[10px] text-ink/45">hasil-cek.log</span>
            </div>
            <div className="font-semibold text-ink">Terdeteksi: Express</div>
            <div className="text-amber-700">! Vercel: butuh penyesuaian</div>
            <div className="text-ink/45">– Cloudflare: tidak cocok</div>
            <div className="text-emerald-700"><GlyphText>✓ Railway: cocok untuk server</GlyphText></div>
          </div>
        </div>

        {/* Kecil */}
        <div className={`${CARD} bg-violet-100`}>
          <div>
            <Icon>
              <Globe size={21} />
            </Icon>
            <h3 className={H3}>Domain sendiri</h3>
            <p className={P}>Tambahkan domain dan dapatkan record DNS persis yang perlu dipasang di registrar.</p>
          </div>
          <Mini className="flex items-center justify-between">
            <span>tokokopi.id</span>
            <span className="rounded-md bg-lime-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">DNS siap</span>
          </Mini>
        </div>

        <div className={`${CARD} bg-lime-100`}>
          <div>
            <Icon>
              <KeyRound size={21} />
            </Icon>
            <h3 className={H3}>Environment variables</h3>
            <p className={P}>
              Simpan per project dan kirim ke platform tujuan. Yang dibutuhkan repo terdeteksi otomatis.
            </p>
          </div>
          <Mini className="flex flex-col gap-1">
            <div className="flex justify-between text-ink/60">
              <span>DATABASE_URL</span>
              <span className="text-emerald-700">••••••••••</span>
            </div>
            <div className="flex justify-between text-ink/60">
              <span>NEXT_PUBLIC_API</span>
              <span className="text-lav-text">https://api…</span>
            </div>
          </Mini>
        </div>

        <div className={`${CARD} bg-violet-50`}>
          <div>
            <Icon>
              <RefreshCw size={21} />
            </Icon>
            <h3 className={H3}>Redeploy otomatis</h3>
            <p className={P}>Ubah secret, project langsung di-redeploy supaya nilai barunya terpakai.</p>
          </div>
          <Mini className="flex items-center justify-between text-ink/60">
            <span>API_KEY diperbarui</span>
            <span className="font-semibold text-emerald-700">redeploy <InlineIcon name="check" /></span>
          </Mini>
        </div>

        <div className={`${CARD} bg-violet-50`}>
          <div>
            <Icon>
              <LayoutGrid size={21} />
            </Icon>
            <h3 className={H3}>Satu daftar project</h3>
            <p className={P}>Semua project dan statusnya terlihat sekilas. Impor project yang sudah ada kapan saja.</p>
          </div>
          <Mini className="flex items-center justify-between text-ink/60">
            <span>Vercel · Cloudflare · Railway</span>
            <span className="font-semibold text-ink">1 daftar</span>
          </Mini>
        </div>

        <div className={`${CARD} bg-violet-100`}>
          <div>
            <Icon>
              <History size={21} />
            </Icon>
            <h3 className={H3}>Riwayat deploy</h3>
            <p className={P}>Lihat deploy terakhir, hasilnya, dan buka lagi dengan satu klik.</p>
          </div>
          <div className="flex h-14 items-end gap-1.5 rounded-2xl bg-white/75 p-2.5" aria-hidden="true">
            {[
              "h-[40%] bg-ink/15",
              "h-[60%] bg-ink/15",
              "h-[50%] bg-ink/15",
              "h-[80%] bg-[#C6F432]",
              "h-[65%] bg-violet-300",
              "h-[95%] bg-ink",
              "h-[75%] bg-violet-200",
            ].map((c, k) => (
              <div key={k} className={`flex-1 rounded-t ${c}`} />
            ))}
          </div>
        </div>

        <div className={`${CARD} bg-mist`}>
          <div>
            <Icon>
              <ShieldCheck size={21} />
            </Icon>
            <h3 className={H3}>Token tetap milikmu</h3>
            <p className={P}>
              Token platform dikirim hanya saat dipakai. Login memakai akun Google, repo private bisa dengan GitHub Token.
            </p>
          </div>
          <Mini className="flex items-center justify-between text-ink/60">
            <span>Token Vercel</span>
            <span className="font-semibold text-emerald-700">saat deploy saja</span>
          </Mini>
        </div>
      </div>
    </section>
  );
}
