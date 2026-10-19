'use client';

import { useState } from 'react';

type View = 'overview' | 'sellers' | 'transactions' | 'subscriptions' | 'health' | 'settings';
const nav: { id: View; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'sellers', label: 'Sellers & stores', icon: '♙' },
  { id: 'transactions', label: 'Transactions', icon: '↗' },
  { id: 'subscriptions', label: 'Subscriptions', icon: '◇' },
  { id: 'health', label: 'Integrations health', icon: '◎' },
  { id: 'settings', label: 'Platform settings', icon: '⚙' },
];

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty"><span className="emptyIcon">↳</span><h3>{title}</h3><p>{text}</p><span className="waiting">Waiting for live database connection</span></div>;
}

export default function Home() {
  const [view, setView] = useState<View>('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const current = nav.find((item) => item.id === view) ?? nav[0];

  return <main className="appShell">
    <aside className={`sidebar ${menuOpen ? 'sidebarOpen' : ''}`}>
      <div className="brand"><span className="brandMark">M</span><span>market<span className="brandMate">mate</span><small>COMMERCE CONTROL</small></span></div>
      <div className="workspace"><span className="workspaceDot"/><span><b>Platform workspace</b><small>Owner console</small></span><span className="chevron">⌄</span></div>
      <p className="navCaption">PLATFORM MANAGEMENT</p>
      <nav>{nav.map((item) => <button key={item.id} className={`navItem ${view === item.id ? 'navActive' : ''}`} onClick={() => { setView(item.id); setMenuOpen(false); }}><span className="navIcon">{item.icon}</span>{item.label}{item.id === 'health' && <span className="navDot"/>}</button>)}</nav>
      <div className="sidebarBottom"><div className="helpCard"><span className="helpIcon">✳</span><b>Building MarketMate</b><p>Connect your services to bring this control centre online.</p><button onClick={() => setView('health')}>View setup status <span>↗</span></button></div><div className="ownerProfile"><div className="avatar">O</div><span><b>Platform owner</b><small>Administrator view</small></span><span className="more">•••</span></div></div>
    </aside>

    <section className="mainArea">
      <header className="topbar"><button className="mobileMenu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button><div className="crumb">MarketMate <span>/</span> <b>{current.label}</b></div><div className="topActions"><span className="environment"><i/> SETUP MODE</span><button className="iconButton" aria-label="Notifications" onClick={() => setView('health')}>♧<span className="notificationDot"/></button><div className="topAvatar">O</div></div></header>
      <div className="content">
        {view === 'overview' && <>
          <div className="pageHeading"><div><p className="eyebrow">OWNER CONTROL CENTRE</p><h1>Platform overview<span className="titleDot">.</span></h1><p className="subheading">A clear view of your sellers, transactions and platform operations.</p></div><button className="outlineButton" onClick={() => setView('health')}>◷ <span>Setup checklist</span></button></div>
          <div className="connectionBanner"><span className="bannerIcon">i</span><div><b>Your live platform data is not connected yet</b><p>These metrics will populate from Supabase, Paystack and Meta after the server integrations are configured. No sample figures are being shown.</p></div><button onClick={() => setView('health')}>Finish setup <span>→</span></button></div>
          <div className="sectionTitle"><div><h2>Platform at a glance</h2><p>Live totals will appear here after integration.</p></div><span className="liveLabel"><i/> LIVE DATA PENDING</span></div>
          <div className="metricGrid">
            <Metric icon="♙" label="Registered sellers" value="—" note="Awaiting Supabase" />
            <Metric icon="▣" label="Stores created" value="—" note="Awaiting Supabase" />
            <Metric icon="↗" label="Payment volume" value="—" note="Awaiting Paystack" />
            <Metric icon="◇" label="Platform revenue" value="—" note="Subscription & fees" />
          </div>
          <div className="overviewGrid"><section className="panel transactionsPanel"><div className="panelHeader"><div><h2>Recent platform activity</h2><p>Events across sellers and stores</p></div><button className="textButton" onClick={() => setView('transactions')}>View activity →</button></div><EmptyState title="Activity will show here" text="New seller registrations, order events and verified payment updates will appear here once connected."/></section>
            <section className="panel statusPanel"><div className="panelHeader"><div><h2>Integration status</h2><p>Services needed to run MarketMate</p></div><button className="moreButton" onClick={() => setView('health')}>•••</button></div><StatusRow icon="S" title="Supabase database" detail="Project created · connection pending" state="Pending"/><StatusRow icon="P" title="Paystack payments" detail="Keys and webhook pending" state="Pending"/><StatusRow icon="W" title="WhatsApp Cloud API" detail="Meta app setup pending" state="Pending"/><button className="wideButton" onClick={() => setView('health')}>Open integration checklist <span>→</span></button></section>
          </div>
          <section className="panel sellersPanel"><div className="panelHeader"><div><h2>Seller accounts</h2><p>Manage access and store status from one place.</p></div><button className="textButton" onClick={() => setView('sellers')}>Manage sellers →</button></div><div className="tableWrap"><table><thead><tr><th>SELLER / STORE</th><th>ACCOUNT STATUS</th><th>PAYMENT STATUS</th><th>JOINED</th><th/></tr></thead><tbody><tr><td colSpan={5}><div className="tableEmpty">No seller records loaded. Seller accounts will appear when authentication and database access are connected.</div></td></tr></tbody></table></div></section>
        </>}
        {view === 'sellers' && <PageSection eyebrow="ACCOUNT MANAGEMENT" title="Sellers & stores" description="Review seller accounts, store ownership and access status."><EmptyState title="Seller management is awaiting connection" text="The table will list real registered sellers and their stores after Supabase Auth and protected admin access are implemented."/><div className="noteBox">Owner controls must be protected by server-side role checks. Public sign-up must never grant platform administrator access.</div></PageSection>}
        {view === 'transactions' && <PageSection eyebrow="PAYMENT OPERATIONS" title="Transactions" description="Monitor verified payments, refunds and transaction exceptions."><EmptyState title="No transaction feed connected" text="Only verified Paystack webhook events and database-confirmed order totals should appear here. No payment records are being simulated."/><div className="noteBox">Before accepting real payments, the server must calculate order totals, verify Paystack signatures and update orders idempotently.</div></PageSection>}
        {view === 'subscriptions' && <PageSection eyebrow="REVENUE MANAGEMENT" title="Subscriptions" description="Configure seller plans and review subscription status and platform earnings."><EmptyState title="Subscription billing is not configured" text="Plan pricing, renewals, failed charges and subscription revenue will appear after a billing model and payment workflow are implemented."/></PageSection>}
        {view === 'health' && <PageSection eyebrow="CONFIGURATION" title="Integrations health" description="Track what is connected and what still needs to be configured."><div className="integrationList"><Integration title="Supabase" description="Database, authentication and row-level security" status="Project created" detail="Your Supabase project exists. The application still needs its URL and publishable key configured in deployment environment variables."/><Integration title="Paystack" description="Checkout, payment verification and webhook processing" status="Not connected" detail="Add keys securely in Vercel. Never put secret keys in client-side code or commit them to GitHub."/><Integration title="Meta WhatsApp Cloud API" description="Business messaging and webhook events" status="Not connected" detail="A Meta app, WhatsApp business setup, access token and verified webhook are still required."/><Integration title="Vercel deployment" description="Hosting and server-side environment variables" status="Next step" detail="Import the MarketMate GitHub repository into Vercel after the source files are uploaded."/></div></PageSection>}
        {view === 'settings' && <PageSection eyebrow="PLATFORM CONFIGURATION" title="Platform settings" description="Set the rules and controls for the MarketMate marketplace."><div className="settingsGrid"><div className="settingCard"><span className="settingIcon">◇</span><h3>Plans & platform fees</h3><p>Define seller subscription tiers, transaction fees and billing rules before enabling charges.</p><span className="waiting">Not configured</span></div><div className="settingCard"><span className="settingIcon">♙</span><h3>Admin access</h3><p>Owner permissions must be granted securely from trusted server-side logic.</p><span className="waiting">Security setup pending</span></div><div className="settingCard"><span className="settingIcon">⌁</span><h3>Audit log</h3><p>Record sensitive actions such as account changes, refunds and platform settings updates.</p><span className="waiting">Database connection pending</span></div></div></PageSection>}
        <footer className="footer"><span>© 2026 MarketMate</span><span>Built for African small businesses <b>·</b> Owner console foundation</span></footer>
      </div>
    </section>
  </main>;
}

function Metric({ icon, label, value, note }: { icon: string; label: string; value: string; note: string }) {
  return <article className="metricCard"><div className="metricTop"><span className="metricIcon">{icon}</span><span className="metricEllipsis">•••</span></div><p>{label}</p><strong>{value}</strong><small>{note}</small></article>;
}
function StatusRow({ icon, title, detail, state }: { icon: string; title: string; detail: string; state: string }) {
  return <div className="statusRow"><span className="statusIcon">{icon}</span><span className="statusText"><b>{title}</b><small>{detail}</small></span><span className="pendingPill">{state}</span></div>;
}
function PageSection({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <><div className="pageHeading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}<span className="titleDot">.</span></h1><p className="subheading">{description}</p></div></div><section className="panel detailPanel">{children}</section></>;
}
function Integration({ title, description, status, detail }: { title: string; description: string; status: string; detail: string }) {
  return <article className="integrationCard"><div className="integrationHead"><div><h3>{title}</h3><p>{description}</p></div><span className="pendingPill">{status}</span></div><p className="integrationDetail">{detail}</p></article>;
}
