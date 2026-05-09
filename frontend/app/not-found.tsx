import Link from 'next/link';
import { GraduationCap, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 20,
        background: 'rgba(99,102,241,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
      }}>
        <GraduationCap size={40} color="#6366f1" />
      </div>
      <h1 style={{ fontSize: 72, fontWeight: 900, color: '#6366f1', lineHeight: 1, marginBottom: 8 }}>
        404
      </h1>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
        Page Not Found
      </h2>
      <p style={{ color: '#9ca3af', fontSize: 15, maxWidth: 400, marginBottom: 32, lineHeight: 1.7 }}>
        The college or page you're looking for doesn't exist or may have been moved.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn-outline" style={{ padding: '12px 24px' }}>
          <Home size={16} /> Go Home
        </Link>
        <Link href="/colleges" className="btn-primary" style={{ padding: '12px 24px' }}>
          <Search size={16} /> Browse Colleges
        </Link>
      </div>
    </div>
  );
}
