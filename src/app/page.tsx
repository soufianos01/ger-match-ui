"use client";

import { ArrowRight, BriefcaseBusiness, Check, ChevronDown, Compass, HeartHandshake, Menu, Search, Sparkles, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "./brand";

const pathways = [
  { icon: Compass, label: "Explore roles", description: "Find opportunities that fit your skills, goals and location." },
  { icon: UsersRound, label: "Meet teams", description: "Get discovered by organisations ready to welcome global talent." },
  { icon: BriefcaseBusiness, label: "Grow together", description: "Move from a good match to a strong next chapter." },
];

const benefits = [
  "A profile built around more than keywords",
  "Clear, human-first matching",
  "Relevant opportunities, not endless scrolling",
  "Guidance for your move and career in Germany",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("I am looking for opportunities");
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
        <Brand />
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#for-employers">For employers</a>
          <a href="#resources">Resources</a>
        </nav>
        <div className="header-actions">
          <a className="login" href="#join">Sign in</a>
          <a className="button button-small" href="#join">Create profile <ArrowRight size={15} /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> Career matching for Germany</p>
          <h1>Find work that feels like the right <em>match.</em></h1>
          <p className="hero-lead">GerMatch connects your ambition with teams in Germany that are ready for what you bring next.</p>
          <div className="hero-actions">
            <a className="button" href="#join">Start your profile <ArrowRight size={17} /></a>
            <a className="text-link" href="#how-it-works">See how it works <ArrowRight size={16} /></a>
          </div>
          <p className={`api-status ${apiStatus}`}><span />{apiStatus === "ready" ? "GerMatch platform online" : apiStatus === "offline" ? "Platform status unavailable" : "Checking platform status"}</p>
          <div className="trust-row">
            <div className="avatars" aria-hidden="true"><i>EA</i><i>MK</i><i>LS</i><i>+</i></div>
            <p><strong>Built for global talent.</strong><br />A clearer path to a career in Germany.</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="A preview of a GerMatch candidate profile">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="shape shape-blue" /><div className="shape shape-yellow" />
          <div className="profile-card">
            <div className="profile-top"><div className="portrait"><span>AM</span></div><div><strong>Amara Mensah</strong><small>Product designer · Berlin</small></div><span className="profile-status">Open to work</span></div>
            <div className="profile-tags"><span>UX strategy</span><span>Design systems</span><span>English · German B1</span></div>
            <div className="profile-line"><span>Profile match</span><strong>94%</strong></div>
            <div className="progress"><span /></div>
          </div>
          <div className="match-card"><div className="match-icon"><HeartHandshake size={22} /></div><div><span>New connection</span><strong>Great fit for you</strong></div><Check size={19} /></div>
          <div className="role-card"><span className="role-dot" /><div><small>Suggested role</small><strong>Product Designer</strong></div><ArrowRight size={18} /></div>
        </div>
      </section>

      <section id="join" className="finder-shell">
        <div className="finder-heading"><span className="step-number">01</span><div><p className="eyebrow">Start where you are</p><h2>What brings you to GerMatch?</h2></div></div>
        <div className="finder-controls">
          <label className="select-control"><span>I’m here because…</span><select value={role} onChange={(event) => setRole(event.target.value)}><option>I am looking for opportunities</option><option>I represent a company</option><option>I am exploring Germany</option></select><ChevronDown size={18} /></label>
          <a className="button" href="#how-it-works">Continue <ArrowRight size={17} /></a>
        </div>
      </section>

      <section id="how-it-works" className="section pathway-section">
        <div className="section-intro"><p className="eyebrow">Designed for momentum</p><h2>A better way to find your place.</h2><p>Less noise, more signal. GerMatch helps you move from possibilities to the opportunities that truly fit.</p></div>
        <div className="pathways">{pathways.map(({ icon: Icon, label, description }, index) => <article className="pathway" key={label}><span className="pathway-number">0{index + 1}</span><div className="pathway-icon"><Icon size={24} /></div><h3>{label}</h3><p>{description}</p><a href="#join" aria-label={`Learn about ${label}`}>Explore <ArrowRight size={16} /></a></article>)}</div>
      </section>

      <section id="opportunities" className="section opportunity-section">
        <div className="opportunity-content"><p className="eyebrow"><Search size={15} /> Thoughtful by design</p><h2>Matching that sees the whole you.</h2><p>Skills matter. So do your values, goals, language journey and the kind of team where you will do your best work.</p><ul>{benefits.map((benefit) => <li key={benefit}><span><Check size={14} /></span>{benefit}</li>)}</ul><a className="button button-dark" href="#join">Build your profile <ArrowRight size={17} /></a></div>
        <div className="opportunity-board" aria-hidden="true"><div className="board-header"><span>Recommended for you</span><span className="live-dot">Updated today</span></div><div className="job-row featured"><span className="company-mark coral">N</span><div><strong>Junior Product Manager</strong><small>Northstar · Munich · Hybrid</small></div><span className="score">96% fit</span></div><div className="job-row"><span className="company-mark navy">C</span><div><strong>Customer Success Specialist</strong><small>Cobalt · Berlin · Remote</small></div><ArrowRight size={17} /></div><div className="job-row"><span className="company-mark mint">M</span><div><strong>Marketing Associate</strong><small>Motif · Hamburg · Hybrid</small></div><ArrowRight size={17} /></div><div className="board-footer">Showing roles aligned with your profile <ArrowRight size={16} /></div></div>
      </section>

      <section id="for-employers" className="employer-banner"><div><p className="eyebrow">For employers</p><h2>Meet talent ready to build what’s next.</h2><p>Turn hiring into a mutual match with a richer picture of every candidate.</p></div><a className="button button-inverse" href="#resources">For employers <ArrowRight size={17} /></a></section>

      <footer id="resources"><Brand /><p>Helping people and teams find their right fit in Germany.</p><div className="footer-links"><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Contact</a></div><small>© 2026 GerMatch. All rights reserved.</small></footer>
    </main>
  );
}
