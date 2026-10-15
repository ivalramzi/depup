"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, FolderKanban, Rocket, UploadCloud, Globe2, KeyRound, BookOpen, Settings2, Heart, LogOut, Menu, X } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth-context";
import { useDeploy } from "@/lib/deploy-context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { lockBodyScroll } from "@/lib/scroll-lock";
import { getInitials, avatarColorFor } from "@/lib/utils";
import type { DashboardView } from "@/types";

const NAV_ITEMS: { id: DashboardView; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "deploy", label: "Deploy", icon: Rocket },
  { id: "upload", label: "Upload", icon: UploadCloud },
  { id: "domains", label: "Domains", icon: Globe2 },
  { id: "env", label: "Environment", icon: KeyRound },
  { id: "docs", label: "Docs", icon: BookOpen },
  { id: "settings", label: "Settings", icon: Settings2 },
];

/** Ikon DepUp sesuai latar: di sidebar ungu (tema terang) pakai versi Putih + Ungu, di sidebar midnight (tema gelap) pakai versi Midnight + Lime. */
function BrandMark({ size, className }: { size: number; className: string }) {
  return (
    <>
      <Image src="/logo-white.png" alt="Depup logo" width={size} height={size} className={`${className} dark:hidden`} priority />
      <Image src="/logo-lime.png" alt="Depup logo" width={size} height={size} className={`${className} hidden dark:block`} priority />
    </>
  );
}

export function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { view, setView } = useDeploy();
  const [open, setOpen] = React.useState(false);

  // Indikator seleksi: satu "pil" yang meluncur ke item aktif (tanpa library).
  const navRef = React.useRef<HTMLElement>(null);
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = React.useState<{ y: number; h: number } | null>(null);
  const [indicatorReady, setIndicatorReady] = React.useState(false);

  const measure = React.useCallback(() => {
    const el = itemRefs.current[view];
    if (!el) return setIndicator(null);
    setIndicator({ y: el.offsetTop, h: el.offsetHeight });
  }, [view]);

  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  React.useEffect(() => {
    // Aktifkan transisi setelah posisi awal terpasang, supaya tidak meluncur dari atas saat load.
    const id = requestAnimationFrame(() => setIndicatorReady(true));
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [measure]);

  // Close the mobile drawer automatically whenever the active view changes.
  React.useEffect(() => {
    setOpen(false);
  }, [view]);

  // Drawer mobile terbuka → kunci scroll halaman di belakangnya.
  React.useEffect(() => {
    if (!open) return;
    return lockBodyScroll();
  }, [open]);

  function handleLogout() {
    setOpen(false);
    void logout().then(() => router.push("/"));
  }

  return (
    <>
      {/* Mobile top bar — only visible below md, sits above the page content */}
      <div className="sidebar sidebar-topbar sticky top-2 z-30 mb-3 flex items-center justify-between px-3 py-2.5 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="grid h-9 w-9 place-items-center rounded-xl text-[var(--sidebar-muted)] transition hover:bg-[var(--sidebar-hover)] hover:text-white"
        >
          <Menu size={19} />
        </button>
        <div className="flex items-center gap-2">
          <BrandMark size={28} className="h-7 w-7 rounded-lg" />
          <span className="text-[15px] font-bold tracking-tight">Depup</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Backdrop for the mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#1E1150]/50 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`sidebar fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-72 max-w-[82%] shrink-0 flex-col overscroll-contain p-4 transition-transform duration-300 ease-out max-md:rounded-l-none md:sticky md:top-[var(--edge)] md:z-auto md:h-[calc(100dvh-var(--edge)*2)] md:w-64 md:max-w-none md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="mb-5 flex items-center justify-between px-1.5 py-2">
          <div className="flex items-center gap-2.5">
            <BrandMark size={36} className="h-9 w-9 rounded-xl" />
            <span className="text-[18px] font-bold tracking-tight">Depup</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
            className="grid h-8 w-8 place-items-center rounded-full text-[var(--sidebar-muted)] transition hover:bg-[var(--sidebar-hover)] hover:text-white md:hidden"
          >
            <X size={16} />
          </button>
        </div>

        <nav ref={navRef} className="relative min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pr-0.5" aria-label="Menu dashboard">
          {NAV_ITEMS.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                type="button"
                data-view={item.id}
                aria-current={active ? "page" : undefined}
                className={`nav relative z-10 flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-[13.5px] font-medium transition ${active
                    ? "text-[var(--sidebar-active-text)]"
                    : "text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-white"
                  }`}
                onClick={() => setView(item.id)}
              >
                <item.icon size={18} strokeWidth={active ? 2.3 : 1.9} />
                {item.label}
              </button>
            );
          })}
          <a
            href="/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="nav relative z-10 flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-[13.5px] font-medium text-[var(--sidebar-muted)] transition hover:bg-[var(--sidebar-hover)] hover:text-white"
          >
            <Heart size={18} strokeWidth={1.9} />
            Donasi
          </a>
          {indicator && (
            <span
              aria-hidden
              className={`nav-indicator !mt-0 ${indicatorReady ? "nav-indicator-anim" : ""}`}
              style={{ transform: `translateY(${indicator.y}px)`, height: indicator.h }}
            />
          )}
        </nav>

        <div className="space-y-2 border-t border-[var(--sidebar-line)] pt-3">
          <div className="mb-1 hidden justify-end md:flex">
            <ThemeToggle />
          </div>
          {user && (
            <div className="flex items-center gap-3 rounded-2xl bg-lav p-3 text-ink">
              {user.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.picture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="h-9 w-9 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[12px] font-semibold text-white ${avatarColorFor(
                    user.email
                  )}`}
                >
                  {getInitials(user.name)}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">{user.name}</span>
                <span className="block truncate text-[11px] text-ink/60">{user.email}</span>
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-[13.5px] font-medium text-[var(--sidebar-muted)] transition hover:bg-[var(--sidebar-hover)] hover:text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
