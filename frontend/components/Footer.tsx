'use client';
import Link from 'next/link';
import { GraduationCap, Code2, Globe, Mail, BookOpen, BarChart2, Zap } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Code2, href: 'https://github.com', label: 'GitHub' },
  { icon: Globe, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@collegecompass.in', label: 'Email' },
];

const NAV_LINKS = [
  { href: '/colleges', label: 'Browse Colleges', icon: BookOpen },
  { href: '/compare', label: 'Compare Colleges', icon: BarChart2 },
  { href: '/predict', label: 'Rank Predictor', icon: Zap },
];

const EXAMS = ['JEE Advanced', 'JEE Main', 'CAT', 'WBJEE'];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(15,15,26,0.98)',
      marginTop: 0,
    }}>
      {/* Top gradient accent bar */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #6366f1, #4f46e5, #38bdf8, #10b981)', opacity: 0.6 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 32px' }}>
        {/* Three-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}>

          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <GraduationCap size={20} color="white" />
              </div>
              <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 18, color: '#f0f0ff' }}>
                College<span style={{ color: '#6366f1' }}>Compass</span>
              </span>
            </div>
            <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, maxWidth: 260, marginBottom: 20 }}>
              India&apos;s most comprehensive college discovery and admission prediction platform. Data-driven decisions for your future.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="footer-social-btn"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <div style={{
              fontSize: 12, fontWeight: 700, color: '#6366f1',
              letterSpacing: '0.08em', marginBottom: 16, textTransform: 'uppercase',
            }}>
              Explore
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="footer-nav-link">
                  <Icon size={14} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Data Notice */}
          <div>
            <div style={{
              fontSize: 12, fontWeight: 700, color: '#6366f1',
              letterSpacing: '0.08em', marginBottom: 16, textTransform: 'uppercase',
            }}>
              Data &amp; Accuracy
            </div>
            <p style={{ color: '#6b7280', fontSize: 12, lineHeight: 1.9 }}>
              Placement data is sourced from official college reports and public disclosures.
              Predictor cutoffs are approximate and based on historical data.
              Always verify with official sources before making decisions.
            </p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {EXAMS.map(exam => (
                <span key={exam} style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                  background: 'rgba(99,102,241,0.1)', color: '#a78bfa',
                  border: '1px solid rgba(99,102,241,0.2)',
                }}>{exam}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ color: '#4b5563', fontSize: 13 }}>
            © 2026 CollegeCompass · Built for Indian college seekers
          </p>
          <p style={{ color: '#374151', fontSize: 12 }}>
            75+ colleges · 4 exams · Real placement data
          </p>
        </div>
      </div>
    </footer>
  );
}
