"use client";

import { Boxes, CheckCircle2, XCircle, Plus } from "@/components/ui/icons";
import { InlineIcon } from "@/components/ui/Icon";
import { useDeploy } from "@/lib/deploy-context";
import { useAuth } from "@/lib/auth-context";
import { ViewFade } from "@/components/ui/ViewFade";
import { StatCard } from "./StatCard";
import { HistoryTable } from "./HistoryTable";

export function DashboardHomeView() {
  const { stats, setView } = useDeploy();
  const { user } = useAuth();

  return (
    <ViewFade>
      <div className="space-y-5">
        <div className="hero-card px-6 py-7 sm:px-9 sm:py-9">
          {/* Garis bergelombang dekoratif, mengikuti kartu hero di referensi */}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 90"
            className="pointer-events-none absolute right-5 top-6 hidden h-24 w-52 sm:block"
            fill="none"
            stroke="#C6F432"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 60 C 18 60, 20 30, 32 30 S 44 74, 56 74 S 66 18, 80 18 S 92 66, 104 66 S 116 38, 128 38 S 140 58, 152 54 S 168 20, 196 12" />
          </svg>

          <div className="relative max-w-xl">
            <h2 className="text-[26px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[34px]">
              Halo, {user?.name ?? "Developer"} <InlineIcon name="waving_hand" className="ml-1 text-lime-500" />
            </h2>
            <p className="mt-2 text-[14px] text-violet-100">Berikut ringkasan deployment kamu hari ini.</p>
            <button
              type="button"
              onClick={() => setView("deploy")}
              className="btn-lav mt-6 inline-flex items-center gap-2 px-5 py-3 text-[13.5px]"
            >
              <Plus size={16} /> Deploy Baru
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard id="total" label="Total Deployment" value={stats.total} icon={Boxes} tone="violet" />
          <StatCard id="ready" label="Ready" value={stats.ready} icon={CheckCircle2} tone="emerald" />
          <StatCard id="failed" label="Failed" value={stats.failed} icon={XCircle} tone="red" />
        </div>

        <HistoryTable />
      </div>
    </ViewFade>
  );
}
