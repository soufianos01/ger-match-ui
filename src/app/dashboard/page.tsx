"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, LogOut } from "lucide-react";
import { Brand } from "../brand";

type Account = {
  firstName: string;
  lastName: string;
  email: string;
  role: "talent" | "provider";
  profile: {
    headline?: string | null;
    companyName?: string | null;
    website?: string | null;
    location?: string | null;
    skills?: string[];
  };
};

function messageFor(payload: unknown, fallback: string) {
  const message = (payload as { message?: string | string[] } | null)?.message;
  return Array.isArray(message) ? message[0] ?? fallback : message ?? fallback;
}

export default function DashboardPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<Account>;
      })
      .then(setAccount)
      .catch(() => setAccount(null))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!account) return;
    const form = new FormData(event.currentTarget);
    const body = account.role === "talent"
      ? {
          headline: String(form.get("headline") ?? ""),
          location: String(form.get("location") ?? ""),
          skills: String(form.get("skills") ?? "").split(",").map((skill) => skill.trim()).filter(Boolean),
        }
      : {
          companyName: String(form.get("companyName") ?? ""),
          website: String(form.get("website") ?? ""),
          location: String(form.get("location") ?? ""),
        };
    setSaving(true);
    setNotice(null);
    try {
      const response = await fetch("/api/auth/me", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) throw new Error(messageFor(payload, "We could not save your profile."));
      setAccount(payload as Account);
      setNotice("Your profile has been saved.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "We could not save your profile.");
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/");
  }

  if (loading) return <main className="account-page"><p className="account-loading">Loading your GerMatch profile…</p></main>;
  if (!account) return <main className="account-page"><section className="account-card account-empty"><Brand /><h1>Sign in to continue</h1><p>Your GerMatch session has ended or is not available on this domain.</p><Link className="button" href="/auth/login">Sign in <ArrowRight size={17} /></Link></section></main>;

  const isTalent = account.role === "talent";
  return (
    <main className="account-page">
      <header className="dashboard-header"><Brand /><div><span>{account.email}</span><button onClick={signOut} type="button"><LogOut size={16} /> Sign out</button></div></header>
      <section className="account-card" aria-labelledby="dashboard-title">
        <p className="eyebrow">{isTalent ? "Your talent profile" : "Your provider profile"}</p>
        <h1 id="dashboard-title">Welcome, {account.firstName}.</h1>
        <p className="account-lead">{isTalent ? "Complete your profile to receive Ausbildung matches shaped around your strengths." : "Complete your organisation profile so motivated talent can discover your Ausbildung opportunities."}</p>
        <form className="auth-form profile-form" onSubmit={save}>
          {isTalent ? <label><span>Your headline</span><input name="headline" defaultValue={account.profile.headline ?? ""} placeholder="Future Pflegefachkraft with a passion for people" maxLength={160} /></label> : <label><span>Organisation name</span><input name="companyName" defaultValue={account.profile.companyName ?? ""} required maxLength={160} /></label>}
          <label><span>Location</span><input name="location" defaultValue={account.profile.location ?? ""} placeholder="Berlin, Germany" maxLength={120} /></label>
          {isTalent ? <label><span>Strengths and skills</span><input name="skills" defaultValue={account.profile.skills?.join(", ") ?? ""} placeholder="Patient care, teamwork, German B2" maxLength={600} /><small>Separate skills with commas.</small></label> : <label><span>Website</span><input name="website" type="url" defaultValue={account.profile.website ?? ""} placeholder="https://example.de" maxLength={2048} /></label>}
          {notice ? <p className={notice === "Your profile has been saved." ? "profile-notice success" : "auth-error"}>{notice === "Your profile has been saved." ? <CheckCircle2 size={16} /> : null}{notice}</p> : null}
          <button className="button auth-submit" type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"} <ArrowRight size={17} /></button>
        </form>
      </section>
    </main>
  );
}
