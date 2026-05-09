import Link from 'next/link';
import { Search, BarChart2, Zap, TrendingUp, GraduationCap, ArrowRight, Star } from 'lucide-react';

const features = [
  { icon: Search, title: 'Smart College Search', desc: 'Filter by state, fees, course type and find your perfect match from 75+ top Indian colleges.', href: '/colleges', color: '#6366f1' },
  { icon: BarChart2, title: 'Compare Colleges', desc: 'Side-by-side comparison with fees, placements, rankings and best-in-category highlights.', href: '/compare', color: '#10b981' },
  { icon: Zap, title: 'Rank Predictor', desc: 'Enter your JEE / CAT rank and get a list of colleges with Safe, Moderate, and Reach chances.', href: '/predict', color: '#f59e0b' },
  { icon: TrendingUp, title: 'Placement Insights', desc: 'Explore real placement data including average packages, highest packages and top recruiters.', href: '/colleges', color: '#ec4899' },
];

const stats = [
  { value: '75+', label: 'Top Colleges' },
  { value: '100+', label: 'Courses Listed' },
  { value: '3 Exams', label: 'JEE / CAT / WBJEE' },
  { value: '100%', label: 'Real Data' },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
        textAlign: 'center',
        maxWidth: 900, margin: '0 auto',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 999, padding: '6px 16px', marginBottom: 24, fontSize: 13, color: '#a78bfa' }}>
          <Star size={13} fill="#a78bfa" /> Your college journey starts here
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
          Find Your{' '}
          <span className="gradient-text">Perfect College</span>
          <br />in India
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Search, compare, and predict admissions for IITs, NITs, IIMs, and top private colleges.
          Make the most important decision of your life with confidence.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/colleges" className="btn-primary" style={{ padding: '14px 28px', fontSize: 16 }}>
            <Search size={18} /> Explore Colleges
          </Link>
          <Link href="/predict" className="btn-outline" style={{ padding: '14px 28px', fontSize: 16 }}>
            <Zap size={18} /> Predict My College
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 24px 60px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {stats.map(s => (
            <div key={s.label} className="glass" style={{ borderRadius: 14, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#6366f1', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Everything You Need</h2>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: 40, fontSize: 16 }}>
          Four powerful tools to guide your college decision
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {features.map(f => (
            <Link key={f.href + f.title} href={f.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 24, height: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: f.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6, marginBottom: 16 }}>{f.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: f.color, fontSize: 13, fontWeight: 600 }}>
                  Explore <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 80px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(79,70,229,0.1))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 20, padding: '48px 32px' }}>
          <GraduationCap size={40} color="#6366f1" style={{ marginBottom: 16 }} />
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to begin?</h2>
          <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 15 }}>Start your search, compare your options, or predict your college in seconds.</p>
          <Link href="/colleges" className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }}>
            Browse All Colleges <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
