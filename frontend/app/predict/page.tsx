'use client';
import { useEffect, useState, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, MapPin, Star, ArrowRight, Loader2, BookOpen, Trophy, Share2, Check, Heart } from 'lucide-react';
import { predictColleges, getExams, type PredictResult, formatFees } from '@/lib/api';
import { useWishlist } from '@/context/WishlistContext';

const STEP_LABELS = ['Select Exam', 'Enter Rank', 'See Results'];

function PredictForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [exam, setExam] = useState('');
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('General');
  const [results, setResults] = useState<PredictResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [exams, setExams] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filterChance, setFilterChance] = useState('');
  const [copied, setCopied] = useState(false);
  const { toggle: toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    getExams().then(d => { setExams(d.exams); setCategories(d.categories); }).catch(console.error);
  }, []);

  // Auto-run from URL params (shareable links)
  const autoRun = useCallback(async (e: string, r: string, cat: string) => {
    setExam(e); setRank(r); setCategory(cat);
    setLoading(true); setError('');
    try {
      const data = await predictColleges({ exam: e, rank: Number(r), category: cat });
      setResults(data.results);
      setStep(2);
    } catch { setError('Prediction failed.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const qExam = searchParams.get('exam');
    const qRank = searchParams.get('rank');
    const qCat = searchParams.get('category') || 'General';
    if (qExam && qRank && exams.length > 0) {
      autoRun(qExam, qRank, qCat);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exams]);

  const handlePredict = async () => {
    if (!exam || !rank) return;
    setLoading(true);
    setError('');
    // Update URL with search params for shareability
    router.replace(`/predict?exam=${encodeURIComponent(exam)}&rank=${rank}&category=${encodeURIComponent(category)}`, { scroll: false });
    try {
      const data = await predictColleges({ exam, rank: Number(rank), category });
      setResults(data.results);
      setStep(2);
    } catch {
      setError('Prediction failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/predict?exam=${encodeURIComponent(exam)}&rank=${rank}&category=${encodeURIComponent(category)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt('Copy this link:', url);
    }
  };

  const filtered = filterChance ? results.filter(r => r.chance === filterChance) : results;

  const CHANCE_COLORS = { Safe: '#10b981', Moderate: '#f59e0b', Reach: '#ef4444' };
  const CHANCE_BG = { Safe: 'rgba(16,185,129,0.15)', Moderate: 'rgba(245,158,11,0.15)', Reach: 'rgba(239,68,68,0.15)' };

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
        {STEP_LABELS.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i <= step ? '#6366f1' : 'rgba(255,255,255,0.06)',
              color: i <= step ? 'white' : '#9ca3af', fontSize: 13, fontWeight: 700,
            }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: i === step ? '#f0f0ff' : '#9ca3af', fontWeight: i === step ? 600 : 400 }}>{label}</span>
            {i < 2 && <div style={{ width: 40, height: 1, background: i < step ? '#6366f1' : 'rgba(255,255,255,0.1)' }} />}
          </div>
        ))}
      </div>

      {/* Step 0: Exam */}
      {step === 0 && (
        <div style={{ maxWidth: 520 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Which exam did you appear for?</h2>
          <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 14 }}>Select the entrance exam you wrote</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
            {exams.map(e => (
              <button key={e} onClick={() => setExam(e)} style={{
                padding: '16px 20px', borderRadius: 12, cursor: 'pointer',
                background: exam === e ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                border: exam === e ? '2px solid #6366f1' : '2px solid transparent',
                color: exam === e ? '#6366f1' : '#f0f0ff', fontWeight: 700, fontSize: 15, transition: 'all 0.2s',
              }}>{e}</button>
            ))}
          </div>
          <button onClick={() => setStep(1)} disabled={!exam} className="btn-primary" style={{ padding: '12px 28px' }}>
            Next <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 1: Rank */}
      {step === 1 && (
        <div style={{ maxWidth: 480 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Enter your rank & category</h2>
          <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 14 }}>Your {exam} rank and reservation category</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 6, display: 'block' }}>Your {exam} Rank</label>
              <input
                id="predict-rank"
                type="number"
                placeholder="e.g. 5000"
                value={rank}
                onChange={e => setRank(e.target.value)}
                className="input-field"
                min={1}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 6, display: 'block' }}>Category</label>
              <select id="predict-category" value={category} onChange={e => setCategory(e.target.value)} className="input-field">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(0)} className="btn-outline" style={{ padding: '12px 24px' }}>Back</button>
            <button onClick={handlePredict} disabled={!rank || loading} className="btn-primary" style={{ padding: '12px 28px' }}>
              {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Predicting...</> : <><Zap size={16} /> Predict Colleges</>}
            </button>
          </div>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {/* Step 2: Results */}
      {step === 2 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
                {results.length} College{results.length !== 1 ? 's' : ''} Found
              </h2>
              <p style={{ color: '#9ca3af', fontSize: 14 }}>
                {exam} Rank {rank} · {category} · Showing {filtered.length} results
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: '#9ca3af' }}>Filter:</span>
              {['', 'Safe', 'Moderate', 'Reach'].map(c => (
                <button key={c} onClick={() => setFilterChance(c)} style={{
                  padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: filterChance === c ? '#6366f1' : 'rgba(255,255,255,0.06)',
                  color: filterChance === c ? 'white' : '#9ca3af',
                }}>{c || 'All'}</button>
              ))}
              <button onClick={handleShare} style={{
                padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(99,102,241,0.4)', cursor: 'pointer',
                background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.1)',
                color: copied ? '#10b981' : '#a78bfa', fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s',
              }}>
                {copied ? <><Check size={13} /> Copied!</> : <><Share2 size={13} /> Share</>}
              </button>
              <button onClick={() => { setStep(0); setResults([]); setRank(''); router.replace('/predict', { scroll: false }); }} className="btn-outline" style={{ padding: '6px 14px', fontSize: 13 }}>
                New Search
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No colleges in this category</h3>
              <p>Try a different filter or search</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.map((r, idx) => (
                <div key={`${r.college.id}-${r.course.id}`} className="card" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#6366f1', flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{r.college.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', color: '#9ca3af', fontSize: 13 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={12} />{r.college.city}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><BookOpen size={12} />{r.course.name}</span>
                      {r.college.rankNirf && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Trophy size={12} />NIRF #{r.college.rankNirf}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'right', fontSize: 13, color: '#9ca3af' }}>
                      <div>Rank range</div>
                      <div style={{ fontWeight: 700, color: '#f0f0ff' }}>{r.rankRange.min.toLocaleString()} – {r.rankRange.max.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 13, color: '#9ca3af' }}>
                      <div>Fees/yr</div>
                      <div style={{ fontWeight: 700, color: '#f0f0ff' }}>{formatFees(r.course.feesPerYear)}</div>
                    </div>
                    <span style={{
                      padding: '6px 14px', borderRadius: 8, fontWeight: 700, fontSize: 13,
                      background: CHANCE_BG[r.chance], color: CHANCE_COLORS[r.chance],
                    }}>{r.chance}</span>
                    <button
                      onClick={() => toggleWishlist(r.college.id)}
                      title={isWishlisted(r.college.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                      style={{
                        width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                        background: isWishlisted(r.college.id) ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                      }}
                    >
                      <Heart size={14} fill={isWishlisted(r.college.id) ? '#ef4444' : 'none'} color={isWishlisted(r.college.id) ? '#ef4444' : '#9ca3af'} />
                    </button>
                    <Link href={`/colleges/${r.college.slug}`} className="btn-outline" style={{ padding: '8px 14px', fontSize: 13, whiteSpace: 'nowrap' }}>
                      View <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PredictPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 120px' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#f59e0b" />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>College Rank Predictor</h1>
        </div>
        <p style={{ color: '#9ca3af', fontSize: 15 }}>
          Enter your entrance exam rank and get personalized college recommendations with Safe, Moderate, and Reach chances.
        </p>
      </div>
      <div className="card" style={{ padding: 32 }}>
        <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading...</div>}>
          <PredictForm />
        </Suspense>
      </div>
    </div>
  );
}
