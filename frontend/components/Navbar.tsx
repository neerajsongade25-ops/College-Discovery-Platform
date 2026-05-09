'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Search, BarChart2, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ServerStatusPill from '@/components/ServerStatusPill';

const navLinks = [
  { href: '/colleges', label: 'Colleges', icon: Search },
  { href: '/compare', label: 'Compare', icon: BarChart2 },
  { href: '/predict', label: 'Predictor', icon: Zap },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: '64px', background: 'rgba(15,15,26,0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', padding: '0 24px',
      justifyContent: 'space-between',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
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
      </Link>

      {/* Desktop nav */}
      <div className="desktop-nav" style={{ gap: 4, alignItems: 'center' }}>
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 8, textDecoration: 'none',
              fontSize: 14, fontWeight: 500,
              color: active ? '#6366f1' : '#9ca3af',
              background: active ? 'rgba(99,102,241,0.1)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              <Icon size={16} /> {label}
            </Link>
          );
        })}
        <div style={{ marginLeft: 8 }}>
          <ServerStatusPill />
        </div>
      </div>

      {/* Mobile menu button */}
      <button onClick={() => setOpen(!open)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f0f0ff' }}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: '#1a1a2e', borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
              borderRadius: 8, textDecoration: 'none', color: '#f0f0ff', fontSize: 15,
            }}>
              <Icon size={18} /> {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
