import { GlyphText } from "@/components/ui/Icon";

const STEPS = [
  {
    n: "01",
    tone: "bg-violet-100",
    badge: "Tempel",
    title: "Tempel link repo",
    body: "Masukkan link GitHub. Repo private juga bisa dengan GitHub Token. Depup langsung membaca isinya.",
    label: "Repo",
    lines: [
      ["font-semibold text-ink", "github.com/dimas/api-toko"],
      ["text-emerald-700", "✓ repo terbaca"],
    ],
  },
  {
    n: "02",
    tone: "bg-mist",
    badge: "Periksa",
    title: "Lihat hasil pengecekan",
    body: "Kamu tahu jenis repo-nya, platform yang cocok, dan env var yang kemungkinan dibutuhkan, sebelum deploy dimulai.",
    label: "Hasil",
    lines: [
      ["font-semibold text-ink", "Express (server Node.js)"],
      ["text-lav-text", "✓ Cocok: Railway"],
    ],
  },
  {
    n: "03",
    tone: "bg-lime-100",
    badge: "Deploy",
    title: "Deploy dan pantau",
    body: "Progres tampil langsung. Kalau gagal, pesan error menjelaskan masalahnya dan apa yang harus dilakukan.",
    label: "Progres",
    lines: [
      ["font-semibold text-ink", "Build → Deploy → Live"],
      ["text-emerald-700", "● Online"],
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-16 pt-4 sm:px-8 sm:pb-20">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[46px]">
          Tiga langkah, dari repo ke link.
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-ink/60">
          Tidak ada YAML ribet. Cukup tempel link dan biarkan Depup menangani sisanya.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className={`flex flex-col justify-between rounded-[28px] p-7 ${s.tone}`}>
            <div>
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[44px] font-bold leading-none tracking-[-0.03em] text-ink/25 tabular-nums">{s.n}</span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-semibold text-ink/70">{s.badge}</span>
              </div>
              <h3 className="mb-3 text-[24px] font-bold tracking-[-0.03em] text-ink">{s.title}</h3>
              <p className="mb-6 text-[14.5px] leading-relaxed text-ink/65">{s.body}</p>
            </div>
            <div className="rounded-2xl bg-white/75 p-3.5 font-mono text-[12px] leading-[18px]">
              <div className="mb-1 text-[10px] font-bold text-ink/45">{s.label}</div>
              {s.lines.map(([cls, t]) => (
                <div key={t} className={cls}>
                  <GlyphText>{t}</GlyphText>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
