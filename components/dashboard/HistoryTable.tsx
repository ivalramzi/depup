"use client";

import { normalizeDeployDomain } from "@/lib/utils";
import { CheckCircle2, XCircle, Trash2 } from "@/components/ui/icons";
import { Surface } from "@/components/ui/Surface";
import { useDeploy } from "@/lib/deploy-context";

export function HistoryTable() {
  const { history, redeploy } = useDeploy();

  return (
    <Surface className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--surface-line)]">
        <h3 className="text-[16px] font-bold tracking-tight">Riwayat Deploy</h3>
        <span className="mono text-[11px] text-text-faint">{history.length}/10</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-text-faint">
              <th className="px-6 py-3 font-medium">Project</th>
              <th className="px-6 py-3 font-medium">Platform</th>
              <th className="px-6 py-3 font-medium">Domain</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody id="history">
            {history.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-[13px] text-text-muted">
                  Belum ada riwayat deploy.
                </td>
              </tr>
            )}
            {history.map((item) => {
              const isReady = item.status === "ready";
              const isDeleted = item.status === "deleted";
              return (
                <tr
                  key={item.id}
                  className={`surface-solid-row border-b last:border-0 transition-colors ${isDeleted ? "opacity-60" : ""}`}
                  style={{ borderColor: "var(--surface-line)" }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-xl ${
                          isDeleted
                            ? "bg-[var(--pill-bg)] text-text-faint"
                            : isReady
                              ? "bg-tone-mint text-emerald-700 dark:text-emerald-300"
                              : "bg-tone-pink text-red-700 dark:text-red-300"
                        }`}
                      >
                        {isDeleted ? (
                          <Trash2 size={16} />
                        ) : isReady ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                      </span>
                      <div>
                        <div className="text-[13px] font-semibold">{item.name}</div>
                        <div className="mono text-[11px] opacity-50">
                          {item.platform} • {item.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[12px] capitalize">{item.platform}</td>
                  <td className="px-6 py-4 mono text-[12px] opacity-70">{normalizeDeployDomain(item.domain, item.platform)}</td>
                  <td className="px-6 py-4">
                    <span
                      className="chip"
                    >
                      <span
                        className={`dot-flat h-1.5 w-1.5 rounded-full ${
                          isDeleted ? "bg-zinc-400" : isReady ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      />
                      {isDeleted ? "Deleted" : isReady ? "Ready" : "Failed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => redeploy(item.name)}
                      className="pill px-3.5 py-1.5 text-[11.5px] font-medium"
                    >
                      {isDeleted ? "Deploy Ulang" : "Redeploy"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}
