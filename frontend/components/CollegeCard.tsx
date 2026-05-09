'use client';
import Link from 'next/link';
import { MapPin, Star, BookOpen, Plus, Check, Heart } from 'lucide-react';
import type { College } from '@/lib/api';
import { formatFees, formatPackage } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';
import { useWishlist } from '@/context/WishlistContext';

const TYPE_COLORS: Record<string, string> = {
  Government: '#10b981',
  Private: '#f59e0b',
  Deemed: '#6366f1',
  Autonomous: '#ec4899',
};

export default function CollegeCard({ college }: { college: College }) {
  const { add, remove, isInList } = useCompare();
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();
  const inList = isInList(college.id);
  const wishlisted = isWishlisted(college.id);
  const latestPlacement = college.placements?.[0];

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(college.rating));

  return (
    <div className="card animate-fadeInUp" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img
          src={college.imageUrl || `https://images.unsplash.com/photo-1562774053-701939374585?w=600`}
          alt={college.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,26,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <span className="badge" style={{ background: TYPE_COLORS[college.type] + '22', color: TYPE_COLORS[college.type], border: `1px solid ${TYPE_COLORS[college.type]}44` }}>
            {college.type}
          </span>
          {college.naacGrade && (
            <span className="badge" style={{ background: 'rgba(99,102,241,0.2)', color: '#a78bfa', border: '1px solid rgba(99,102,241,0.3)' }}>
              NAAC {college.naacGrade}
            </span>
          )}
        </div>
        {college.rankNirf && (
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ background: 'rgba(15,15,26,0.8)', borderRadius: 8, padding: '4px 10px', fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>
              NIRF #{college.rankNirf}
            </div>
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(college.id); }}
              title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              style={{
                width: 30, height: 30, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: wishlisted ? 'rgba(239,68,68,0.25)' : 'rgba(15,15,26,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', transform: wishlisted ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Heart size={14} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#9ca3af'} />
            </button>
          </div>
        )}
        {!college.rankNirf && (
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(college.id); }}
            title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 30, height: 30, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: wishlisted ? 'rgba(239,68,68,0.25)' : 'rgba(15,15,26,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', transform: wishlisted ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <Heart size={14} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#9ca3af'} />
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff', lineHeight: 1.3, marginBottom: 4 }}>
            {college.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9ca3af', fontSize: 13 }}>
            <MapPin size={12} />
            <span>{college.city}, {college.state}</span>
          </div>
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {stars.map((filled, i) => (
              <Star key={i} size={13} fill={filled ? '#f59e0b' : 'none'} color={filled ? '#f59e0b' : '#4b5563'} />
            ))}
          </div>
          <span style={{ fontSize: 13, color: '#f59e0b', fontWeight: 600 }}>{college.rating.toFixed(1)}</span>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Fees/Year</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f0ff' }}>
              {formatFees(college.totalFeesMin)}
              {college.totalFeesMax !== college.totalFeesMin && ` – ${formatFees(college.totalFeesMax)}`}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Avg Package</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>
              {latestPlacement ? formatPackage(latestPlacement.avgPackage) : '—'}
            </div>
          </div>
        </div>

        {college._count && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9ca3af', fontSize: 12 }}>
            <BookOpen size={12} /> {college._count.courses} courses offered
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
        <Link href={`/colleges/${college.slug}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '9px 0', fontSize: 13 }}>
          View Details
        </Link>
        <button
          onClick={() => inList ? remove(college.id) : add(college)}
          style={{
            padding: '9px 12px', borderRadius: 10, border: `1px solid ${inList ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
            background: inList ? 'rgba(99,102,241,0.2)' : 'transparent',
            color: inList ? '#6366f1' : '#9ca3af', cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
          }}
        >
          {inList ? <Check size={14} /> : <Plus size={14} />}
          {inList ? 'Added' : 'Compare'}
        </button>
      </div>
    </div>
  );
}
