"use client";

import { ArrowRight, KeyRound, LoaderCircle, ShieldCheck } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";

export default function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const locked = useRef(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setError("Kullanıcı adı veya parola hatalı.");
        return;
      }
      window.location.assign(nextPath);
    } catch {
      setError("Giriş işlemi tamamlanamadı. Lütfen yeniden deneyin.");
    } finally {
      locked.current = false;
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#07100c] px-5 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(217,189,114,.12),transparent_34%),radial-gradient(circle_at_85%_85%,rgba(116,203,162,.08),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:48px_48px]" />

      <section className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#0a1510]/95 p-6 shadow-2xl shadow-black/40 backdrop-blur md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d9bd72]">Güvenli Yönetim Oturumu</div>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">Novertra Project Office</h1>
            <p className="mt-2 text-sm text-[#87998e]">Yetkili yönetim erişimi</p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#74cba2]/18 bg-[#74cba2]/7 text-[#8bd9b8]">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <form onSubmit={submit} className="mt-8">
          <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
            Kullanıcı Adı
            <input
              required
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={loading}
              className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#06100c] px-4 text-sm text-white outline-none transition focus:border-[#d9bd72]/45 focus:ring-2 focus:ring-[#d9bd72]/10 disabled:opacity-60"
            />
          </label>
          <label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
            Parola
            <div className="relative mt-2">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52645a]" />
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
                className="min-h-12 w-full rounded-xl border border-white/10 bg-[#06100c] pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#d9bd72]/45 focus:ring-2 focus:ring-[#d9bd72]/10 disabled:opacity-60"
              />
            </div>
          </label>

          {error && (
            <p role="alert" className="mt-5 rounded-xl border border-[#d47d72]/18 bg-[#d47d72]/6 px-4 py-3 text-sm text-[#dfaaa3]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim() || !password}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e1c272] px-5 text-sm font-semibold text-[#09110d] transition hover:bg-[#ecd48d] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Giriş yapılıyor…</> : <>Giriş Yap <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <p className="mt-6 border-t border-white/7 pt-5 text-center text-[10px] leading-5 text-[#5f7166]">
          Bu alan yalnız yetkilendirilmiş Novertra yöneticileri içindir.
        </p>
      </section>
    </main>
  );
}
