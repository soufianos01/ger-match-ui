"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Brand } from "../brand";

type AccountRole = "talent" | "provider";

type AuthFormProps = {
  mode: "login" | "register";
  initialRole?: AccountRole;
};

function errorMessage(payload: unknown, fallback: string) {
  const message = (payload as { message?: string | string[] } | null)?.message;
  return Array.isArray(message) ? message[0] ?? fallback : message ?? fallback;
}

export function AuthForm({ mode, initialRole = "talent" }: AuthFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<AccountRole>(initialRole);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRegister = mode === "register";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");

    if (isRegister && password !== String(form.get("confirmPassword") ?? "")) {
      setError("Passwords do not match.");
      return;
    }

    const body = isRegister
      ? {
          firstName: String(form.get("firstName") ?? ""),
          lastName: String(form.get("lastName") ?? ""),
          companyName: String(form.get("companyName") ?? ""),
          email: String(form.get("email") ?? ""),
          password,
          role,
        }
      : { email: String(form.get("email") ?? ""), password };

    setSubmitting(true);
    try {
      const response = await fetch(`/api/auth/${isRegister ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        setError(errorMessage(payload, "We could not complete your request."));
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("GerMatch is temporarily unavailable. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <header className="auth-header">
          <Brand />
          <Link className="back-home" href="/"><ArrowLeft size={16} /> Back to GerMatch</Link>
        </header>
        <section className="auth-card" aria-labelledby="auth-title">
          <div className="auth-intro">
            <p className="eyebrow">{isRegister ? "Your GerMatch profile" : "Welcome back"}</p>
            <h1 id="auth-title">{isRegister ? "Create your account" : "Sign in to GerMatch"}</h1>
            <p>{isRegister ? "Tell us who you are to start finding the right Ausbildung path." : "Pick up where you left off and keep building your next step in Germany."}</p>
          </div>

          <form className="auth-form" onSubmit={submit}>
            {isRegister ? (
              <fieldset className="role-fieldset">
                <legend>I am joining as</legend>
                <div className="role-options">
                  <label className={role === "talent" ? "role-option selected" : "role-option"}>
                    <input type="radio" name="role" value="talent" checked={role === "talent"} onChange={() => setRole("talent")} />
                    <span><strong>Talent</strong><small>I am looking for an Ausbildung.</small></span>
                  </label>
                  <label className={role === "provider" ? "role-option selected" : "role-option"}>
                    <input type="radio" name="role" value="provider" checked={role === "provider"} onChange={() => setRole("provider")} />
                    <span><strong>Provider</strong><small>I offer Ausbildung opportunities.</small></span>
                  </label>
                </div>
              </fieldset>
            ) : null}

            {isRegister ? (
              <div className="auth-grid">
                <label><span>First name</span><input name="firstName" autoComplete="given-name" required maxLength={80} /></label>
                <label><span>Last name</span><input name="lastName" autoComplete="family-name" required maxLength={80} /></label>
              </div>
            ) : null}
            {isRegister && role === "provider" ? <label><span>Organisation name</span><input name="companyName" autoComplete="organization" required maxLength={160} /></label> : null}
            <label><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label><span>Password</span><input name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 12 : 1} required /></label>
            {isRegister ? <><label><span>Confirm password</span><input name="confirmPassword" type="password" autoComplete="new-password" minLength={12} required /></label><p className="password-help">Use at least 12 characters. Choose a password you do not use elsewhere.</p></> : null}
            {error ? <p className="auth-error" role="alert">{error}</p> : null}
            <button className="button auth-submit" type="submit" disabled={submitting}>{submitting ? "Please wait…" : isRegister ? "Create account" : "Sign in"} <ArrowRight size={17} /></button>
          </form>

          <p className="auth-switch">{isRegister ? "Already have an account?" : "New to GerMatch?"} <Link href={isRegister ? "/auth/login" : "/auth/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
        </section>
      </div>
    </main>
  );
}
