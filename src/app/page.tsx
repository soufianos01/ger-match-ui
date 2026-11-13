"use client";

import { ArrowRight, BriefcaseBusiness, Check, ChevronDown, CircleUserRound, Compass, HeartHandshake, Languages, Menu, Search, Sparkles, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "./brand";

type Language = "en" | "de";
type FinderChoice = "talent" | "provider" | "exploring";

const translations = {
  en: {
    nav: { ausbildungen: "Ausbildungen", talent: "For talent", providers: "For providers", find: "Find an Ausbildung", how: "How it works", guides: "Guides" },
    hero: { eyebrow: "Ausbildung matching for Germany", title: "Find the Ausbildung that feels like the right", highlight: "match.", lead: "GerMatch connects your strengths with Ausbildung providers in Germany who are ready to help you build your next chapter.", start: "Start your profile", how: "See how it works", trust: "Built for international talent.", trustSub: "A clearer path into Ausbildung in Germany.", profile: "Profile match", status: "Ready to start", matchLabel: "New Ausbildung match", match: "Erzieher/in · Hamburg", suggested: "Suggested Ausbildung", suggestedRole: "Elektroniker/in", tags: ["Patient care", "Teamwork", "German B2"] },
    finder: { eyebrow: "Start where you are", title: "What kind of Ausbildung are you looking for?", label: "I’m here because…", options: { talent: "I am looking for an Ausbildung", provider: "I represent an Ausbildung provider", exploring: "I am exploring Ausbildung in Germany" }, continue: "Continue" },
    pathway: { eyebrow: "Your next chapter", title: "A better way into Ausbildung.", intro: "Less noise, more signal. GerMatch helps you move from possibilities to the Ausbildung paths that truly fit.", items: [{ label: "Explore Ausbildungen", description: "Find Ausbildung paths that fit your strengths, goals and location." }, { label: "Meet providers", description: "Get discovered by organisations ready to train international talent." }, { label: "Start your Ausbildung", description: "Move from a good match to a confident first day." }] },
    opportunity: { eyebrow: "Made for real paths", title: "Matching that sees the whole you.", intro: "Your strengths matter. So do your language journey, goals, preferred setting and the kind of Ausbildung where you will do your best work.", benefits: ["A profile built around skills, language and goals", "Matches to real Ausbildung programs", "Relevant paths, not endless scrolling", "Guidance for your move and Ausbildung in Germany"], button: "Explore Ausbildungen", board: "Recommended Ausbildungen", updated: "Updated today", score: "96% fit", footer: "Showing Ausbildungen aligned with your profile", roles: [{ title: "Pflegefachfrau / Pflegefachmann", meta: "Städtisches Klinikum · Berlin · 3-year Ausbildung", mark: "P" }, { title: "Erzieher/in", meta: "KinderCampus · Hamburg · State-recognised training", mark: "E" }, { title: "Fachinformatiker/in", meta: "Nordstern · Cologne · Duale Ausbildung", mark: "F" }] },
    providers: { eyebrow: "For Ausbildung providers", title: "Meet motivated talent ready to learn.", intro: "Make your Ausbildung places visible to people ready to grow with your organisation.", button: "For providers" },
    footer: "Helping people find the right Ausbildung and providers find their next great talent in Germany.",
    status: { ready: "GerMatch platform online", offline: "Platform status unavailable", checking: "Checking platform status" },
    locale: "DE",
  },
  de: {
    nav: { ausbildungen: "Ausbildungen", talent: "Für Talente", providers: "Für Anbieter", find: "Ausbildung finden", how: "So funktioniert’s", guides: "Ratgeber" },
    hero: { eyebrow: "Ausbildungs-Matching in Deutschland", title: "Finde die Ausbildung, die wirklich zu dir", highlight: "passt.", lead: "GerMatch verbindet deine Stärken mit Ausbildungsbetrieben in Deutschland, die dich auf deinem nächsten Schritt begleiten.", start: "Profil erstellen", how: "So funktioniert’s", trust: "Für internationale Talente gemacht.", trustSub: "Dein Weg zur Ausbildung in Deutschland.", profile: "Profil-Match", status: "Bereit zu starten", matchLabel: "Neue Ausbildungs-Möglichkeit", match: "Erzieher/in · Hamburg", suggested: "Vorgeschlagene Ausbildung", suggestedRole: "Elektroniker/in", tags: ["Pflege", "Teamarbeit", "Deutsch B2"] },
    finder: { eyebrow: "Starte, wo du bist", title: "Welche Ausbildung suchst du?", label: "Ich bin hier, weil…", options: { talent: "Ich suche eine Ausbildung", provider: "Ich vertrete einen Ausbildungsbetrieb", exploring: "Ich erkunde Ausbildungen in Deutschland" }, continue: "Weiter" },
    pathway: { eyebrow: "Dein nächstes Kapitel", title: "Der bessere Weg in die Ausbildung.", intro: "Weniger Rauschen, mehr Orientierung. GerMatch bringt dich zu Ausbildungswegen, die wirklich zu dir passen.", items: [{ label: "Ausbildungen entdecken", description: "Finde Wege, die zu deinen Stärken, Zielen und deinem Wunschort passen." }, { label: "Anbieter kennenlernen", description: "Werde von Organisationen entdeckt, die internationale Talente ausbilden möchten." }, { label: "Ausbildung starten", description: "Vom passenden Match sicher zum ersten Ausbildungstag." }] },
    opportunity: { eyebrow: "Für echte Wege", title: "Matching, das dich ganzheitlich sieht.", intro: "Deine Stärken zählen. Ebenso deine Sprache, deine Ziele, dein Wunschumfeld und die Ausbildung, in der du dein Bestes geben kannst.", benefits: ["Ein Profil für Stärken, Sprache und Ziele", "Passende Ausbildungsplätze", "Relevante Wege statt endloser Suche", "Begleitung für Umzug und Ausbildung in Deutschland"], button: "Ausbildungen entdecken", board: "Empfohlene Ausbildungen", updated: "Heute aktualisiert", score: "96 % passend", footer: "Ausbildungen passend zu deinem Profil", roles: [{ title: "Pflegefachfrau / Pflegefachmann", meta: "Städtisches Klinikum · Berlin · 3-jährige Ausbildung", mark: "P" }, { title: "Erzieher/in", meta: "KinderCampus · Hamburg · Staatliche Ausbildung", mark: "E" }, { title: "Fachinformatiker/in", meta: "Nordstern · Köln · Duale Ausbildung", mark: "F" }] },
    providers: { eyebrow: "Für Ausbildungsbetriebe", title: "Lerne motivierte Talente kennen.", intro: "Mache deine Ausbildungsplätze für Menschen sichtbar, die mit deinem Unternehmen wachsen möchten.", button: "Für Anbieter" },
    footer: "Wir bringen Menschen mit der passenden Ausbildung und Ausbildungsbetriebe mit ihren nächsten Talenten zusammen.",
    status: { ready: "GerMatch-Plattform online", offline: "Plattformstatus nicht verfügbar", checking: "Plattformstatus wird geprüft" },
    locale: "EN",
  },
} as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [role, setRole] = useState<FinderChoice>("talent");
  const [apiStatus, setApiStatus] = useState<"checking" | "ready" | "offline">("checking");
  const content = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "de" ? "GerMatch — Finde deine Ausbildung in Deutschland" : "GerMatch — Find your Ausbildung in Germany";
  }, [language]);

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
              <a href="#join">{content.nav.talent}</a>
              <a href="#for-employers">{content.nav.providers}</a>
            </div>
            <Brand className="brand-topbar" />
            <div className="utility-actions">
              <button className="locale-link" type="button" onClick={() => setLanguage(language === "en" ? "de" : "en")} aria-label={language === "en" ? "Auf Deutsch wechseln" : "Switch to English"}><Languages size={16} /> {content.locale}</button>
              <a className="account-link" href="#join" aria-label={language === "de" ? "GerMatch-Profil erstellen" : "Create your GerMatch profile"}><CircleUserRound size={22} /></a>
              <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
        <div className="primary-nav-shell">
          <div className="primary-nav">
            <nav className={menuOpen ? "nav open" : "nav"} aria-label={language === "de" ? "Hauptnavigation" : "Primary navigation"}>
              <a href="#opportunities">{content.nav.find} <ChevronDown size={14} /></a>
              <a href="#how-it-works">{content.nav.how} <ChevronDown size={14} /></a>
              <a href="#join">{content.nav.talent} <ChevronDown size={14} /></a>
              <a href="#for-employers">{content.nav.providers} <ChevronDown size={14} /></a>
              <a href="#resources">{content.nav.guides} <ChevronDown size={14} /></a>
            </nav>
          </div>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> {content.hero.eyebrow}</p>
          <h1>{content.hero.title} <em>{content.hero.highlight}</em></h1>
          <p className="hero-lead">{content.hero.lead}</p>
          <div className="hero-actions">
            <a className="button" href="#join">{content.hero.start} <ArrowRight size={17} /></a>
            <a className="text-link" href="#how-it-works">{content.hero.how} <ArrowRight size={16} /></a>
          </div>
          <p className={`api-status ${apiStatus}`}><span />{content.status[apiStatus]}</p>
          <div className="trust-row">
            <div className="avatars" aria-hidden="true"><i>EA</i><i>MK</i><i>LS</i><i>+</i></div>
            <p><strong>{content.hero.trust}</strong><br />{content.hero.trustSub}</p>
          </div>
        </div>

        <div className="hero-visual" aria-label={language === "de" ? "Vorschau eines passenden Ausbildungsprofils" : "A preview of a matched Ausbildung profile"}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="shape shape-blue" /><div className="shape shape-yellow" />
          <div className="profile-card">
            <div className="profile-top"><div className="portrait"><span>LM</span></div><div><strong>Lena Mensah</strong><small>Pflegefachfrau · Berlin</small></div><span className="profile-status">{content.hero.status}</span></div>
            <div className="profile-tags">{content.hero.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="profile-line"><span>{content.hero.profile}</span><strong>94%</strong></div>
            <div className="progress"><span /></div>
          </div>
          <div className="match-card"><div className="match-icon"><HeartHandshake size={22} /></div><div><span>{content.hero.matchLabel}</span><strong>{content.hero.match}</strong></div><Check size={19} /></div>
          <div className="role-card"><span className="role-dot" /><div><small>{content.hero.suggested}</small><strong>{content.hero.suggestedRole}</strong></div><ArrowRight size={18} /></div>
        </div>
      </section>

      <section id="join" className="finder-shell">
        <div className="finder-heading"><span className="step-number">01</span><div><p className="eyebrow">{content.finder.eyebrow}</p><h2>{content.finder.title}</h2></div></div>
        <div className="finder-controls">
          <label className="select-control"><span>{content.finder.label}</span><select value={role} onChange={(event) => setRole(event.target.value as FinderChoice)}><option value="talent">{content.finder.options.talent}</option><option value="provider">{content.finder.options.provider}</option><option value="exploring">{content.finder.options.exploring}</option></select><ChevronDown size={18} /></label>
          <a className="button" href="#how-it-works">{content.finder.continue} <ArrowRight size={17} /></a>
        </div>
      </section>

      <section id="how-it-works" className="section pathway-section">
        <div className="section-intro"><p className="eyebrow">{content.pathway.eyebrow}</p><h2>{content.pathway.title}</h2><p>{content.pathway.intro}</p></div>
        <div className="pathways">{content.pathway.items.map(({ label, description }, index) => { const Icon = [Compass, UsersRound, BriefcaseBusiness][index]; return <article className="pathway" key={label}><span className="pathway-number">0{index + 1}</span><div className="pathway-icon"><Icon size={24} /></div><h3>{label}</h3><p>{description}</p><a href="#join" aria-label={`${language === "de" ? "Mehr über" : "Learn about"} ${label}`}>{language === "de" ? "Entdecken" : "Explore"} <ArrowRight size={16} /></a></article>; })}</div>
      </section>

      <section id="opportunities" className="section opportunity-section">
        <div className="opportunity-content"><p className="eyebrow"><Search size={15} /> {content.opportunity.eyebrow}</p><h2>{content.opportunity.title}</h2><p>{content.opportunity.intro}</p><ul>{content.opportunity.benefits.map((benefit) => <li key={benefit}><span><Check size={14} /></span>{benefit}</li>)}</ul><a className="button button-dark" href="#join">{content.opportunity.button} <ArrowRight size={17} /></a></div>
        <div className="opportunity-board" aria-hidden="true"><div className="board-header"><span>{content.opportunity.board}</span><span className="live-dot">{content.opportunity.updated}</span></div>{content.opportunity.roles.map((job, index) => <div className={`job-row${index === 0 ? " featured" : ""}`} key={job.title}><span className={`company-mark ${index === 0 ? "coral" : index === 1 ? "navy" : "mint"}`}>{job.mark}</span><div><strong>{job.title}</strong><small>{job.meta}</small></div>{index === 0 ? <span className="score">{content.opportunity.score}</span> : <ArrowRight size={17} />}</div>)}<div className="board-footer">{content.opportunity.footer} <ArrowRight size={16} /></div></div>
      </section>

      <section id="for-employers" className="employer-banner"><div><p className="eyebrow">{content.providers.eyebrow}</p><h2>{content.providers.title}</h2><p>{content.providers.intro}</p></div><a className="button button-inverse" href="#resources">{content.providers.button} <ArrowRight size={17} /></a></section>

      <footer id="resources"><Brand /><p>{content.footer}</p><div className="footer-links"><a href="#top">{language === "de" ? "Datenschutz" : "Privacy"}</a><a href="#top">{language === "de" ? "Impressum" : "Terms"}</a><a href="#top">{language === "de" ? "Kontakt" : "Contact"}</a></div><small>© 2026 GerMatch. All rights reserved.</small></footer>
    </main>
  );
}
