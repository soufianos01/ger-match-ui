"use client";

import { ArrowRight, BriefcaseBusiness, Check, ChevronDown, CircleUserRound, Compass, HeartHandshake, Languages, Menu, Search, Sparkles, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "./brand";

const pathways = [
  { icon: Compass, label: "Explore Ausbildungen", description: "Find Ausbildung paths that fit your strengths, goals and location." },
  { icon: UsersRound, label: "Meet providers", description: "Get discovered by organisations ready to train international talent." },
  { icon: BriefcaseBusiness, label: "Start your Ausbildung", description: "Move from a good match to a confident first day." },
];

const benefits = [
  "A profile built around skills, language and goals",
  "Matches to real Ausbildung programs",
  "Relevant paths, not endless scrolling",
  "Guidance for your move and Ausbildung in Germany",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("I am looking for an Ausbildung");
  const [apiStatus, setApiStatus] = useState<"checking" | "ready" | "offline">("checking");

  useEffect(() => {
    const controller = new AbortController();

    void fetch("/api/status", { signal: controller.signal })
      .then((response) => setApiStatus(response.ok ? "ready" : "offline"))
      .catch(() => setApiStatus("offline"));

    return () => controller.abort();
  }, []);

  return (
    <main>
      <header className="site-header">
        <div className="utility-bar">
          <div className="utility-inner">
            <div className="utility-products">
              <a href="#opportunities">Ausbildungen</a>
              <a href="#join">For talent</a>
              <a href="#for-employers">For providers</a>
            </div>
            <Brand className="brand-topbar" />
            <div className="utility-actions">
              <a className="locale-link" href="#resources"><Languages size={16} /> DE</a>
              <a className="account-link" href="#join" aria-label="Create your GerMatch profile"><CircleUserRound size={22} /></a>
              <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
        <div className="primary-nav-shell">
          <div className="primary-nav">
            <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
              <a href="#opportunities">Find an Ausbildung <ChevronDown size={14} /></a>
              <a href="#how-it-works">How it works <ChevronDown size={14} /></a>
              <a href="#join">For talent <ChevronDown size={14} /></a>
              <a href="#for-employers">For providers <ChevronDown size={14} /></a>
              <a href="#resources">Guides <ChevronDown size={14} /></a>
            </nav>
          </div>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> Ausbildung matching for Germany</p>
          <h1>Find the Ausbildung that feels like the right <em>match.</em></h1>
          <p className="hero-lead">GerMatch connects your strengths with Ausbildung providers in Germany who are ready to help you build your next chapter.</p>
          <div className="hero-actions">
            <a className="button" href="#join">Start your profile <ArrowRight size={17} /></a>
            <a className="text-link" href="#how-it-works">See how it works <ArrowRight size={16} /></a>
          </div>
          <p className={`api-status ${apiStatus}`}><span />{apiStatus === "ready" ? "GerMatch platform online" : apiStatus === "offline" ? "Platform status unavailable" : "Checking platform status"}</p>
          <div className="trust-row">
            <div className="avatars" aria-hidden="true"><i>EA</i><i>MK</i><i>LS</i><i>+</i></div>
            <p><strong>Built for international talent.</strong><br />A clearer path into Ausbildung in Germany.</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="A preview of a matched Ausbildung profile">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="shape shape-blue" /><div className="shape shape-yellow" />
          <div className="profile-card">
            <div className="profile-top"><div className="portrait"><span>LM</span></div><div><strong>Lena Mensah</strong><small>Pflegefachfrau · Berlin</small></div><span className="profile-status">Ready to start</span></div>
            <div className="profile-tags"><span>Patient care</span><span>Teamwork</span><span>German B2</span></div>
            <div className="profile-line"><span>Profile match</span><strong>94%</strong></div>
            <div className="progress"><span /></div>
          </div>
          <div className="match-card"><div className="match-icon"><HeartHandshake size={22} /></div><div><span>New Ausbildung match</span><strong>Pflegefachfrau · Berlin</strong></div><Check size={19} /></div>
          <div className="role-card"><span className="role-dot" /><div><small>Suggested Ausbildung</small><strong>Pflegefachmann</strong></div><ArrowRight size={18} /></div>
        </div>
      </section>

      <section id="join" className="finder-shell">
        <div className="finder-heading"><span className="step-number">01</span><div><p className="eyebrow">Start where you are</p><h2>What kind of Ausbildung are you looking for?</h2></div></div>
        <div className="finder-controls">
          <label className="select-control"><span>I’m here because…</span><select value={role} onChange={(event) => setRole(event.target.value)}><option>I am looking for an Ausbildung</option><option>I represent an Ausbildung provider</option><option>I am exploring Ausbildung in Germany</option></select><ChevronDown size={18} /></label>
          <a className="button" href="#how-it-works">Continue <ArrowRight size={17} /></a>
        </div>
      </section>

      <section id="how-it-works" className="section pathway-section">
        <div className="section-intro"><p className="eyebrow">Your next chapter</p><h2>A better way into Ausbildung.</h2><p>Less noise, more signal. GerMatch helps you move from possibilities to the Ausbildung paths that truly fit.</p></div>
        <div className="pathways">{pathways.map(({ icon: Icon, label, description }, index) => <article className="pathway" key={label}><span className="pathway-number">0{index + 1}</span><div className="pathway-icon"><Icon size={24} /></div><h3>{label}</h3><p>{description}</p><a href="#join" aria-label={`Learn about ${label}`}>Explore <ArrowRight size={16} /></a></article>)}</div>
      </section>

      <section id="opportunities" className="section opportunity-section">
        <div className="opportunity-content"><p className="eyebrow"><Search size={15} /> Made for real paths</p><h2>Matching that sees the whole you.</h2><p>Your strengths matter. So do your language journey, goals, preferred setting and the kind of Ausbildung where you will do your best work.</p><ul>{benefits.map((benefit) => <li key={benefit}><span><Check size={14} /></span>{benefit}</li>)}</ul><a className="button button-dark" href="#join">Explore Ausbildungen <ArrowRight size={17} /></a></div>
        <div className="opportunity-board" aria-hidden="true"><div className="board-header"><span>Recommended Ausbildungen</span><span className="live-dot">Updated today</span></div><div className="job-row featured"><span className="company-mark coral">P</span><div><strong>Pflegefachfrau / Pflegefachmann</strong><small>Städtisches Klinikum · Berlin · 3-year Ausbildung</small></div><span className="score">96% fit</span></div><div className="job-row"><span className="company-mark navy">M</span><div><strong>Mechatroniker/in</strong><small>Rheinwerk · München · Duale Ausbildung</small></div><ArrowRight size={17} /></div><div className="job-row"><span className="company-mark mint">F</span><div><strong>Fachinformatiker/in</strong><small>Nordstern · Hamburg · Duale Ausbildung</small></div><ArrowRight size={17} /></div><div className="board-footer">Showing Ausbildungen aligned with your profile <ArrowRight size={16} /></div></div>
      </section>

      <section id="for-employers" className="employer-banner"><div><p className="eyebrow">For Ausbildung providers</p><h2>Meet motivated talent ready to learn.</h2><p>Make your Ausbildung places visible to people ready to grow with your organisation.</p></div><a className="button button-inverse" href="#resources">For providers <ArrowRight size={17} /></a></section>

      <footer id="resources"><Brand /><p>Helping people find the right Ausbildung and providers find their next great talent in Germany.</p><div className="footer-links"><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Contact</a></div><small>© 2026 GerMatch. All rights reserved.</small></footer>
    </main>
  );
}
