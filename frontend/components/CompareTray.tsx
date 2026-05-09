'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, BarChart2, Plus } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

export default function CompareTray() {
  const { list, remove, clear } = useCompare();
  const [mounted, setMounted] = useState(false);

  // Avoid SSR mismatch
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || list.length === 0) return null;

  const ids = list.map(c => c.id).join(',');

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
      background: 'rgba(26,26,46,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(99,102,241,0.4)',
      padding: '12px 24px',
      display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 -4px 30px rgba(99,102,241,0.2)',
      animation: 'fadeInUp 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, whiteSpace: 'nowrap' }}>
          Compare ({list.length}/3):
        </span>
        {list.map(college => (
          <div key={college.id} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)',
            borderRadius: 8, padding: '4px 10px',
          }}>
            <span style={{ fontSize: 13, color: '#f0f0ff', fontWeight: 500 }}>
              {college.name.length > 25 ? college.name.slice(0, 25) + '…' : college.name}
            </span>
            <button
              onClick={() => remove(college.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', lineHeight: 1, padding: 0 }}
            >
              <X size={13} />
            </button>
          </div>
        ))}
        {list.length < 3 && (
          <span style={{ fontSize: 12, color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Plus size={12} /> Add {3 - list.length} more from listings
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={clear} className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>
          Clear All
        </button>
        {list.length >= 2 && (
          <Link href={`/compare?ids=${ids}`} className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
            <BarChart2 size={15} /> Compare Now
          </Link>
        )}
      </div>
    </div>
  );
}
