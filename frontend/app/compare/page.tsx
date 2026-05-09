'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, Plus, Loader2, ArrowLeft } from 'lucide-react';
import { getCompareByIds, type CompareCollege, formatFees, formatPackage } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';

function BestBadge() {
  return (
    <span style={{ background: 'rgba(99,102,241,0.2)', color: '#a78bfa', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginLeft: 6 }}>
      🏆 Best
    </span>
  );
}

function CompareContent() {
  const params = useSearchParams();
  const ids = params.get('ids') || '';
  const { list } = useCompare();

  const [colleges, setColleges] = useState<CompareCollege[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ids) return;
    setLoading(true);
    getCompareByIds(ids)
      .then(r => setColleges(r.colleges))
      .catch(() => setError('Failed to load comparison data.'))
      .finally(() => setLoading(false));
  }, [ids]);

  if (!ids && list.length < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <BarChart2Icon />
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Nothing to Compare Yet</h2>
        <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 15 }}>
          Browse colleges and click <strong>"+ Compare"</strong> on at least 2 colleges.
        </p>
        <Link href="/colleges" className="btn-primary">
          <Plus size={16} /> Browse Colleges
        </Link>
      </div>
    );
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
      <Loader2 size={32} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (error) return <div style={{ textAlign: 'center', padding: 60, color: '#ef4444' }}>{error}</div>;

  const rows: { key: string; label: string; getValue: (c: CompareCollege) => React.ReactNode; isBest?: (c: CompareCollege) => boolean }[] = [
    { key: 'location', label: 'Location', getValue: c => <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} />{c.city}, {c.state}</span> },
    { key: 'type', label: 'College Type', getValue: c => c.type },
    { key: 'established', label: 'Established', getValue: c => c.established },
    { key: 'naac', label: 'NAAC Grade', getValue: c => c.naacGrade || '—' },
    { key: 'nirf', label: 'NIRF Rank', getValue: c => c.rankNirf ? `#${c.rankNirf}` : '—', isBest: c => c.best.nirf },
    { key: 'rating', label: 'Rating', getValue: c => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Star size={13} fill="#f59e0b" color="#f59e0b" /> {c.rating.toFixed(1)}
      </div>
    ), isBest: c => c.best.rating },
    { key: 'fees', label: 'Min Annual Fees', getValue: c => formatFees(c.totalFeesMin), isBest: c => c.best.fees },
    { key: 'fees_max', label: 'Max Annual Fees', getValue: c => formatFees(c.totalFeesMax) },
    { key: 'courses', label: 'Courses Offered', getValue: c => `${c.courses?.length || 0} programs` },
    { key: 'avg_pkg', label: 'Avg Package', getValue: c => {
      const p = c.placements?.[0];
      return p ? <span style={{ color: '#10b981', fontWeight: 700 }}>{formatPackage(p.avgPackage)}</span> : '—';
    }, isBest: c => c.best.avgPackage },
    { key: 'high_pkg', label: 'Highest Package', getValue: c => {
      const p = c.placements?.[0];
      return p ? <span style={{ color: '#6366f1', fontWeight: 700 }}>{p.highestPackage} Cr</span> : '—';
    }, isBest: c => c.best.highestPackage },
    { key: 'placement_rate', label: 'Placement Rate', getValue: c => {
      const p = c.placements?.[0];
      return p ? <span style={{ color: '#f59e0b', fontWeight: 700 }}>{p.placementRate}%</span> : '—';
    }, isBest: c => c.best.placementRate },
    { key: 'students', label: 'Total Students', getValue: c => c.totalStudents?.toLocaleString() || '—' },
    { key: 'campus', label: 'Campus Area', getValue: c => c.campusArea || '—' },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
        <thead>
          <tr>
            <th style={{ width: 160, padding: '16px 20px', textAlign: 'left', fontSize: 13, color: '#9ca3af', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
              Criteria
            </th>
            {colleges.map(c => (
              <th key={c.id} style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid var(--border)', minWidth: 200 }}>
                <Link href={`/colleges/${c.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#f0f0ff', marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <MapPin size={11} />{c.city}
                  </div>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.key} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '14px 20px', fontSize: 13, color: '#9ca3af', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.label}
              </td>
              {colleges.map(c => {
                const best = row.isBest?.(c);
                return (
                  <td key={c.id} style={{
                    padding: '14px 20px', textAlign: 'center', fontSize: 14,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: best ? 'rgba(99,102,241,0.08)' : 'transparent',
                    borderLeft: best ? '2px solid rgba(99,102,241,0.4)' : '2px solid transparent',
                  }}>
                    {row.getValue(c)}
                    {best && <BestBadge />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BarChart2Icon() {
  return (
    <div style={{ fontSize: 56, marginBottom: 16 }}>⚖️</div>
  );
}

export default function ComparePage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 120px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/colleges" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', textDecoration: 'none', fontSize: 14 }}>
          <ArrowLeft size={16} /> Back
        </Link>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>Compare Colleges</h1>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Side-by-side comparison with best-in-category highlights</p>
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <Suspense fallback={<div style={{ padding: 60, textAlign: 'center', color: '#9ca3af' }}>Loading...</div>}>
          <CompareContent />
        </Suspense>
      </div>
    </div>
  );
}
