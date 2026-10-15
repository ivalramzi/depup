import { Check, Minus, TriangleAlert } from "@/components/ui/icons";

type Level = "ok" | "warn" | "no";

const ROWS: { type: string; examples: string; v: Level; c: Level; r: Level }[] = [
  { type: "HTML, CSS, JavaScript biasa", examples: "Cukup ada index.html, tanpa package.json", v: "ok", c: "ok", r: "ok" },
  { type: "Framework JavaScript", examples: "React, Vue, Svelte, Angular, Astro, Next.js, termasuk TypeScript", v: "ok", c: "ok", r: "ok" },
  { type: "Server Node.js", examples: "Express, NestJS, Fastify", v: "warn", c: "no", r: "ok" },
  { type: "Docker dan bahasa lain", examples: "Dockerfile, Python, Go, PHP, Ruby, Java, Rust, .NET", v: "no", c: "no", r: "ok" },
];

const META = {
  ok: { text: "Otomatis", tone: "bg-lime-100 text-emerald-800", Icon: Check },
  warn: { text: "Dengan catatan", tone: "bg-violet-50 text-amber-800", Icon: TriangleAlert },
  no: { text: "Tidak cocok", tone: "bg-violet-50 text-ink/60", Icon: Minus },
} as const;

export function SupportMatrix() {
  return (
    <section id="support" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-16 pt-4 sm:px-8 sm:pb-20">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[46px]">
          Repo kamu cocok di mana?
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-ink/60">
          Tiap platform punya batasnya. Depup hanya mengizinkan deploy yang memang bisa berhasil. Kalau tidak cocok, kamu dapat
          alasan dan langkah deploy manual.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[28px] bg-white shadow-[0_14px_30px_-20px_rgba(20,18,31,0.18)]">
        <table className="w-full min-w-[720px] text-left text-[14px]">
          <thead>
            <tr className="bg-violet-50">
              <th scope="col" className="px-6 py-4 font-medium text-ink/55">Isi repo</th>
              <th scope="col" className="px-6 py-4 font-semibold text-ink">Vercel</th>
              <th scope="col" className="px-6 py-4 font-semibold text-ink">Cloudflare Pages</th>
              <th scope="col" className="px-6 py-4 font-semibold text-ink">Railway</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.type} className="border-t border-ink/[0.07]">
                <th scope="row" className="px-6 py-5 align-top font-semibold text-ink">
                  {r.type}
                  <div className="mt-1 max-w-[320px] text-[12.5px] font-normal text-ink/55">{r.examples}</div>
                </th>
                {[r.v, r.c, r.r].map((l, idx) => {
                  const { text, tone, Icon } = META[l];
                  return (
                    <td key={idx} className="px-6 py-5 align-top">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${tone}`}>
                        <Icon size={14} strokeWidth={l === "ok" ? 3 : 2} aria-hidden="true" />
                        {text}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[13px] text-ink/55">
        Project di dalam subfolder (misalnya frontend/) perlu deploy manual dengan Root Directory. Depup akan memberi tahu
        langkahnya.
      </p>
    </section>
  );
}
