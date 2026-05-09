'use client';
import { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import { MapPin, ExternalLink, Star, TrendingUp, BookOpen, Users, Plus, Check, Calendar, Award } from 'lucide-react';
import { getCollege, type College, formatFees, formatPackage } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts';

const TABS = ['Overview', 'Courses', 'Placements', 'Reviews'] as const;
type Tab = typeof TABS[number];

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('Overview');
  const { add, remove, isInList } = useCompare();

  useEffect(() => {
    getCollege(id)
      .then(setCollege)
      .catch(() => setCollege(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #6366f1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
  if (!college) return notFound();

  const inList = isInList(college.id);
  const latestPlacement = college.placements?.[0];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 120px' }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: 260, borderRadius: '0 0 20px 20px', overflow: 'hidden', marginBottom: 0 }}>
        <img
          src={college.imageUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200'}
          alt={college.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,26,1) 0%, rgba(15,15,26,0.5) 60%, transparent 100%)' }} />
      </div>

      {/* College Header */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0 0 16px 16px', padding: '24px 28px', marginBottom: 24, borderTop: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              {college.naacGrade && <span className="badge" style={{ background: 'rgba(99,102,241,0.2)', color: '#a78bfa', border: '1px solid rgba(99,102,241,0.3)' }}>NAAC {college.naacGrade}</span>}
              {college.rankNirf && <span className="badge" style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>NIRF #{college.rankNirf}</span>}
              <span className="badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>{college.type}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 900, marginBottom: 6 }}>{college.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 14 }}>
              <MapPin size={14} /> {college.location}
              {college.established && <span style={{ marginLeft: 12, display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={14} /> Est. {college.established}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={16} fill={i < Math.round(college.rating) ? '#f59e0b' : 'none'} color={i < Math.round(college.rating) ? '#f59e0b' : '#4b5563'} />
              ))}
            </div>
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>{college.rating.toFixed(1)}</span>
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '8px 14px', fontSize: 13 }}>
                <ExternalLink size={14} /> Website
              </a>
            )}
            <button
              onClick={() => inList ? remove(college.id) : add(college)}
              className={inList ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '8px 14px', fontSize: 13 }}
            >
              {inList ? <><Check size={14} /> Added</> : <><Plus size={14} /> Compare</>}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          {[
            { label: 'Annual Fees', value: `${formatFees(college.totalFeesMin)} – ${formatFees(college.totalFeesMax)}`, icon: Award },
            { label: 'Avg Package', value: latestPlacement ? formatPackage(latestPlacement.avgPackage) : '—', icon: TrendingUp },
            { label: 'Placement Rate', value: latestPlacement ? `${latestPlacement.placementRate}%` : '—', icon: Users },
            { label: 'Courses', value: `${college.courses?.length || 0} programs`, icon: BookOpen },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 12, marginBottom: 4 }}>
                <s.icon size={12} /> {s.label}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f0ff' }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
            color: tab === t ? '#6366f1' : '#9ca3af',
            borderBottom: tab === t ? '2px solid #6366f1' : '2px solid transparent',
            fontWeight: tab === t ? 700 : 500, fontSize: 14, transition: 'all 0.2s',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'Overview' && (
        <div className="detail-overview-grid">
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About {college.name}</h2>
            <p style={{ color: '#9ca3af', lineHeight: 1.8, fontSize: 15 }}>{college.description}</p>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Location', college.location],
                ['Type', college.type],
                ['Established', college.established?.toString()],
                ['Campus Area', college.campusArea || '—'],
                ['Total Students', college.totalStudents?.toLocaleString() || '—'],
                ['Approved By', college.approved || '—'],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {latestPlacement && (
              <div className="card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <TrendingUp size={16} color="#10b981" /> Placements {latestPlacement.year}
                </h3>
                {[
                  ['Avg Package', formatPackage(latestPlacement.avgPackage)],
                  ['Highest Package', `${latestPlacement.highestPackage} LPA`],
                  ['Placement Rate', `${latestPlacement.placementRate}%`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ color: '#9ca3af' }}>{k}</span>
                    <span style={{ fontWeight: 700, color: '#10b981' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'Courses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(college.courses || []).map(c => (
            <div key={c.id} className="card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span className="badge" style={{ background: 'rgba(99,102,241,0.15)', color: '#a78bfa', border: '1px solid rgba(99,102,241,0.2)' }}>{c.level}</span>
                  <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>{c.duration}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</h3>
                {c.eligibility && <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{c.eligibility}</p>}
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {c.examAccepted.map(e => (
                    <span key={e} style={{ fontSize: 11, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>{e}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Fees/Year</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#6366f1' }}>{formatFees(c.feesPerYear)}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{c.seats} seats</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Placements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Trend Chart */}
          {(college.placements || []).length > 1 && (() => {
            const chartData = [...(college.placements || [])]
              .sort((a, b) => a.year - b.year)
              .map(p => ({
                year: p.year.toString(),
                avg: p.avgPackage,
                highest: p.highestPackage,
              }));
            return (
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <TrendingUp size={16} color="#6366f1" /> Placement Trend
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="year" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => formatPackage(v).replace(' LPA','L').replace(' Cr','Cr')} />
                    <Tooltip
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 13 }}
                      labelStyle={{ color: '#f0f0ff', fontWeight: 700 }}
                      formatter={(value, name) => [
                        formatPackage(Number(value)),
                        name === 'avg' ? 'Avg Package' : 'Highest Package',
                      ]}
                    />
                    <Legend formatter={(v) => v === 'avg' ? 'Avg Package' : 'Highest Package'}
                      wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
                    <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2.5}
                      dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="highest" stroke="#10b981" strokeWidth={2.5}
                      dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })()}

          {/* Placement Cards */}
          {(college.placements || []).map(p => (
            <div key={p.id} className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Placements {p.year}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 16 }}>
                {[
                  ['Avg Package', formatPackage(p.avgPackage), '#6366f1'],
                  ['Highest Package', formatPackage(p.highestPackage), '#10b981'],
                  ['Placement Rate', `${p.placementRate}%`, '#f59e0b'],
                  ...(p.medianPackage ? [['Median Package', formatPackage(p.medianPackage), '#ec4899']] : []),
                ].map(([k, v, col]) => (
                  <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px' }}>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: col as string }}>{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8, fontWeight: 600 }}>TOP RECRUITERS</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.topRecruiters.map(r => (
                    <span key={r} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 500 }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Reviews' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(college.reviews || []).length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>No reviews yet.</div>
          ) : (
            (college.reviews || []).map(r => (
              <div key={r.id} className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{r.authorName}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{r.course} · Batch {r.batchYear}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} fill={i < r.rating ? '#f59e0b' : 'none'} color={i < r.rating ? '#f59e0b' : '#4b5563'} />
                    ))}
                  </div>
                </div>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{r.title}</h4>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7 }}>{r.content}</p>
                {(r.pros || r.cons) && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                    {r.pros && <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, marginBottom: 4 }}>👍 PROS</div>
                      <div style={{ fontSize: 13, color: '#d1fae5' }}>{r.pros}</div>
                    </div>}
                    {r.cons && <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>👎 CONS</div>
                      <div style={{ fontSize: 13, color: '#fecaca' }}>{r.cons}</div>
                    </div>}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
